const checks = {
    0: (code) => { const prints = (code.match(/print\s*\(/g) || []).length; return prints >= 2 && /["'].*["']/.test(code) ? { ok: true, message: "Отлично! Урок пройден." } : { ok: false, message: "Нужно использовать print() минимум 2 раза с текстом в кавычках." }; },
    1: (code) => { return /input\s*\(/.test(code) && /int\s*\(\s*input/.test(code) && (/f["']/.test(code) || /print\s*\([^)]*,[^)]*,[^)]*\)/.test(code)) ? { ok: true, message: "Задание выполнено верно!" } : { ok: false, message: "Нужен input, int() и f-строка." }; },
    2: (code) => { return /if\s+/.test(code) && /elif\s+/.test(code) && /else\s*:/.test(code) && (/>=/.test(code) || /</.test(code)) ? { ok: true, message: "Условия написаны правильно!" } : { ok: false, message: "Используй if/elif/else и операторы сравнения." }; },
    3: (code) => { return /for\s+.+\s+in\s+range\s*\(/.test(code) && /while\s+/.test(code) && /==/.test(code) && (/\*\*/.test(code) || /i\s*\*\s*i/.test(code)) ? { ok: true, message: "Оба цикла использованы верно!" } : { ok: false, message: "Нужны for с range, while, == и квадрат числа (i*i)." }; },
    4: (code) => { return /\[\s*\]/.test(code) && /append\s*\(/.test(code) && /while\s+True/.test(code) && /break/.test(code) && (/enumerate\s*\(/.test(code) || /for\s+.+\s+in\s+/.test(code)) ? { ok: true, message: "Список покупок работает!" } : { ok: false, message: "Нужен список, append, while True, break и вывод с нумерацией." }; },
    5: (code) => { return /\{/.test(code) && /:/.test(code) && /\[/.test(code) && (code.match(/print/g) || []).length >= 2 ? { ok: true, message: "Словарь использован верно!" } : { ok: false, message: "Создай словарь, обратись по ключу и выведи несколько контактов." }; },
    6: (code) => { return /input\s*\(/.test(code) && (/\.lower\(\)/.test(code) || /\.upper\(\)/.test(code)) && /\.replace\s*\(/.test(code) && /len\s*\(/.test(code) ? { ok: true, message: "Анализатор текста готов!" } : { ok: false, message: "Нужны input, .lower()/.upper(), .replace() и len()." }; },
    7: (code) => { return /def\s+/.test(code) && (code.match(/def\s+/g) || []).length >= 2 && /return/.test(code) && /input\s*\(/.test(code) ? { ok: true, message: "Функции работают правильно!" } : { ok: false, message: "Нужны минимум 2 функции с return и input для выбора." }; },
    8: (code) => { return /json/.test(code) && /open\s*\(/.test(code) && /json\.dump/.test(code) && /json\.load/.test(code) && /encoding\s*=\s*["']utf-8["']/.test(code) ? { ok: true, message: "Работа с файлами и JSON выполнена!" } : { ok: false, message: "Нужны json, open, dump, load и encoding='utf-8'." }; },
    9: (code) => { return /try\s*:/.test(code) && /except/.test(code) && /ValueError/.test(code) && /ZeroDivisionError/.test(code) ? { ok: true, message: "Ошибки обработаны правильно!" } : { ok: false, message: "Обработай ValueError и ZeroDivisionError через try/except." }; },
    10: (code) => { return /import\s+random/.test(code) && /random\.randint/.test(code) && /while\s+/.test(code) && (/<|>/.test(code)) ? { ok: true, message: "Игра 'Угадай число' готова!" } : { ok: false, message: "Нужны random.randint, while и подсказки больше/меньше." }; },
    11: (code) => { return /\[\s*\{/.test(code) && /for\s+.+\s+in\s+/.test(code) && /lower\s*\(/.test(code) && /баллы|счёт|score/.test(code) ? { ok: true, message: "Викторина готова!" } : { ok: false, message: "Сделай список словарей, цикл for, .lower() и подсчёт баллов." }; },
    12: (code) => { return /<!DOCTYPE html>/.test(code) && /<html/.test(code) && /<head>/.test(code) && /<body>/.test(code) && /<h1>/.test(code) && /<p>/.test(code) ? { ok: true, message: "Страница HTML создана верно!" } : { ok: false, message: "Добавь DOCTYPE, html, head, body, h1 и p." }; },
    13: (code) => { return (/<link.*stylesheet/.test(code) || /<style>/.test(code)) && /color|background|font|margin|padding/.test(code) && (/\./.test(code) || /#/.test(code)) ? { ok: true, message: "CSS подключён и используется!" } : { ok: false, message: "Подключи CSS, добавь свойство и класс/ID." }; },
    15: (code) => { return /from flask import Flask/.test(code) && /@app\.route/.test(code) && /def\s+/.test(code) && /return\s+["']</.test(code) && /app\.run/.test(code) ? { ok: true, message: "Первый Flask-сервер готов!" } : { ok: false, message: "Нужны Flask, @app.route, def, return HTML и app.run()." }; },
    16: (code) => { return /render_template/.test(code) && (/'index\.html'/.test(code) || /"index\.html"/.test(code)) && (/{{/.test(code) || /{%/.test(code)) ? { ok: true, message: "Шаблоны Jinja2 работают!" } : { ok: false, message: "Используй render_template, передай переменную и выведи через {{ }}." }; },
    17: (code) => { return /request\.form/.test(code) && /methods\s*=.*POST/.test(code) && /<form/.test(code) && /method\s*=\s*["']POST["']/.test(code) ? { ok: true, message: "Формы обрабатываются правильно!" } : { ok: false, message: "Нужны request.form, methods=['GET','POST'] и HTML-форма с POST." }; },
    
    // ПРОВЕРКИ ДЛЯ ПРАКТИЧЕСКИХ ЭКЗАМЕНОВ
    29: (code) => {
        if (!/class\s+\w+/.test(code)) return { ok: false, message: "Используй класс (class) для структуры данных" };
        if (!/@app\.route/.test(code)) return { ok: false, message: "Добавь маршрут @app.route" };
        if (!/request\.form|request\.json/.test(code)) return { ok: false, message: "Обработай данные запроса (request.form или request.json)" };
        if (!/render_template|jsonify/.test(code)) return { ok: false, message: "Верни ответ через render_template или jsonify" };
        return { ok: true, message: "🏆 Экзамен 1 сдан! Отличная архитектура." };
    },
    39: (code) => {
        if (!/sqlite3|SQLAlchemy|from flask_sqlalchemy/.test(code)) return { ok: false, message: "Используй базу данных (sqlite3 или SQLAlchemy)" };
        if (!/def\s+.*\(/.test(code)) return { ok: false, message: "Используй функции для маршрутов" };
        if (!/try\s*:/.test(code)) return { ok: false, message: "Добавь обработку ошибок (try/except)" };
        return { ok: true, message: "🏆 Экзамен 2 сдан! Работа с БД и API на высоте." };
    },
    49: (code) => {
        if (!/class\s+/.test(code)) return { ok: false, message: "Используй ООП (class)" };
        if (!/@app\.route/.test(code)) return { ok: false, message: "Создай маршруты Flask" };
        if (!/sqlite3|SQLAlchemy/.test(code)) return { ok: false, message: "Подключи базу данных" };
        if (!/render_template|jsonify/.test(code)) return { ok: false, message: "Используй шаблоны или JSON" };
        if (!/try\s*:/.test(code)) return { ok: false, message: "Добавь обработку ошибок" };
        return { ok: true, message: "🎉 ФИНАЛЬНЫЙ ЭКЗАМЕН СДАН! Ты готов к реальной разработке!" };
    }
};

export function checkTask(lessonId, code) {
    const fn = checks[lessonId];
    if (!fn) return { ok: false, message: "Для этого урока пока нет автоматической проверки. Выполни задание по инструкции." };
    try { return fn(code); } catch (e) { return { ok: false, message: "Ошибка проверки. Проверь код на наличие опечаток." }; }
}
