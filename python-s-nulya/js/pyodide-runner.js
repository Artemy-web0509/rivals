let pyodideInstance = null;
let pyodideLoadingPromise = null;

async function getLoader() {
    if (typeof window !== 'undefined' && typeof window.loadPyodide === 'function') {
        return window.loadPyodide;
    }

    for (let i = 0; i < 50; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (typeof window !== 'undefined' && typeof window.loadPyodide === 'function') {
            return window.loadPyodide;
        }
    }

    return null;
}

export async function loadPyodide() {
    if (pyodideInstance) {
        return pyodideInstance;
    }

    if (pyodideLoadingPromise) {
        return pyodideLoadingPromise;
    }

    pyodideLoadingPromise = (async () => {
        const loader = await getLoader();
        if (!loader) {
            throw new Error('Pyodide не загрузился. Сделай жёсткое обновление страницы (Cmd+Shift+R / Ctrl+Shift+R) и попробуй снова.');
        }
        const pyodide = await loader({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
        });
        pyodideInstance = pyodide;
        return pyodideInstance;
    })();

    return pyodideLoadingPromise;
}

export async function runPython(code) {
    const pyodide = await loadPyodide();
    let output = '';
    pyodide.setStdout({
        batched: (msg) => {
            output += msg + '\n';
        }
    });
    pyodide.setStderr({
        batched: (msg) => {
            output += msg + '\n';
        }
    });

    try {
        await pyodide.runPythonAsync(code);
    } catch (error) {
        output += error.toString() + '\n';
    }

    return output.trimEnd();
}
