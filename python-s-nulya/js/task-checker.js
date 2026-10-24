const checks = {
    0: (code) => {
        const lower = code.toLowerCase();
        const prints = (code.match(/print\s*\(/g) || []).length;
        if (prints < 2) {
            return { ok: false, message: "Нужно использовать print() минимум 2 раза. Выведи имя и вторую фразу." };
        }
        if (!/["'].*["']/.test(code)) {
            return { ok: false, message: "В print() должен быть текст в кавычках." };
        }
        return { ok: true, message: "Отлично! Урок пройден." };
    },
    1: (code) => {
        if (!/input\s*\(/.test(code)) {
            return { ok: false, message: "Не хватает input(). Нужно спросить у пользователя данные." };
        }
        if (!/int\s*\(\s*input/.test(code)) {
            return { ok: false, message: "Нужно преобразовать возраст в число через int(input(...))" };
        }
        if (!/f["']/.test(code) && !/print\s*\([^)]*,[^)]*,[^)]*\)/.test(code)) {
            return { ok: false, message: "Используй f-строку или вывод через запятую, чтобы вывести имя, город и возраст." };
        }
        return { ok: true, message: "Задание выполнено верно! Урок пройден." };
    },
    2: (code) => {
        if (!/if\s+/.test(code)) {
            return { ok: false, message: "Нужно использовать конструкцию if" };
        }
        if (!/elif\s+/.test(code)) {
            return { ok: false, message: "Сделай проверку по возрастным группам через if/elif/else" };
        }
        if (!/else\s*:/.test(code)) {
            return { ok: false, message: "Добавь else для последнего варианта" };
        }
        if (!/>=/.test(code) && !/</.test(code)) {
            return { ok: false, message: "Используй операторы сравнения (>=, <)" };
        }
        return { ok: true, message: "Условия написаны правильно! Урок пройден." };
    },
    3: (code) => {
        if (!/for\s+.+\s+in\s+range\s*\(/.test(code)) {
            return { ok: false, message: "Часть А: используй цикл for с range()" };
        }
        if (!/while\s+/.test(code)) {
            return { ok: false, message: "Часть Б: используй цикл while для проверки пароля" };
        }
        if (!/==/.test(code)) {
            return { ok: false, message: "Сравни пароль через == " };
        }
        if (!/\*\*/.test(code) && !/i\s*\*\s*i/.test(code)) {
            return { ok: false, message: "Выведи квадрат числа. Например i*i" };
        }
        return { ok: true, message: "Оба цикла использованы верно! Урок пройден." };
    },
    4: (code) => {
        if (!/\[\s*\]/.test(code)) {
            return { ok: false, message: "Создай пустой список: []" };
        }
        if (!/append\s*\(/.test(code)) {
            return { ok: false, message: "Используй append() для добавления товара" };
        }
        if (!/while\s+True/.test(code)) {
            return { ok: false, message: "Используй цикл while True" };
        }
        if (!/break/.test(code)) {
            return { ok: false, message: "Выход по пустой строке через break" };
        }
        if (!/enumerate\s*\(/.test(code) && !/for\s+.+\s+in\s+/.test(code)) {
            return { ok: false, message: "После выхода выведи список с нумерацией" };
        }
        return { ok: true, message: "Список покупок работает правильно! Урок пройден." };
    },
    5: (code) => {
        if (!/\{/.test(code) || !/:/.test(code)) {
            return { ok: false, message: "Создай словарь в формате ключ: значение" };
        }
        if (!/\[/.test(code)) {
            return { ok: false, message: "Обращайся к значению по ключу через []" };
        }
        if ((code.match(/print/g) || []).length < 2) {
            return { ok: false, message: "Выведи несколько контактов" };
        }
        return { ok: true, message: "Словарь использован верно! Урок пройден." };
    },
    6: (code) => {
        if (!/input\s*\(/.test(code)) {
            return { ok: false, message: "Спроси текст у пользователя" };
        }
        if (!/\.lower\(\)/.test(code) && !/\.upper\(\)/.test(code)) {
            return { ok: false, message: "Используй .lower() или .upper()" };
        }
        if (!/\.replace\s*\(/.test(code)) {
            return { ok: false, message: "Используй .replace() для замены слова" };
        }
        if (!/len\s*\(/.test(code)) {
            return { ok: false, message: "Выведи длину текста через len()" };
        }
        return { ok: true, message: "Анализатор текста готов! Урок пройден." };
    },
    7: (code) => {
        if (!/def\s+/.test(code)) {
            return { ok: false, message: "Создай функции через def" };
        }
        if ((code.match(/def\s+/g) || []).length < 2) {
            return { ok: false, message: "Нужны минимум 2 функции (например сложение и вычитание)" };
        }
        if (!/return/.test(code)) {
            return { ok: false, message: "Функции должны возвращать результат через return" };
        }
        if (!/input\s*\(/.test(code)) {
            return { ok: false, message: "Сделай выбор действия через input()" };
        }
        return { ok: true, message: "Функции работают правильно! Урок пройден." };
    },
    8: (code) => {
        if (!/json/.test(code)) {
            return { ok: false, message: "Импортируй json" };
        }
        if (!/open\s*\(/.test(code)) {
            return { ok: false, message: "Используй open() для работы с файлом" };
        }
        if (!/json\.dump/.test(code) && !/json\.dumps/.test(code)) {
            return { ok: false, message: "Сохрани данные через json.dump()" };
        }
        if (!/json\.load/.test(code) && !/json\.loads/.test(code)) {
            return { ok: false, message: "Загрузи данные через json.load()" };
        }
        if (!/encoding\s*=\s*["']utf-8["']/.test(code)) {
            return { ok: false, message: "Добавь encoding='utf-8' для работы с русским языком" };
        }
        return { ok: true, message: "Работа с файлами и JSON выполнена! Урок пройден." };
    },
    9: (code) => {
        if (!/try\s*:/.test(code)) {
            return { ok: false, message: "Используй try" };
        }
        if (!/except/.test(code)) {
            return { ok: false, message: "Используй except для обработки ошибок" };
        }
        if (!/ValueError/.test(code)) {
            return { ok: false, message: "Обработай ValueError (неправильный ввод)" };
        }
        if (!/ZeroDivisionError/.test(code)) {
            return { ok: false, message: "Обработай ZeroDivisionError (деление на ноль)" };
        }
        return { ok: true, message: "Ошибки обработаны правильно! Урок пройден." };
    },
    10: (code) => {
        if (!/import\s+random/.test(code)) {
            return { ok: false, message: "Импортируй модуль random" };
        }
        if (!/random\.randint/.test(code)) {
            return { ok: false, message: "Используй random.randint() для загадывания числа" };
        }
        if (!/while\s+/.test(code)) {
            return { ok: false, message: "Используй цикл while для угадывания" };
        }
        if (!/if\s+.+</.test(code) && !/if\s+.+>/.test(code)) {
            return { ok: false, message: "Добавь подсказки больше/меньше" };
        }
        return { ok: true, message: "Игра 'Угадай число' готова! Урок пройден." };
    },
    11: (code) => {
        if (!/\[\s*\{/.test(code)) {
            return { ok: false, message: "Сделай список вопросов в виде словаря" };
        }
        if (!/for\s+.+\s+in\s+/.test(code)) {
            return { ok: false, message: "Используй цикл for для перебора вопросов" };
        }
        if (!/lower\s*\(/.test(code)) {
            return { ok: false, message: "Приводи ответ к нижнему регистру через .lower()" };
        }
        if (!/баллы|счёт|score/.test(code)) {
            return { ok: false, message: "Считай правильные ответы" };
        }
        return { ok: true, message: "Викторина готова! Урок пройден." };
    },
    12: (code) => {
        if (!/<!DOCTYPE html>/.test(code)) {
            return { ok: false, message: "Добавь DOCTYPE html" };
        }
        if (!/<html/.test(code) || !/<\/html>/.test(code)) {
            return { ok: false, message: "Есть тег html" };
        }
        if (!/<head>/.test(code) || !/<body>/.test(code)) {
            return { ok: false, message: "Есть head и body" };
        }
        if (!/<h1>/.test(code)) {
            return { ok: false, message: "Добавь заголовок h1" };
        }
        if (!/<p>/.test(code)) {
            return { ok: false, message: "Добавь абзац p" };
        }
        return { ok: true, message: "Страница HTML создана верно! Урок пройден." };
    },
    13: (code) => {
        if (!/<link.*stylesheet/.test(code) && !/<style>/.test(code) && !/style\s*=/.test(code)) {
            return { ok: false, message: "Подключи или добавь CSS" };
        }
        if (!/color|background|font|margin|padding/.test(code)) {
            return { ok: false, message: "Добавь хотя бы одно CSS-свойство" };
        }
        if (!/\./.test(code) && !/#/.test(code)) {
            return { ok: false, message: "Используй класс (.) или id (#)" };
        }
        return { ok: true, message: "CSS подключён и используется! Урок пройден." };
    },
    15: (code) => {
        if (!/from flask import Flask/.test(code)) {
            return { ok: false, message: "Импортируй Flask" };
        }
        if (!/@app\.route/.test(code)) {
            return { ok: false, message: "Создай маршрут через @app.route" };
        }
        if (!/def\s+/.test(code)) {
            return { ok: false, message: "Создай функцию для маршрута" };
        }
        if (!/return\s+["']</.test(code)) {
            return { ok: false, message: "Верни HTML через return" };
        }
        if (!/app\.run/.test(code)) {
            return { ok: false, message: "Добавь app.run()" };
        }
        return { ok: true, message: "Первый Flask-сервер готов! Урок пройден." };
    },
    16: (code) => {
        if (!/render_template/.test(code)) {
            return { ok: false, message: "Используй render_template()" };
        }
        if (!/templates/.test(code) && !/'index\.html'/.test(code) && !/"index\.html"/.test(code)) {
            return { ok: false, message: "Подключи шаблон из папки templates" };
        }
        if (!/{{/.test(code) && !/{%/.test(code)) {
            return { ok: false, message: "Используй переменные {{ }} или теги {% %} в шаблоне" };
        }
        return { ok: true, message: "Шаблоны Jinja2 работают! Урок пройден." };
    },
    17: (code) => {
        if (!/request\.form/.test(code)) {
            return { ok: false, message: "Получай данные формы через request.form" };
        }
        if (!/methods\s*=.*POST/.test(code)) {
            return { ok: false, message: "Добавь методы ['GET', 'POST'] в route" };
        }
        if (!/<form/.test(code)) {
            return { ok: false, message: "Сделай HTML-форму" };
        }
        if (!/method\s*=\s*["']POST["']/.test(code)) {
            return { ok: false, message: "У формы должен быть method='POST'" };
        }
        return { ok: true, message: "Формы обрабатываются правильно! Урок пройден." };
    }
};

export function checkTask(lessonId, code) {
    const fn = checks[lessonId];
    if (!fn) {
        return { ok: false, message: "Для этого урока пока нет автоматической проверки. Выполни задание по инструкции и нажми 'Проверить задание' ещё раз после доработки." };
    }
    try {
        return fn(code);
    } catch (e) {
        return { ok: false, message: "Ошибка проверки. Проверь код на наличие опечаток." };
    }
}
