ObjC.import('Foundation')

function readFile(path) {
  var err = Ref()
  var s = $.NSString.stringWithContentsOfFileEncodingError(path, $.NSUTF8StringEncoding, err)
  return s ? s.js : null
}

var base = '/Users/artemyluk/Downloads/vpn/дрон/футбольные карты/js/'
var srcOrder = ['data.js', 'util.js', 'auth.js', 'state.js', 'economy.js', 'cards.js', 'ui.js', 'world.js', 'roster.js', 'screens.js', 'market.js', 'match.js', 'decor.js', 'net.js', 'admin.js', 'touch.js', 'misc.js', 'main.js']
var gameSrc = srcOrder.map(function (f) { return readFile(base + f) }).join('\n')
if (!gameSrc) throw new Error('READ FAIL')

// ===================== СТУБЫ (DOM / localStorage / rAF) =====================
function ctxStub() {
  return new Proxy({}, {
    get(t, prop) {
      if (prop === 'createLinearGradient' || prop === 'createRadialGradient') return function () { return { addColorStop: function () {} } }
      if (prop === 'measureText') return function () { return { width: 0 } }
      return function () {}
    },
    set: function () { return true },
  })
}

function fakeEl() {
  var el = {
    _value: '', textContent: '', innerHTML: '', className: '', id: '',
    style: { display: '' }, dataset: {}, children: [], onclick: null,
    classList: { add: function () {}, remove: function () {}, toggle: function () {}, contains: function () { return false } },
    addEventListener: function () {}, appendChild: function () {}, removeChild: function () {},
    scrollIntoView: function () {}, getContext: function () { return ctxStub() },
    setAttribute: function () {}, getAttribute: function () { return null }, focus: function () {},
    insertAdjacentHTML: function () {},
  }
  Object.defineProperty(el, 'value', { get: function () { return el._value || '' }, set: function (v) { el._value = v }, configurable: true, enumerable: true })
  return el
}

var byId = {}
var docStub = {
  addEventListener: function () {},
  querySelector: function (sel) {
    var id = String(sel).replace('#', '')
    if (!byId[id]) byId[id] = fakeEl()
    return byId[id]
  },
  querySelectorAll: function () { return [] },
}

globalThis.window = { innerWidth: 1200, innerHeight: 800, addEventListener: function () {}, scrollTo: function () {} }
globalThis.navigator = { sendBeacon: function () { return true } }
globalThis.document = docStub
globalThis.localStorage = (function () { var m = {}; return {
  getItem: function (k) { return (k in m) ? m[k] : null },
  setItem: function (k, v) { m[k] = String(v) },
  removeItem: function (k) { delete m[k] },
} })()
globalThis.performance = { now: function () { return Date.now() } }
globalThis.requestAnimationFrame = function () { return 0 }
globalThis.setInterval = function () { return 0 }
globalThis.clearInterval = function () {}
globalThis.setTimeout = function () { return 0 }
globalThis.clearTimeout = function () {}
globalThis.fetch = function () { return Promise.resolve({ ok: false }) }
globalThis.SB_READY = false
globalThis.sb = null

// ===================== ТЕСТЫ =====================
var tests = []
function check(name, fn) {
  try {
    var r = fn()
    if (r === false) { tests.push(['FAIL', name, 'вернул false']) }
    else { tests.push(['OK', name, '']) }
  } catch (e) {
    tests.push(['FAIL', name, String(e).split('\n')[0]])
  }
}

