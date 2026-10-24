import { lessons } from './lessons.js';
import { initEditor, getCode, setCode } from './editor.js';
import { runPython } from './pyodide-runner.js';

const STORAGE_KEY = 'python-s-nulya-progress';

const lessonsNav = document.getElementById('lessonsNav');
const lessonContent = document.getElementById('lessonContent');
const markDoneBtn = document.getElementById('markDoneBtn');
const runBtn = document.getElementById('runBtn');
const clearOutputBtn = document.getElementById('clearOutputBtn');
const consoleOutput = document.getElementById('consoleOutput');
const consoleStatus = document.getElementById('consoleStatus');
const progressText = document.getElementById('progressText');
const progressBarFill = document.getElementById('progressBarFill');
const resetProgressBtn = document.getElementById('resetProgressBtn');
const editorContainer = document.getElementById('editorContainer');

let currentLessonId = 0;
let completed = new Set();

function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completed)));
    } catch (error) {
        console.warn('Не удалось сохранить прогресс', error);
    }
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
    lessonContent.innerHTML = lesson.content;
    markDoneBtn.textContent = completed.has(lesson.id) ? 'Урок пройден ✓' : 'Отметить урок пройденным';
    markDoneBtn.disabled = completed.has(lesson.id);
    markDoneBtn.classList.toggle('primary', !completed.has(lesson.id));
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

markDoneBtn.addEventListener('click', () => {
    const lesson = lessons.find((item) => item.id === currentLessonId);
    if (!lesson) return;
    completed.add(lesson.id);
    saveProgress();
    updateProgress();
    renderNav();
    renderLesson(lesson);
});

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

resetProgressBtn.addEventListener('click', () => {
    if (!confirm('Сбросить весь прогресс по урокам?')) return;
    completed = new Set();
    saveProgress();
    updateProgress();
    renderNav();
    const lesson = lessons.find((item) => item.id === currentLessonId);
    if (lesson) renderLesson(lesson);
});

loadProgress();
updateProgress();
initEditor(editorContainer, lessons[0]?.starterCode || '');
openLesson(0);
renderNav();
