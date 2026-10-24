let pyodideInstance = null;
let pyodideLoadingPromise = null;

export async function loadPyodide() {
    if (pyodideInstance) {
        return pyodideInstance;
    }

    if (pyodideLoadingPromise) {
        return pyodideLoadingPromise;
    }

    pyodideLoadingPromise = (async () => {
        if (typeof loadPyodide === 'undefined') {
            throw new Error('Pyodide не загрузился. Убедись, что подключён скрипт pyodide.js');
        }
        const pyodide = await loadPyodide({
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