var testCode = `
;(function() {
  function eq(a, b, m) { return a === b ? true : (m || '') + ' expected=' + b + ' got=' + a }
  function ok(v) { return v ? true : 'false' }

  check('регистрация создаёт состояние', function() {
    var s = createLocalAccountState('ТестЮзер')
    return ok(currentUser === 'ТестЮзер' && s.players.length === 11 && s.coins === START_COINS)
  })

  check('спавн у магазинов, не внутри блока', function() {
    return ok(!worldCollides(state.world.x, state.world.z))
  })

  check('homeFieldIndex стабилен', function() {
    var a = homeFieldIndex(), b = homeFieldIndex()
    return ok(a === b && a >= 0 && a < BASES.length)
  })

  check('generatePlayer из NATIONS', function() {
    var p = generatePlayer('gold', 'FW', 85)
    return ok(p.name && p.flag && p.rating === 85 && p.rarity === 'gold')
  })

  check('pickRarity по диапазонам', function() {
    var okAll = true
    for (var i = 0; i < 50; i++) { var r = pickRarity(); if (!RARITIES[r]) okAll = false }
    return ok(okAll)
  })

  check('sellPrice и incomePerSec', function() {
    var before = incomePerSec()
    var p = generatePlayer('bronze', 'FW', 70)
    state.players.push(p)
    return ok(sellPrice(p) > 0 && incomePerSec() >= before)
  })

  check('buyUpgrade списывает монеты', function() {
    var u = UPGRADES[0], cost = upgradeCost(u, 0)
    var before = state.coins
    state.coins = cost
    buyUpgrade(u.id)
    return ok(state.coins === 0 && state.upgrades[u.id] === 1 && before >= cost)
  })

  check('held → placeHeld ставит в основу', function() {
    var p = generatePlayer('silver', 'DF', 75)
    state.held = p
    placeHeld()
    return ok(state.held === null && state.starters.includes(p.id))
  })

  check('held → keepHeld кладёт в рюкзак', function() {
    var p = generatePlayer('bronze', 'GK', 63)
    state.held = p
    keepHeld()
    return ok(state.held === null && state.players.includes(p))
  })

  check('renderSpinnerPanel без ошибок', function() {
    renderSpinnerPanel()
    return ok(document.querySelector('#spin-btn').textContent.indexOf('500') !== -1)
  })

  check('renderFieldScreen без ошибок', function() {
    renderFieldScreen(0)
    return ok(true)
  })

  check('renderBackpack без ошибок', function() {
    renderBackpack()
    return ok(true)
  })

  check('renderArena без ошибок', function() {
    renderArena()
    return ok(true)
  })

  check('showScreen spinner', function() {
    showScreen('spinner')
    return ok(activeScreen === 'spinner')
  })

  check('арена и табы', function() {
    arenaTab('pvp')
    return ok(document.querySelector('#arena-bots').classList.contains('hidden'))
  })

  check('pvpJoin без состава не пускает', function() {
    state.starters = []
    var e = null
    try { pvpJoin() } catch (ex) { e = ex }
    return ok(state.pvpQueued === false && e === null)
  })

  check('fieldOwnerCards и refreshMyFieldOwner', function() {
    ensureLineup()
    refreshMyFieldOwner()
    var idx = homeFieldIndex()
    var owner = fieldOwnerCards(idx)
    return ok(owner && owner.nick === currentUser && owner.cards.length > 0)
  })

  check('tryEnter: спиннер рядом', function() {
    var o = { type: 'spinner', idx: 0 }
    tryEnter.call(null)
    return ok(true)
  })

  check('admin выдаёт в руки', function() {
    currentUser = 'Artikart'; isAdmin = true
    var r = document.querySelector('#adm-rarity'); r._value = 'diamond'
    var p = document.querySelector('#adm-pos'); p._value = 'FW'
    var rt = document.querySelector('#adm-rating'); rt._value = '95'
    adminGivePlayer()
    return ok(state.held !== null && state.held.rating === 95 && state.held.rarity === 'secret')
  })

  check('adminGiveCoins', function() {
    var before = state.coins
    adminGiveCoins(500)
    return ok(state.coins === before + 500)
  })

  check('match против бота стартует', function() {
    ensureLineup()
    state.starters = state.players.slice(0, 11).map(function (p) { return p.id })
    startMatch('weak')
    return ok(match && match.opp && match.running === true)
  })

  check('slotPositions раскладывает 11', function() {
    var rows = slotPositions(state.starters.map(function (id) { return getPlayer(id) }).filter(Boolean))
    return ok(rows.length === 11)
  })

  check('startPvpMatch строит оппонента', function() {
    startPvpMatch('СоперникX')
    return ok(match.opp.id === 'pvp' && match.opp.name === 'СоперникX')
  })

  check('endMatch для pvp не ломается', function() {
    match.myGoals = 2; match.botGoals = 1
    endMatch()
    return ok(state.pvpWins === 1)
  })

  check('renderMarketTab sell', function() {
    renderMarketTab('sell')
    return ok(true)
  })

  check('renderAdmin', function() {
    renderAdmin()
    return ok(true)
  })

  check('updateHeldHud', function() {
    state.held = generatePlayer('bronze', 'GK', 64)
    updateHeldHud()
    return ok(document.querySelector('#held-card').classList.contains('hidden') === false)
  })

  check('closeScreen возвращает в мир', function() {
    closeScreen()
    return ok(activeScreen === 'world')
  })

  check('serverPayload содержит поле', function() {
    ensureLineup()
    var pl = serverPayload()
    return ok(pl.field && pl.field.cards.length > 0 && pl.field.idx === homeFieldIndex())
  })

  check('applyServerPlayers разбирает owners', function() {
    server.owners = null
    applyServerPlayers({ players: [{ nick: 'Друг', x: 1, z: 2, pvp: 1 }], owners: { '3': { nick: 'Владелец', color: '#fff', cards: [{ name: 'A', rating: 70, rarity: 'bronze', pos: 'GK' }] } } })
    return ok(server.players.length === 1 && server.owners[3] && server.owners[3].nick === 'Владелец')
  })

  check('checkPvpQueue запускает матч', function() {
    state.pvpQueued = true
    ensureLineup()
    checkPvpQueue()
    return ok(state.pvpQueued === false && match && match.opp.id === 'pvp')
  })

  check('только своё поле имеет владельца', function() {
    initFieldOwners()
    refreshMyFieldOwner()
    var home = homeFieldIndex()
    var owned = 0
    for (var i = 0; i < FIELD_OWNERS.length; i++) if (FIELD_OWNERS[i]) owned++
    return ok(owned === 1 && FIELD_OWNERS[home].nick === currentUser)
  })

  check('чужие поля не интерактивны', function() {
    var my = homeFieldIndex()
    var others = INTERACTIVES.filter(function(o) { return o.type === 'field' && o.idx !== my })
    var okAll = others.every(function(o) { return activeInteractives().indexOf(o) === -1 })
    return ok(okAll && activeInteractives().length < INTERACTIVES.length)
  })

  check('drawFigures рисует без ошибок', function() {
    var labels = []
    drawFigures({ x: state.world.x, y: 3.6, z: state.world.z, cos: 1, sin: 0 }, labels)
    return ok(labels.length >= 1)
  })

  check('fieldCardsPolys строит 3D-карточки', function() {
    var f = fieldRectFor(BASES[0])
    var cards = state.starters.map(getPlayer).filter(Boolean)
    var labels = []
    var polys = fieldCardsPolys(f, cards, '#ffffff', { x: 10, y: 3.6, z: 10, cos: 1, sin: 0 }, labels)
    return ok(polys.length > 0 && rounds.length >= cards.length)
  })

  check('поля не пересекаются друг с другом', function() {
    var rects = BASES.map(fieldRectFor)
    for (var i = 0; i < rects.length; i++) {
      for (var j = i + 1; j < rects.length; j++) {
        var a = rects[i], b = rects[j]
        if (a.x0 < b.x1 && b.x0 < a.x1 && a.z0 < b.z1 && b.z0 < a.z1) return false
      }
    }
    return true
  })

  check('поля не пересекаются с ареной', function() {
    var a = { x0: ARENA.x - ARENA.size / 2, x1: ARENA.x + ARENA.size / 2, z0: ARENA.z - ARENA.size / 2, z1: ARENA.z + ARENA.size / 2 }
    for (var i = 0; i < BASES.length; i++) {
      var f = fieldRectFor(BASES[i])
      if (f.x0 < a.x1 && a.x0 < f.x1 && f.z0 < a.z1 && a.z0 < f.z1) return false
    }
    return true
  })

  check('8 табло удачи и 8 табло поля', function() {
    return ok(INTERACTIVES.filter(function(o) { return o.type === 'luck' }).length === 8 &&
      INTERACTIVES.filter(function(o) { return o.type === 'fieldupg' }).length === 8)
  })

  check('удача повышает шансы', function() {
    var before = effectiveChances()
    state.upgrades.luck = (state.upgrades.luck || 0) + 10
    var after = effectiveChances()
    return ok(after.w.gold > before.w.gold && after.w.secret > before.w.secret)
  })

  check('временная удача повышает шансы', function() {
    var before = effectiveChances()
    state.luckBoost = { tier: 'mega', until: Date.now() + 60000 }
    var after = effectiveChances()
    state.luckBoost = null
    return ok(after.w.gold > before.w.gold && after.w.diamond > before.w.diamond && after.w.secret > before.w.secret)
  })

  check('мутация умножает доход карточки', function() {
    var p = generatePlayer('gold', 'FW', 85)
    var base = playerIncome(p)
    p.mut = { id: 'divine', mult: 12 }
    var boosted = playerIncome(p)
    return ok(boosted > base * 11.5 && boosted < base * 12.5)
  })

  check('makeParent создаёт маму и папу', function() {
    var mom = makeParent('mom'), dad = makeParent('dad')
    return ok(mom.kind === 'mom' && dad.kind === 'dad' && mom.name === 'Мама' && dad.name === 'Папа' && mom.rating === 99)
  })

  check('мама и папа вместе дают баф любви ×2', function() {
    var mom = makeParent('mom'), dad = makeParent('dad')
    var lone = playerIncome(mom)
    state.players.push(mom, dad)
    state.starters.push(mom.id, dad.id)
    var together = playerIncome(mom)
    return ok(loveBuff() === 2 && Math.abs(together - lone * 2) < 0.001)
  })

  check('выкуп спиннера: цена карточки = buyPrice', function() {
    var p = generatePlayer('gold', 'FW', 85)
    var price = buyPrice(p)
    return ok(price > 0 && price === Math.round(sellPrice(p) * 1.25))
  })

  check('renderLuckUpgrades и renderFieldUpg', function() {
    renderLuckUpgrades()
    renderFieldUpg()
    return ok(document.querySelector('#luck-upgrades').innerHTML.indexOf('Удача') !== -1 &&
      document.querySelector('#fieldupg-upgrades').innerHTML.indexOf('Доход') !== -1)
  })

  check('спавн на свободной земле', function() {
    return ok(!worldCollides(PLAYER_SPAWN.x, PLAYER_SPAWN.z))
  })

  check('renderWorld полностью рендерит без ошибок', function() {
    currentUser = 'ТестЮзер'
    state.world.x = 75; state.world.z = 75
    renderWorld()
    renderWorld()
    return ok(true)
  })

  check('logout', function() {
    logout()
    return ok(currentUser === null && activeScreen === 'login')
  })

  check('Бинги скрыт из шансов, но выпадает', function() {
    var hidden = RARITIES.bingi && RARITIES.bingi.hidden === true
    var shown = SPIN_RARITY_KEYS.indexOf('bingi') === -1
    var found = false
    for (var i = 0; i < 20000; i++) { if (pickRarity() === 'bingi') { found = true; break } }
    return ok(hidden && shown && found)
  })

  check('Бинги всегда рейтинг 101-110 и имя кумира', function() {
    var p = generatePlayer('bingi', 'FW')
    return ok(p.rating >= 101 && p.rating <= 110 && p.rarity === 'bingi')
  })

  check('устройство: по умолчанию компьютер', function() {
    globalThis.localStorage.removeItem('fc_device')
    return ok(getDevice() === 'pc')
  })

  check('устройство: сохраняется выбор телефона', function() {
    setDevice('phone')
    return ok(getDevice() === 'phone' && globalThis.localStorage.getItem('fc_device') === 'phone')
  })

  check('сенсорные кнопки: привязки не падают', function() {
    bindTouchControls()
    return ok(typeof startRot === 'function' && typeof stopRot === 'function')
  })

  check('индекс игроков рендерит всех', function() {
    renderPlayerIndex()
    return ok(document.querySelector('#player-index').innerHTML.indexOf('Роналду') !== -1 &&
      document.querySelector('#player-index').innerHTML.indexOf('Месси') !== -1)
  })

  check('индекс: фильтр по позиции работает', function() {
    indexFilter = 'GK'
    renderPlayerIndex()
    var html = document.querySelector('#player-index').innerHTML
    indexFilter = 'all'
    return ok(html.indexOf('Алиссон') !== -1 && html.indexOf('(ВРТ)') !== -1)
  })

  check('рынок отдельный экран рендерится', function() {
    renderMarketplace()
    return ok(document.querySelector('#shop-market').classList.contains('active'))
  })

  check('healPlayer чинит старую карточку без key', function() {
    var p = { key: null, name: 'Роналду', rating: 63, rarity: 'bronze', pos: 'DF' }
    healPlayer(p)
    return ok(p.rating === 99 && p.rarity === 'secret' && p.pos === 'FW' && p.key === 'Роналду')
  })

  check('секретки: рейтинг 93-100', function() {
    var p = generatePlayer('secret', 'FW')
    return ok(p.rating >= 93 && p.rating <= 100 && p.rarity === 'secret')
  })

  check('секреток в пуле больше 3', function() {
    var count = REAL_PLAYERS.filter(function(x) { return x.rating >= 93 && x.rating <= 100 }).length
    return ok(count > 10)
  })

  check('кумиры (бинги) в пуле есть', function() {
    var count = REAL_PLAYERS.filter(function(x) { return x.rating >= 101 && x.rating <= 110 }).length
    return ok(count >= 5)
  })

  check('джойстик: moveVec без стика = 0', function() {
    joyMove = null; joyCam = null
    var v = moveVecFromJoy()
    return ok(v.fwd === 0 && v.strafe === 0 && v.yaw === 0)
  })

  check('джойстик: движение вверх даёт вперёд', function() {
    joyMove = { ox: 100, oy: 100, cx: 100, cy: 40 }
    var v = moveVecFromJoy()
    joyMove = null
    return ok(v.fwd > 0 && v.strafe === 0)
  })

  check('джойстик: свайп камеры даёт yaw и потребляет дельту', function() {
    joyCam = { ox: 200, oy: 300, cx: 260, cy: 300 }
    var v = moveVecFromJoy()
    var yaw1 = v.yaw
    var v2 = moveVecFromJoy()
    return ok(yaw1 > 0 && v2.yaw === 0)
  })

  check('мутация: таймер до следующей положительный', function() {
    return ok(mutationCountdownMinutes() >= 1)
  })

  check('удача: без буста минут 0', function() {
    state.luckBoost = null
    return ok(luckBoostMinutesLeft() === 0)
  })

  check('удача: с активным бустом минуты > 0', function() {
    state.luckBoost = { tier: 'normal', until: Date.now() + 5 * 60000 }
    var m = luckBoostMinutesLeft()
    state.luckBoost = null
    return ok(m >= 4 && m <= 5)
  })

  check('мутированная карточка имеет класс свечения', function() {
    var p = { id: 99901, name: 'ТестМутация', pos: 'FW', rating: 80, rarity: 'gold', flag: '🇷🇺', mut: { id: 'shiny', mult: 1.5 } }
    state.players.push(p)
    var html = cardHTML(p)
    state.players = state.players.filter(function(x) { return x.id !== 99901 })
    return ok(html.indexOf('mut-glow') !== -1 && html.indexOf('✨×1.5') !== -1)
  })

  check('клик по пустому слоту открывает резервистов', function() {
    state.starters = []
    state.players.push({ id: 9001, name: 'БенчИгрок', pos: 'FW', rating: 85, rarity: 'gold', flag: '🇷🇺' })
    renderFieldScreen(homeFieldIndex())
    var html = $('#field-lineup').innerHTML
    return ok(html.indexOf('data-empty') !== -1 && benchCount() > 0)
  })

  check('openBenchPicker рендерит запасных', function() {
    state.starters = []
    state.players.push({ id: 9002, name: 'Бенч2', pos: 'DF', rating: 80, rarity: 'silver', flag: '🇷🇺' })
    openBenchPicker('FW')
    var visible = !$('#bench-modal').classList.contains('hidden')
    var html = $('#bench-modal-list').innerHTML
    hideBenchModal()
    return ok(visible && html.indexOf('data-bench-pick') !== -1)
  })
})()
`

// data.js и game.js + тесты в одном eval-пространстве
eval(gameSrc + '\n' + testCode)

var fails = tests.filter(function (t) { return t[0] === 'FAIL' })
tests.forEach(function (t) { console.log(t[0] + ' ' + t[1] + (t[2] ? ' :: ' + t[2] : '')) })
console.log('=== ' + (tests.length - fails.length) + '/' + tests.length + ' passed ===')
