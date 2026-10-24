let codeEditor = null;

export function initEditor(container, initialCode = '') {
    codeEditor = document.getElementById('codeEditor');
    if (!codeEditor) return;
    if (initialCode && codeEditor.value.trim() === '') {
        codeEditor.value = initialCode;
    }
    codeEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = codeEditor.selectionStart;
            const end = codeEditor.selectionEnd;
            codeEditor.value = codeEditor.value.substring(0, start) + '    ' + codeEditor.value.substring(end);
            codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
        }
    });
}

export function getCode() {
    if (!codeEditor) {
        codeEditor = document.getElementById('codeEditor');
    }
    if (!codeEditor) return '';
    return codeEditor.value;
}

export function setCode(code = '') {
    if (!codeEditor) return;
    codeEditor.value = code;
}
