-- ============ ФУТБОЛЬНЫЕ КАРТОЧКИ 3D: схема Supabase ============
-- Выполни этот скрипт в Supabase → SQL Editor (New query) один раз.

-- Игроки (аккаунты). Пароль хранится в виде хеша с клиента.
create table if not exists players (
  id bigserial primary key,
  nick text unique not null,
  pass text not null,
  created_at timestamptz default now(),
  last_seen timestamptz default now()
);

-- Сохранения (весь прогресс игры на ник)
create table if not exists saves (
  nick text primary key,
  state jsonb not null,
  updated_at timestamptz default now()
);

-- Позиции игроков в 3D-мире (для онлайна)
create table if not exists positions (
  nick text primary key,
  x float,
  z float,
  yaw float,
  facing float,
  color text,
  pvp int default 0,
  field jsonb,
  updated_at timestamptz default now()
);

-- Подарки (админ -> игроки)
create table if not exists gifts (
  id bigserial primary key,
  to_nick text not null,
  from_nick text,
  type text not null,
  data jsonb,
  created_at timestamptz default now()
);

-- ============ УНИКАЛЬНЫЕ КАРТОЧКИ И РЫНОК ============
-- Каждый реальный футболист — одна строка. owner = текущий владелец,
-- list_price не пустой = выставлен на рынок.
create table if not exists cards (
  name text primary key,
  flag text,
  pos text,
  rating int,
  rarity text,
  owner text,
  list_price int,
  listed_by text,
  mut jsonb,
  updated_at timestamptz default now()
);
create index if not exists idx_cards_owner on cards (owner);
create index if not exists idx_cards_listed on cards (list_price) where list_price is not null;

-- Занять карточку (только если свободна)
create or replace function claim_card(_name text, _owner text, _flag text, _pos text, _rating int, _rarity text)
returns text language plpgsql security definer as $$
begin
  if exists (select 1 from cards where name = _name and owner is not null) then
    return 'TAKEN';
  end if;
  insert into cards (name, flag, pos, rating, rarity, owner, updated_at)
  values (_name, _flag, _pos, _rating, _rarity, _owner, now())
  on conflict (name) do update set
    owner = excluded.owner, flag = excluded.flag, pos = excluded.pos, rating = excluded.rating, rarity = excluded.rarity, updated_at = now()
  where cards.owner is null;
  return 'OK';
end $$;

-- Освободить (продажа магазину) — только владелец
create or replace function release_card(_name text, _owner text)
returns text language plpgsql security definer as $$
begin
  update cards set owner = null, list_price = null, listed_by = null, updated_at = now()
  where name = _name and owner = _owner;
  if found then return 'OK'; end if;
  return 'NOT_OWNED';
end $$;

-- Выставить на рынок — только владелец
create or replace function list_card(_name text, _seller text, _price int)
returns text language plpgsql security definer as $$
begin
  update cards set list_price = greatest(1, _price), listed_by = _seller, updated_at = now()
  where name = _name and owner = _seller;
  if found then return 'OK'; end if;
  return 'NOT_OWNED';
end $$;

-- Снять с рынка — только владелец
create or replace function unlist_card(_name text, _seller text)
returns text language plpgsql security definer as $$
begin
  update cards set list_price = null, listed_by = null, updated_at = now()
  where name = _name and owner = _seller;
  if found then return 'OK'; end if;
  return 'NOT_OWNED';
end $$;

-- Купить: списываем монеты у покупателя, зачисляем продавцу (в saves), меняем владельца
create or replace function buy_card(_name text, _buyer text)
returns text language plpgsql security definer as $$
declare c cards%rowtype; bal numeric; seller_coins numeric;
begin
  select * into c from cards where name = _name for update;
  if not found or c.owner is null or c.list_price is null then return 'NOT_LISTED'; end if;
  if c.owner = _buyer then return 'OWN'; end if;

  insert into saves (nick, state) values (_buyer, '{"coins":0}'::jsonb)
  on conflict (nick) do nothing;
  select (state->>'coins')::numeric into bal from saves where nick = _buyer for update;
  if bal is null or bal < c.list_price then return 'NO_COINS'; end if;
  update saves set state = jsonb_set(state, '{coins}', to_jsonb(bal - c.list_price)), updated_at = now() where nick = _buyer;

  insert into saves (nick, state) values (c.owner, '{"coins":0}'::jsonb)
  on conflict (nick) do nothing;
  select (state->>'coins')::numeric into seller_coins from saves where nick = c.owner for update;
  update saves set state = jsonb_set(state, '{coins}', to_jsonb(coalesce(seller_coins, 0) + c.list_price)), updated_at = now() where nick = c.owner;

  update cards set owner = _buyer, list_price = null, listed_by = null, updated_at = now() where name = _name;
  return 'OK';
end $$;

-- Рассылки (сообщения админа по центру экрана)
create table if not exists broadcasts (
  id bigserial primary key,
  msg text not null,
  from_nick text,
  created_at timestamptz default now()
);

create index if not exists idx_positions_updated on positions (updated_at);
create index if not exists idx_broadcasts_id on broadcasts (id);
create index if not exists idx_gifts_to on gifts (to_nick);

-- Регистрация: вернёт 'EXISTS', если ник занят, иначе создаёт и возвращает 'OK'
create or replace function register_player(_nick text, _pass text)
returns text language plpgsql security definer as $$
begin
  if exists (select 1 from players where nick = _nick) then
    return 'EXISTS';
  end if;
  insert into players (nick, pass) values (_nick, _pass);
  return 'OK';
end $$;

-- Вход: true, если ник существует и пароль совпадает
create or replace function login_player(_nick text, _pass text)
returns boolean language plpgsql security definer as $$
begin
  return exists (select 1 from players where nick = _nick and pass = _pass);
end $$;

-- Забрать и удалить подарки игрока
create or replace function claim_gifts(_nick text)
returns jsonb language plpgsql security definer as $$
declare r jsonb;
begin
  select coalesce(jsonb_agg(jsonb_build_object('type', type, 'from', from_nick, 'data', data) order by id), '[]'::jsonb)
  into r from gifts where to_nick = _nick;
  delete from gifts where to_nick = _nick;
  return r;
end $$;

-- ============ ДОСТУП АНОН-КЛИЕНТА (ВАЖНО) ============
-- Игра работает через anon-ключ без Supabase Auth, поэтому RLS отключаем
-- и даём права анону: иначе cloudSave/мультиплеер/подарки/рассылки молча ломаются.
alter table if exists public.players disable row level security;
alter table if exists public.saves disable row level security;
alter table if exists public.positions disable row level security;
alter table if exists public.gifts disable row level security;
alter table if exists public.broadcasts disable row level security;
alter table if exists public.cards disable row level security;

grant all on all tables in schema public to anon, authenticated;
grant all on all sequences in schema public to anon, authenticated;
grant all on all routines in schema public to anon, authenticated;
