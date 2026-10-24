(function() {
    function prevent(e) {
        e.preventDefault();
        return false;
    }
    document.addEventListener('copy', prevent);
    document.addEventListener('cut', prevent);
    document.addEventListener('contextmenu', prevent);
    document.addEventListener('selectstart', prevent);
    document.addEventListener('dragstart', prevent);
    document.onselectstart = function() { return false; };
    document.oncopy = function() { return false; };
    document.oncut = function() { return false; };
    document.oncontextmenu = function() { return false; };
    const style = document.createElement('style');
    style.textContent = '*{-webkit-user-select:none !important;-moz-user-select:none !important;-ms-user-select:none !important;user-select:none !important;} input, textarea, .code-textarea, [contenteditable="true"]{-webkit-user-select:text !important;-moz-user-select:text !important;-ms-user-select:text !important;user-select:text !important;}';
    document.head.appendChild(style);
})();
