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
let currentSession = null;
try { currentSession = auth.getSession(); } catch (e) { currentSession = null; }
let progressKey = auth.progressKey(currentSession?.username);
let showQuizMode = false;

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
        if (Array.isArray(parsed)) completed = new Set(parsed);
    } catch (error) { console.warn('Не удалось загрузить прогресс', error); }
}

function saveProgress() {
    try { localStorage.setItem(progressKey, JSON.stringify(Array.from(completed))); } 
    catch (error) { console.warn('Не удалось сохранить прогресс', error); }
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
    if (progressText) progressText.textContent = `Прогресс: ${done} / ${total}`;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    if (progressBarFill) progressBarFill.style.width = percent + '%';
}

function renderNav() {
    if (!lessonsNav) return;
    lessonsNav.innerHTML = '';
    lessons.forEach((lesson) => {
        const button = document.createElement('button');
        button.className = 'lesson-item' + (lesson.id === currentLessonId ? ' active' : '') + (completed.has(lesson.id) ? ' done' : '');
        button.innerHTML = `<span class="lesson-number">${lesson.number}</span><span class="lesson-meta"><span class="lesson-title">${lesson.title}</span><span class="lesson-subtitle">${lesson.subtitle}</span></span>`;
        button.addEventListener('click', () => openLesson(lesson.id));
        lessonsNav.appendChild(button);
    });
}

function isLessonTaskCompleted(lessonId) {
    return completed.has(lessonId);
}

function renderLesson(lesson) {
    if (!lessonContent) return;
    if (completed.has(lesson.id)) { renderLessonContent(lesson); return; }
    if (lesson.quiz) {
        if (!isLessonTaskCompleted(lesson.id)) {
            renderLessonContent(lesson);
            return;
        }
        renderQuiz(lesson);
        return;
    }
    renderLessonContent(lesson);
}

