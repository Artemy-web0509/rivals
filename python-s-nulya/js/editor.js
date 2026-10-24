import { basicSetup } from 'https://cdn.jsdelivr.net/npm/codemirror@6.0.1/dist/index.js';
import { EditorView, keymap } from 'https://cdn.jsdelivr.net/npm/@codemirror/view@6.28.4/dist/index.js';
import { python } from 'https://cdn.jsdelivr.net/npm/@codemirror/lang-python@6.1.6/dist/index.js';
import { oneDark } from 'https://cdn.jsdelivr.net/npm/@codemirror/theme-one-dark@6.1.2/dist/index.js';
import { indentWithTab } from 'https://cdn.jsdelivr.net/npm/@codemirror/commands@6.6.0/dist/index.js';

let editorView = null;

export function initEditor(container, initialCode = '') {
    if (editorView) {
        editorView.destroy();
    }

    editorView = new EditorView({
        doc: initialCode,
        extensions: [
            basicSetup,
            python(),
            oneDark,
            keymap.of([indentWithTab]),
            EditorView.theme({
                '&': {
                    height: '100%',
                    fontSize: '0.98rem'
                },
                '.cm-scroller': {
                    fontFamily: "'JetBrains Mono', monospace"
                }
            })
        ],
        parent: container
    });

    return editorView;
}

export function getCode() {
    if (!editorView) return '';
    return editorView.state.doc.toString();
}

export function setCode(code = '') {
    if (!editorView) return;
    editorView.dispatch({
        changes: {
            from: 0,
            to: editorView.state.doc.length,
            insert: code
        }
    });
}
