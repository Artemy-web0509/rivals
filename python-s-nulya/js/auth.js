const USERS_KEY = 'python-s-nulya-users';
const SESSION_KEY = 'python-s-nulya-session';

function loadUsers() {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        if (!raw) return {};
        return JSON.parse(raw);
    } catch (e) {
        return {};
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

function saveSession(session) {
    if (session) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
        localStorage.removeItem(SESSION_KEY);
    }
}

export const auth = {
    getSession() {
        return loadSession();
    },
    register(username, password) {
        const name = (username || '').trim();
        if (name.length < 3) return { ok: false, message: 'Логин минимум 3 символа' };
        if ((password || '').length < 4) return { ok: false, message: 'Пароль минимум 4 символа' };
        const users = loadUsers();
        if (users[name]) return { ok: false, message: 'Такой логин уже существует' };
        users[name] = {
            password,
            createdAt: Date.now()
        };
        saveUsers(users);
        const session = { username: name };
        saveSession(session);
        return { ok: true, session };
    },
    login(username, password) {
        const name = (username || '').trim();
        const users = loadUsers();
        const user = users[name];
        if (!user || user.password !== password) {
            return { ok: false, message: 'Неверный логин или пароль' };
        }
        const session = { username: name };
        saveSession(session);
        return { ok: true, session };
    },
    logout() {
        saveSession(null);
    },
    progressKey(username) {
        return username ? `python-s-nulya-progress-${username}` : 'python-s-nulya-progress-guest';
    }
};