function renderLessonContent(lesson) {
    showQuizMode = false;
    let html = '';
    if (lesson.videoUrl && lesson.videoUrl.trim() !== '') {
        html += `<div class="lesson-video-block"><div class="lesson-video-header"><div class="lesson-video-title">Видео к уроку</div></div><div class="video-wrapper"><iframe src="${lesson.videoUrl}" frameborder="0" allowfullscreen></iframe></div></div><div class="lesson-divider"></div>`;
    }
    html += lesson.content;
    if (lesson.quiz && !completed.has(lesson.id)) {
        if (isLessonTaskCompleted(lesson.id)) {
            // Don't show button, test will auto-start
        } else {
            html += `<div class="lesson-quiz-prompt"><h3>📝 Тест по уроку</h3><p><strong>Доступен после прохождения заданий урока.</strong> Сначала выполни и проверь задание в редакторе.</p></div>`;
        }
    }
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

function renderQuiz(lesson) {
    if (lesson.quiz.mode === 'code' || lesson.quiz.type === 'exam') {
        let html = `<div class="quiz-container"><h2>📝 ${lesson.quiz.title || 'Экзамен'}</h2><p class="quiz-warning">⚠️ Теория скрыта. Подсмотреть нельзя!</p>`;
        html += `<p>${lesson.quiz.instructions || 'Напиши работающий код с нуля, используя только пройденные темы.'}</p>`;
        html += `<div style="margin-top: 2rem; display: flex; gap: 1rem;"><button class="btn primary" id="submitQuizBtn">Проверить экзамен</button><button class="btn ghost" id="cancelQuizBtn">Вернуться к заданию</button></div><div id="quizResult" class="lesson-check-info" style="margin-top: 1rem;"></div></div>`;
        lessonContent.innerHTML = html;
        document.getElementById('submitQuizBtn').addEventListener('click', () => {
            const code = getCode();
            if (!code || !code.trim()) {
                const resultDiv = document.getElementById('quizResult');
                resultDiv.textContent = "Напиши код в редакторе перед проверкой.";
                resultDiv.className = "lesson-check-info warn";
                return;
            }
            const result = checkTask(lesson.id, code);
            const resultDiv = document.getElementById('quizResult');
            if (result.ok) {
                resultDiv.textContent = result.message;
                resultDiv.className = "lesson-check-info success";
                completed.add(lesson.id);
                saveProgress();
                updateProgress();
                renderNav();
                if (checkTaskBtn) { checkTaskBtn.textContent = 'Урок пройден ✓'; checkTaskBtn.disabled = true; }
                if (checkResultText) { checkResultText.textContent = 'Экзамен пройден. Урок засчитан.'; checkResultText.className = 'lesson-check-info success'; }
            } else {
                resultDiv.textContent = result.message;
                resultDiv.className = "lesson-check-info error";
            }
        });
        document.getElementById('cancelQuizBtn').addEventListener('click', () => { showQuizMode = false; renderLesson(lesson); });
        return;
    }
    let html = `<div class="quiz-container"><h2>📝 Тест по уроку ${lesson.number}: ${lesson.title}</h2><p class="quiz-warning">⚠️ Теория скрыта. Подсмотреть нельзя!</p>`;
    lesson.quiz.questions.forEach((q, idx) => {
        html += `<div class="quiz-question"><p><strong>${idx + 1}. ${q.q}</strong></p>${q.options.map((opt, optIdx) => `<label class="quiz-option"><input type="radio" name="q${idx}" value="${optIdx}"><span>${opt}</span></label>`).join('')}</div>`;
    });
    html += `<div style="margin-top: 2rem; display: flex; gap: 1rem;"><button class="btn primary" id="submitQuizBtn">Проверить тест</button><button class="btn ghost" id="cancelQuizBtn">Вернуться к теории</button></div><div id="quizResult" class="lesson-check-info" style="margin-top: 1rem;"></div></div>`;
    lessonContent.innerHTML = html;
    
    document.getElementById('submitQuizBtn').addEventListener('click', () => {
        let allCorrect = true;
        lesson.quiz.questions.forEach((q, idx) => {
            const selected = document.querySelector(`input[name="q${idx}"]:checked`);
            if (!selected || parseInt(selected.value) !== q.correct) allCorrect = false;
        });
        const resultDiv = document.getElementById('quizResult');
        if (allCorrect) {
            resultDiv.textContent = "✅ Тест пройден отлично! Урок засчитан.";
            resultDiv.className = "lesson-check-info success";
            completed.add(lesson.id);
            saveProgress();
            updateProgress();
            renderNav();
            if (checkTaskBtn) { checkTaskBtn.textContent = 'Урок пройден ✓'; checkTaskBtn.disabled = true; }
            if (checkResultText) { checkResultText.textContent = 'Задание выполнено. Урок пройден.'; checkResultText.className = 'lesson-check-info success'; }
        } else {
            resultDiv.textContent = "❌ Есть ошибки. Попробуй ещё раз или вернись к теории.";
            resultDiv.className = "lesson-check-info error";
        }
    });
    document.getElementById('cancelQuizBtn').addEventListener('click', () => { showQuizMode = false; renderLesson(lesson); });
}

function openLesson(id) {
    currentLessonId = id;
    const lesson = lessons.find((item) => item.id === id);
    if (!lesson) return;
    renderNav();
    renderLesson(lesson);
    setCode(lesson.starterCode || '');
    if (consoleOutput) consoleOutput.textContent = '';
    if (consoleStatus) consoleStatus.textContent = 'Готов к запуску';
}

if (checkTaskBtn) {
    checkTaskBtn.addEventListener('click', () => {
        const lesson = lessons.find((item) => item.id === currentLessonId);
        if (!lesson) return;
        const code = getCode();
        if (!code.trim()) {
            if (checkResultText) { checkResultText.textContent = 'Напиши код в редакторе перед проверкой.'; checkResultText.className = 'lesson-check-info warn'; }
            return;
        }
        const result = checkTask(lesson.id, code);
        if (checkResultText) { checkResultText.textContent = result.message; checkResultText.className = result.ok ? 'lesson-check-info success' : 'lesson-check-info error'; }
        if (result.ok) {
            completed.add(lesson.id);
            saveProgress();
            updateProgress();
            renderNav();
            if (lesson.quiz) {
                showQuizMode = true;
                renderLesson(lesson);
            } else {
                renderLesson(lesson);
            }
        }
    });
}

if (runBtn) {
    runBtn.addEventListener('click', async () => {
        const code = getCode();
        if (!code || !code.trim()) {
            if (consoleOutput) consoleOutput.textContent = 'Напиши код перед запуском.';
            if (consoleStatus) consoleStatus.textContent = 'Пустой код';
            return;
        }
        runBtn.disabled = true;
        const originalText = runBtn.textContent;
        runBtn.textContent = '⏳ Загрузка Python...';
        if (consoleStatus) consoleStatus.textContent = 'Подготовка...';
        if (consoleOutput) consoleOutput.textContent = 'Загрузка Python. Это может занять 10-30 секунд при первом запуске...\n';
        try {
            const result = await runPython(code);
            if (consoleOutput) consoleOutput.textContent = result.length === 0 ? '(нет вывода)' : result;
            if (consoleStatus) consoleStatus.textContent = 'Выполнено';
        } catch (error) {
            if (consoleOutput) consoleOutput.textContent = String(error);
            if (consoleStatus) consoleStatus.textContent = 'Ошибка';
        } finally {
            runBtn.disabled = false;
            runBtn.textContent = originalText;
        }
    });
}

if (clearOutputBtn) {
    clearOutputBtn.addEventListener('click', () => {
        if (consoleOutput) consoleOutput.textContent = '';
        if (consoleStatus) consoleStatus.textContent = 'Очищено';
    });
}

if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', () => {
        if (!confirm('Сбросить весь прогресс по урокам?')) return;
        completed = new Set();
        saveProgress();
        updateProgress();
        renderNav();
        const lesson = lessons.find((item) => item.id === currentLessonId);
        if (lesson) renderLesson(lesson);
        if (checkResultText) { checkResultText.textContent = ''; checkResultText.className = 'lesson-check-info'; }
    });
}

