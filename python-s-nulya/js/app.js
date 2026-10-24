import { lessons } from './lessons.js';
import { initEditor, getCode, setCode } from './editor.js';
import { runPython } from './pyodide-runner.js';
import { checkTask } from './task-checker.js';
import { auth } from './auth.js';

const lessonsNav = document.getElementById('lessonsNav');
const lessonContent = document.getElementById('lessonContent');
const checkTaskBtn = document.getElementById('checkTaskBtn');
const runBtn = document.getElementById('runBtn');
const clearOutputBtn = document.getElementById('clearOutputBtn');
const consoleOutput = document.getElementById('consoleOutput');
const consoleStatus = document.getElementById('consoleStatus');
const progressText = document.getElementById('progressText');
const progressBarFill = document.getElementById('progressBarFill');
const resetProgressBtn = document.getElementById('resetProgressBtn');
const editorContainer = document.getElementById('editorContainer');
const checkResultText = document.getElementById('checkResultText');

const userBlock = document.getElementById('userBlock');
const userNameEl = document.getElementById('userName');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');

const authOverlay = document.getElementById('authOverlay');
const authCloseBtn = document.getElementById('authCloseBtn');
const authModalTitle = document.getElementById('authModalTitle');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const registerUsername = document.getElementById('registerUsername');
const registerPassword = document.getElementById('registerPassword');
const registerPassword2 = document.getElementById('registerPassword2');
const registerError = document.getElementById('registerError');

let currentLessonId = 0;
let completed = new Set();
let currentSession = auth.getSession();
let progressKey = auth.progressKey(currentSession?.username);

function updateUserUI() {
    if (!userNameEl) return;
    if (currentSession?.username) {
        userNameEl.textContent = currentSession.username;
        loginBtn?.classList.add('hidden');
        registerBtn?.classList.add('hidden');
        logoutBtn?.classList.remove('hidden');
    } else {
        userNameEl.textContent = 'Гость';
        loginBtn?.classList.remove('hidden');
        registerBtn?.classList.remove('hidden');
        logoutBtn?.classList.add('hidden');
    }
}

function loadProgress() {
    try {
        const raw = localStorage.getItem(progressKey);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            completed = new Set(parsed);
        }
    } catch (error) {
        console.warn('Не удалось загрузить прогресс', error);
    }
}

function saveProgress() {
    try {
        localStorage.setItem(progressKey, JSON.stringify(Array.from(completed)));
    } catch (error) {
        console.warn('Не удалось сохранить прогресс', error);
    }
}

function switchAuthTab(tab) {
    authTabs.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === tab));
    loginForm?.classList.toggle('hidden', tab !== 'login');
    registerForm?.classList.toggle('hidden', tab !== 'register');
    if (authModalTitle) authModalTitle.textContent = tab === 'login' ? 'Вход' : 'Регистрация';
    if (loginError) loginError.textContent = '';
    if (registerError) registerError.textContent = '';
}

function updateProgress() {
    const total = lessons.length;
    const done = completed.size;
    progressText.textContent = `Прогресс: ${done} / ${total}`;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    progressBarFill.style.width = percent + '%';
}

function renderNav() {
    lessonsNav.innerHTML = '';
    lessons.forEach((lesson) => {
        const button = document.createElement('button');
        button.className = 'lesson-item' + (lesson.id === currentLessonId ? ' active' : '') + (completed.has(lesson.id) ? ' done' : '');
        button.innerHTML = `
            <span class="lesson-number">${lesson.number}</span>
            <span class="lesson-meta">
                <span class="lesson-title">${lesson.title}</span>
                <span class="lesson-subtitle">${lesson.subtitle}</span>
            </span>
        `;
        button.addEventListener('click', () => {
            openLesson(lesson.id);
        });
        lessonsNav.appendChild(button);
    });
}

function renderLesson(lesson) {
    let html = '';
    if (lesson.videoUrl && lesson.videoUrl.trim() !== '') {
        html += `
            <div class="lesson-video-block">
                <div class="lesson-video-header">
                    <div class="lesson-video-title">Видео к уроку</div>
                    <div class="lesson-video-subtitle">Краткое объяснение темы</div>
                </div>
                <div class="video-wrapper">
                    <iframe src="${lesson.videoUrl}" title="Видео к уроку ${lesson.number}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>
            <div class="lesson-divider"></div>
        `;
    }
    html += lesson.content;
    lessonContent.innerHTML = html;
    if (checkTaskBtn) {
        checkTaskBtn.textContent = completed.has(lesson.id) ? 'Урок пройден ✓' : 'Проверить задание';
        checkTaskBtn.disabled = completed.has(lesson.id);
    }
    if (checkResultText) {
        checkResultText.textContent = completed.has(lesson.id) ? 'Задание выполнено. Урок пройден.' : '';
        checkResultText.className = completed.has(lesson.id) ? 'lesson-check-info success' : 'lesson-check-info';
    }
}