if (loginBtn) loginBtn.addEventListener('click', () => { authOverlay?.classList.remove('hidden'); switchAuthTab('login'); });
if (registerBtn) registerBtn.addEventListener('click', () => { authOverlay?.classList.remove('hidden'); switchAuthTab('register'); });
if (authCloseBtn) authCloseBtn.addEventListener('click', () => authOverlay?.classList.add('hidden'));
authOverlay?.addEventListener('click', (e) => { if (e.target === authOverlay) authOverlay.classList.add('hidden'); });
authTabs.forEach((btn) => btn.addEventListener('click', () => switchAuthTab(btn.dataset.tab)));

loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        const res = auth.login(loginUsername?.value, loginPassword?.value);
        if (!res.ok) { if (loginError) loginError.textContent = res.message; return; }
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
    } catch (err) { if (loginError) loginError.textContent = 'Ошибка входа'; }
});

registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (registerPassword?.value !== registerPassword2?.value) { if (registerError) registerError.textContent = 'Пароли не совпадают'; return; }
    try {
        const res = auth.register(registerUsername?.value, registerPassword?.value);
        if (!res.ok) { if (registerError) registerError.textContent = res.message; return; }
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
    } catch (err) { if (registerError) registerError.textContent = 'Ошибка регистрации'; }
});

logoutBtn?.addEventListener('click', () => {
    try { auth.logout(); } catch (e) {}
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

try {
    updateUserUI();
    loadProgress();
    updateProgress();
    if (editorContainer) initEditor(editorContainer, lessons[0]?.starterCode || '');
    openLesson(0);
    renderNav();
} catch (e) {
    console.error(e);
    if (lessonsNav) lessonsNav.innerHTML = '<div style="padding:1rem;color:#f87171;">Ошибка загрузки уроков</div>';
}