function openLesson(id) {
    currentLessonId = id;
    const lesson = lessons.find((item) => item.id === id);
    if (!lesson) return;
    renderNav();
    renderLesson(lesson);
    setCode(lesson.starterCode || '');
    consoleOutput.textContent = '';
    consoleStatus.textContent = 'Готов к запуску';
}

if (checkTaskBtn) {
    checkTaskBtn.addEventListener('click', () => {
        const lesson = lessons.find((item) => item.id === currentLessonId);
        if (!lesson) return;
        const code = getCode();
        if (!code.trim()) {
            if (checkResultText) {
                checkResultText.textContent = 'Напиши код в редакторе перед проверкой.';
                checkResultText.className = 'lesson-check-info warn';
            }
            return;
        }
        const result = checkTask(lesson.id, code);
        if (checkResultText) {
            checkResultText.textContent = result.message;
            checkResultText.className = result.ok ? 'lesson-check-info success' : 'lesson-check-info error';
        }
        if (result.ok) {
            completed.add(lesson.id);
            saveProgress();
            updateProgress();
            renderNav();
            renderLesson(lesson);
        }
    });
}

runBtn.addEventListener('click', async () => {
    const code = getCode();
    if (!code.trim()) {
        consoleOutput.textContent = 'Напиши код перед запуском.';
        consoleStatus.textContent = 'Пустой код';
        return;
    }
    runBtn.disabled = true;
    runBtn.textContent = '⏳ Выполняется...';
    consoleStatus.textContent = 'Выполняется...';
    consoleOutput.textContent = '';
    try {
        const result = await runPython(code);
        consoleOutput.textContent = result.length === 0 ? '(нет вывода)' : result;
        consoleStatus.textContent = 'Выполнено';
    } catch (error) {
        consoleOutput.textContent = String(error);
        consoleStatus.textContent = 'Ошибка';
    } finally {
        runBtn.disabled = false;
        runBtn.textContent = '▶ Запустить код';
    }
});

clearOutputBtn.addEventListener('click', () => {
    consoleOutput.textContent = '';
    consoleStatus.textContent = 'Очищено';
});

if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', () => {
        if (!confirm('Сбросить весь прогресс по урокам?')) return;
        completed = new Set();
        saveProgress();
        updateProgress();
        renderNav();
        const lesson = lessons.find((item) => item.id === currentLessonId);
        if (lesson) renderLesson(lesson);
        if (checkResultText) {
            checkResultText.textContent = '';
            checkResultText.className = 'lesson-check-info';
        }
    });
}

if (loginBtn) loginBtn.addEventListener('click', () => {
    authOverlay?.classList.remove('hidden');
    switchAuthTab('login');
});
if (registerBtn) registerBtn.addEventListener('click', () => {
    authOverlay?.classList.remove('hidden');
    switchAuthTab('register');
});
if (authCloseBtn) authCloseBtn.addEventListener('click', () => authOverlay?.classList.add('hidden'));
authOverlay?.addEventListener('click', (e) => {
    if (e.target === authOverlay) authOverlay.classList.add('hidden');
});
authTabs.forEach((btn) => btn.addEventListener('click', () => switchAuthTab(btn.dataset.tab));

loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const res = auth.login(loginUsername?.value, loginPassword?.value);
    if (!res.ok) {
        if (loginError) loginError.textContent = res.message;
        return;
    }
    currentSession = res.session;
    progressKey = auth.progressKey(currentSession.username);
    completed = new Set();
    loadProgress();
    updateProgress();
    renderNav();
    const lesson = lessons.find((item) => item.id === currentLessonId);
    if (lesson) renderLesson(lesson);
    updateUserUI();
    authOverlay?.classList.add('hidden');
    if (loginForm) loginForm.reset();
});

registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (registerPassword?.value !== registerPassword2?.value) {
        if (registerError) registerError.textContent = 'Пароли не совпадают';
        return;
    }
    const res = auth.register(registerUsername?.value, registerPassword?.value);
    if (!res.ok) {
        if (registerError) registerError.textContent = res.message;
        return;
    }
    currentSession = res.session;
    progressKey = auth.progressKey(currentSession.username);
    completed = new Set();
    saveProgress();
    updateProgress();
    renderNav();
    const lesson = lessons.find((item) => item.id === currentLessonId);
    if (lesson) renderLesson(lesson);
    updateUserUI();
    authOverlay?.classList.add('hidden');
    if (registerForm) registerForm.reset();
});

logoutBtn?.addEventListener('click', () => {
    auth.logout();
    currentSession = null;
    progressKey = auth.progressKey(null);
    completed = new Set();
    loadProgress();
    updateProgress();
    renderNav();
    const lesson = lessons.find((item) => item.id === currentLessonId);
    if (lesson) renderLesson(lesson);
    updateUserUI();
});

updateUserUI();
loadProgress();
updateProgress();
if (editorContainer) {
    initEditor(editorContainer, lessons[0]?.starterCode || '');
}
openLesson(0);
renderNav();
