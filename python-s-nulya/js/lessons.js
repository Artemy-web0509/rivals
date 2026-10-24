export const lessons = [
    {
        id: 0,
        number: "0",
        title: "Введение + настройка",
        subtitle: "Знакомство с курсом и тренажёром",
        content: `
            <h1>Урок 0. Введение + настройка</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Python — язык программирования, который прост для старта. Мы будем учить его пошагово, чтобы в конце научиться писать небольшие сайты.</p>
            <h2>2. Как устроен тренажёр</h2>
            <ul>
                <li><strong>Слева</strong> — уроки по порядку</li>
                <li><strong>Посередине</strong> — теория, разбор, практика</li>
                <li><strong>Справа</strong> — редактор кода и консоль</li>
            </ul>
            <div class="lesson-callout"><div class="lesson-callout-title">Главный принцип</div><p>Понимать → Разбирать → Пробовать по шагам → Выполнять задание</p></div>
            <h2>3. Первая команда print()</h2>
            <pre><code>print("Привет, мир!")</code></pre>
            <p><code>print()</code> выводит текст на экран. Текст в кавычках.</p>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Запусти пример</li><li>Замени текст на свой</li><li>Добавь вторую строчку print()</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Выведи своё имя и фразу "Я учусь писать сайты" двумя print()</p></div></div>
        `,
        starterCode: `print("Привет, мир!")\n`
    },
    {
        id: 1,
        number: "1",
        title: "Переменные, типы данных, ввод/вывод",
        subtitle: "Храним и получаем данные",
        content: `
            <h1>Урок 1. Переменные, типы данных, ввод/вывод</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Программе нужно запоминать данные: имя пользователя, возраст и др. Для этого используются переменные.</p>
            <h2>2. Переменная</h2>
            <pre><code>имя = "Алексей"
print(имя)</code></pre>
            <p><code>=</code> — присваивание. Кавычки не нужны при выводе переменной.</p>
            <h2>3. Типы данных</h2>
            <ul><li><code>str</code> — строка "текст"</li><li><code>int</code> — целое число 10</li><li><code>float</code> — дробное 10.5</li></ul>
            <h2>4. Ввод input()</h2>
            <pre><code>имя = input("Как тебя зовут? ")
print("Привет,", имя)</code></pre>
            <h2>5. Преобразование в число</h2>
            <pre><code>возраст = int(input("Сколько тебе лет? "))
print("Через год:", возраст + 1)</code></pre>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Создай переменные разных типов</li><li>Сделай ввод имени</li><li>Сделай ввод числа и посчитай с ним</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай анкету: спроси имя, город, возраст (числом). Выведи красивую фразу с помощью f-строки.</p></div></div>
        `,
        starterCode: `имя = input("Как тебя зовут? ")\nвозраст = int(input("Сколько тебе лет? "))\nprint(f"Привет, {имя}! Тебе {возраст} лет.")\n`
    },
    {
        id: 2,
        number: "2",
        title: "Условия if/elif/else",
        subtitle: "Принимаем решения",
        content: `
            <h1>Урок 2. Условия if/elif/else</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Программа должна реагировать по-разному в зависимости от данных.</p>
            <h2>2. if и else</h2>
            <pre><code>возраст = int(input("Возраст: "))
if возраст >= 18:
    print("Доступ разрешён")
else:
    print("Доступ запрещён")</code></pre>
            <p>После <code>if</code> двоеточие и отступ 4 пробела.</p>
            <h2>3. elif</h2>
            <pre><code>балл = int(input("Балл: "))
if балл >= 90:
    print("5")
elif балл >= 75:
    print("4")
elif балл >= 60:
    print("3")
else:
    print("2")</code></pre>
            <h2>4. and/or</h2>
            <p><code>and</code> — оба условия верны. <code>or</code> — хотя бы одно.</p>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Проверь возраст</li><li>Сделай проверку оценки</li><li>Объедини условия через and</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай проверку возраста для кино: <12 — мультфильмы, 12-15 — с родителями, >=16 — любые.</p></div></div>
        `,
        starterCode: `возраст = int(input("Сколько тебе лет? "))\nif возраст >= 18:\n    print("Совершеннолетний")\nelse:\n    print("Несовершеннолетний")\n`
    },
    {
        id: 3,
        number: "3",
        title: "Циклы for и while",
        subtitle: "Повторяем код",
        content: `
            <h1>Урок 3. Циклы for и while</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Повторять действия без копипаста.</p>
            <h2>2. for + range</h2>
            <pre><code>for i in range(1, 6):
    print(i)</code></pre>
            <h2>3. while</h2>
            <pre><code>счёт = 1
while счёт <= 5:
    print(счёт)
    счёт += 1</code></pre>
            <p><code>+=1</code> то же самое что <code>счёт = счёт + 1</code></p>
            <div class="lesson-callout warning"><div class="lesson-callout-title">Важно</div><p>В while обязательно меняй переменную, иначе бесконечный цикл.</p></div>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Выведи числа 1-10</li><li>Выведи квадраты чисел</li><li>Сделай ввод пароля пока неверный</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Часть А: for от 1 до 10 с квадратом. Часть Б: while с правильным паролем.</p></div></div>
        `,
        starterCode: `for i in range(1, 6):\n    print(i)\n`
    },
    {
        id: 4,
        number: "4",
        title: "Списки",
        subtitle: "Много данных в одном месте",
        content: `
            <h1>Урок 4. Списки</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Хранить список покупок, имена, задачи в одной переменной.</p>
            <h2>2. Создание и доступ</h2>
            <pre><code>фрукты = ["яблоко", "банан", "апельсин"]
print(фрукты[0])</code></pre>
            <h2>3. Методы</h2>
            <ul><li><code>append()</code> — добавить в конец</li><li><code>insert()</code> — добавить по индексу</li><li><code>remove()</code> — удалить по значению</li><li><code>pop()</code> — удалить по индексу/последний</li><li><code>len()</code> — длина</li></ul>
            <h2>4. Перебор списка</h2>
            <pre><code>for ф in фрукты:
    print("-", ф)</code></pre>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Создай список</li><li>Добавь/удали элементы</li><li>Перебери циклом</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай "Список покупок" с вводом через while, выход по пустой строке, вывод с нумерацией.</p></div></div>
        `,
        starterCode: `список = ["хлеб", "молоко"]\nсписок.append("яйца")\nprint(список)\n`
    },
    {
        id: 5,
        number: "5",
        title: "Словари",
        subtitle: "Ключ -> значение",
        content: `
            <h1>Урок 5. Словари</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Когда нужно связать данные: имя -> телефон, товар -> цена.</p>
            <h2>2. Создание</h2>
            <pre><code>пользователь = {"имя": "Иван", "возраст": 16, "город": "Москва"}
print(пользователь["имя"])</code></pre>
            <h2>3. Добавление/изменение/удаление</h2>
            <pre><code>пользователь["телефон"] = "+7..."
пользователь["возраст"] = 17
del пользователь["город"]</code></pre>
            <h2>4. Перебор</h2>
            <pre><code>for ключ, значение in пользователь.items():
    print(ключ, ":", значение)</code></pre>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Создай словарь</li><li>Достань значение по ключу</li><li>Добавь новый ключ</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай словарь с контактами. Добавь 3 контакта, выведи все в виде "Имя: телефон".</p></div></div>
        `,
        starterCode: `контакты = {"Аня": "+79001234567", "Миша": "+79007654321"}\nprint(контакты["Аня"])\n`
    },
    {
        id: 6,
        number: "6",
        title: "Строки, методы, f-строки",
        subtitle: "Работаем с текстом",
        content: `
            <h1>Урок 6. Строки, методы, f-строки</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Тексты в формах, сообщения, имена - везде строки.</p>
            <h2>2. Конкатенация и f-строки</h2>
            <pre><code>имя = "Катя"
print(f"Привет, {имя}!")</code></pre>
            <h2>3. Полезные методы</h2>
            <ul><li><code>.lower()</code> — нижний регистр</li><li><code>.upper()</code> — верхний регистр</li><li><code>.strip()</code> — убрать пробелы</li><li><code>.replace(a,b)</code> — заменить</li><li><code>.split()</code> — разделить</li><li><code>len()</code> — длина</li></ul>
            <pre><code>текст = "  Привет Мир  "
print(текст.strip().lower())</code></pre>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Попробуй все методы</li><li>Сделай замену слова</li><li>Разбей строку на слова</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай анализатор текста: спроси текст, выведи длину, верхний/нижний регистр, замени слово.</p></div></div>
        `,
        starterCode: `имя = "анна"\nprint(имя.capitalize())\nprint(имя.upper())\n`
    },
    {
        id: 7,
        number: "7",
        title: "Функции",
        subtitle: "Упаковываем и переиспользуем код",
        content: `
            <h1>Урок 7. Функции</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Чтобы не дублировать код. Один раз написали - много раз вызвали.</p>
            <h2>2. Простая функция</h2>
            <pre><code>def привет(имя):
    print(f"Привет, {имя}!")

привет("Оля")
привет("Дима")</code></pre>
            <h2>3. return</h2>
            <p>Функция может вернуть результат.</p>
            <pre><code>def сумма(a,b):
    return a + b

рез = сумма(5,7)
print(рез)</code></pre>
            <h2>4. Значения по умолчанию</h2>
            <pre><code>def привет(имя="друг"):
    print(f"Привет, {имя}!")

привет()
привет("Коля")</code></pre>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Сделай функцию без return</li><li>Сделай функцию с return</li><li>Используй результат в print</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай функции: сложение, вычитание, умножение, деление. Попроси числа и выбери действие.</p></div></div>
        `,
        starterCode: `def приветствие(имя):\n    print(f"Привет, {имя}!")\n\nприветствие("Тест")\n`
    },
    {
        id: 8,
        number: "8",
        title: "Файлы и JSON",
        subtitle: "Сохраняем данные",
        content: `
            <h1>Урок 8. Файлы и JSON</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Чтобы данные не исчезали после закрытия программы.</p>
            <h2>2. Чтение/запись файла</h2>
            <pre><code># запись
with open("заметки.txt", "w", encoding="utf-8") as f:
    f.write("Моя первая заметка")

# чтение
with open("заметки.txt", "r", encoding="utf-8") as f:
    print(f.read())</code></pre>
            <h2>3. JSON - хранение структур данных</h2>
            <pre><code>import json

данные = {"имя": "Маша", "возраст": 16}
with open("user.json", "w", encoding="utf-8") as f:
    json.dump(данные, f, ensure_ascii=False, indent=4)

with open("user.json", "r", encoding="utf-8") as f:
    загрузка = json.load(f)
    print(загрузка)</code></pre>
            <div class="lesson-callout"><div class="lesson-callout-title">Важно</div><p><code>with open</code> сам закрывает файл. Используй <code>encoding="utf-8"</code> для русского текста.</p></div>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Сохрани текст в файл</li><li>Прочитай файл</li><li>Сохрани список/словарь в JSON</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай заметки: добавь заметку в JSON-файл, при запуске показывай все заметки.</p></div></div>
        `,
        starterCode: `import json\n\nданные = [{"текст": "Первая заметка"}]\nwith open("заметки.json", "w", encoding="utf-8") as f:\n    json.dump(данные, f, ensure_ascii=False, indent=4)\n\nprint("Сохранено!")\n`
    },
    {
        id: 9,
        number: "9",
        title: "Ошибки и try/except",
        subtitle: "Делаем программу устойчивой",
        content: `
            <h1>Урок 9. Ошибки и try/except</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Если пользователь введёт букву вместо числа - программа не должна крашиться.</p>
            <h2>2. Базовый try/except</h2>
            <pre><code>try:
    число = int(input("Введи число: "))
    print(число * 2)
except ValueError:
    print("Нужно ввести именно число!")</code></pre>
            <h2>3. Несколько ошибок</h2>
            <pre><code>try:
    a = int(input("a: "))
    b = int(input("b: "))
    print(a/b)
except ValueError:
    print("Только числа")
except ZeroDivisionError:
    print("На ноль делить нельзя")</code></pre>
            <h2>4. else/finally</h2>
            <p><code>else</code> выполняется если нет ошибки. <code>finally</code> выполняется всегда.</p>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Поймай ValueError</li><li>Поймай деление на 0</li><li>Сделай ввод числа с проверкой</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Переделай калькулятор из урока 7 с обработкой ошибок: неверный ввод и деление на ноль.</p></div></div>
        `,
        starterCode: `try:\n    x = int(input("Число: "))\n    print(x * 2)\nexcept ValueError:\n    print("Ошибка! Введи число.")\n`
    },
    {
        id: 10,
        number: "10",
        title: "Модули и библиотеки",
        subtitle: "Подключаем готовый код",
        content: `
            <h1>Урок 10. Модули и библиотеки</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>В Python много готового. Не изобретай велосипед.</p>
            <h2>2. Встроенные модули</h2>
            <pre><code>import random

число = random.randint(1, 100)
print(число)</code></pre>
            <pre><code>import datetime
print(datetime.datetime.now())</code></pre>
            <pre><code>import math
print(math.sqrt(25))</code></pre>
            <h2>3. from import</h2>
            <pre><code>from random import randint
print(randint(1,10))</code></pre>
            <h2>4. Свой модуль</h2>
            <p>Можно создать файл <code>мои_функции.py</code> и импортировать из него.</p>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Сгенерируй случайное число</li><li>Посмотри дату/время</li><li>Используй math</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай "Угадай число" с random. Компьютер загадывает число, ты угадываешь с подсказками больше/меньше.</p></div></div>
        `,
        starterCode: `import random\n\nprint(random.randint(1, 10))\n`
    },
    {
        id: 11,
        number: "11",
        title: "Повторение Python + мини-проект Викторина",
        subtitle: "Закрепляем базу",
        content: `
            <h1>Урок 11. Повторение + мини-проект "Викторина"</h1>
            <h2>1. Повторяем главное</h2>
            <ul><li>Переменные, input/int</li><li>if/elif/else</li><li>for/while</li><li>Списки, словари</li><li>Функции</li><li>try/except</li></ul>
            <h2>2. Проект Викторина</h2>
            <p>Соберём викторину со счётом баллов.</p>
            <div class="lesson-callout success"><div class="lesson-callout-title">Задача</div><p>Используй словарь или список вопросов. Считай правильные ответы. В конце покажи результат.</p></div>
            <div class="lesson-steps"><div class="lesson-steps-title">План по шагам</div><ol class="lesson-steps-list"><li>Создай вопросы и ответы</li><li>Сделай цикл по вопросам</li><li>Проверяй ответ</li><li>Считай баллы</li><li>Выведи итог</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Финальное задание по Python</div></div><div class="lesson-task-body"><p>Сделай викторину минимум из 5 вопросов с подсчётом правильных ответов.</p></div></div>
        `,
        starterCode: `вопросы = [\n    {"вопрос": "Столица России?", "ответ": "москва"},\n    {"вопрос": "2+2=?", "ответ": "4"},\n]\nбаллы = 0\nfor q in вопросы:\n    ans = input(q["вопрос"] + " ").lower()\n    if ans == q["ответ"]:\n        print("Верно!")\n        баллы += 1\n    else:\n        print("Неверно")\nprint("Результат:", баллы, "/", len(вопросы))\n`
    },
    {
        id: 12,
        number: "12",
        title: "Введение в HTML",
        subtitle: "Строим структуру сайта",
        content: `
            <h1>Урок 12. Введение в HTML</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>HTML — скелет сайта. Заголовки, тексты, картинки, ссылки.</p>
            <h2>2. Базовая структура</h2>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="ru"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Мой сайт&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Привет!&lt;/h1&gt;
  &lt;p&gt;Это мой первый сайт&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <h2>3. Основные теги</h2>
            <ul><li><code>&lt;h1&gt;-&lt;h6&gt;</code> — заголовки</li><li><code>&lt;p&gt;</code> — абзац</li><li><code>&lt;a href&gt;</code> — ссылка</li><li><code>&lt;img src alt&gt;</code> — картинка</li><li><code>&lt;ul&gt;&lt;li&gt;</code> — список</li><li><code>&lt;br&gt;</code> — перенос</li></ul>
            <div class="lesson-callout"><div class="lesson-callout-title">Совет</div><p>Сохраняй файл как <code>index.html</code> и открывай в браузере.</p></div>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Сделай базовую структуру</li><li>Добавь заголовок и текст</li><li>Добавь ссылку и список</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай страницу "Обо мне": заголовок, фото-текст, хобби списком, ссылку на соцсеть.</p></div></div>
        `,
        starterCode: `<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="UTF-8">\n  <title>Мой первый сайт</title>\n</head>\n<body>\n  <h1>Привет, мир!</h1>\n  <p>Я учусь создавать сайты</p>\n</body>\n</html>\n`
    },
    {
        id: 13,
        number: "13",
        title: "Введение в CSS",
        subtitle: "Оформляем сайт",
        content: `
            <h1>Урок 13. Введение в CSS</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>HTML — структура, CSS — внешний вид (цвета, отступы, шрифты).</p>
            <h2>2. Способы подключения</h2>
            <ul><li>Внутри тега <code>style</code></li><li>Атрибут <code>style="..."</code> (редко)</li><li>Отдельный файл <code>style.css</code> (правильный способ)</li></ul>
            <h2>3. Подключение файла</h2>
            <pre><code>&lt;link rel="stylesheet" href="style.css"&gt;</code></pre>
            <h2>4. Базовые свойства</h2>
            <pre><code>body {
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
}

h1 {
  color: blue;
  text-align: center;
}

p {
  font-size: 18px;
  margin: 20px;
}</code></pre>
            <h2>5. Классы</h2>
            <pre><code>&lt;p class="красный"&gt;Текст&lt;/p&gt;

.красный {
  color: red;
}</code></pre>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Подключи CSS</li><li>Поменяй цвет и шрифт</li><li>Сделай отступы</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Оформи страницу из урока 12: фон, цвет заголовка, выравнивание, отступы.</p></div></div>
        `,
        starterCode: `body {\n  background-color: #1f1f1f;\n  color: white;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  text-align: center;\n  color: #4f9bff;\n}\n`
    },
    {
        id: 14,
        number: "14",
        title: "Как работает веб. Браузер-сервер",
        subtitle: "Понимаем основы",
        content: `
            <h1>Урок 14. Как работает веб</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Чтобы понимать, что происходит когда ты открываешь сайт.</p>
            <h2>2. Простыми словами</h2>
            <p><strong>Браузер</strong> (Chrome) просит у <strong>сервера</strong> страницу. Сервер отдаёт HTML, CSS, JS. Браузер показывает сайт.</p>
            <h2>3. URL</h2>
            <p><code>https://example.ru/index.html</code> — адрес сайта.</p>
            <h2>4. Статический vs Динамический</h2>
            <ul><li><strong>Статический</strong> — одинаковый для всех (визитка)</li><li><strong>Динамический</strong> — меняется под пользователя (форум, гостевая книга)</li></ul>
            <h2>5. HTTP запросы</h2>
            <ul><li><code>GET</code> — получить страницу/данные</li><li><code>POST</code> — отправить данные с формы</li></ul>
            <div class="lesson-callout"><div class="lesson-callout-title">Ключ к пониманию</div><p>Сейчас мы будем делать динамический сайт на Flask. Flask будет нашим сервером.</p></div>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Открой DevTools (F12) → Network</li><li>Обнови страницу и посмотри запросы</li><li>Подумай: статический или динамический сайт?</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Опиши своими словами: как открывается сайт от ввода адреса до показа в браузере.</p></div></div>
        `,
        starterCode: `# Теория\n# GET - получить\n# POST - отправить\nprint("Понял принцип работы сайта")\n`
    },
    {
        id: 15,
        number: "15",
        title: "Знакомство с Flask",
        subtitle: "Первый сайт на Python",
        content: `
            <h1>Урок 15. Знакомство с Flask</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Flask позволяет писать сайт на Python. Мы создадим сервер, который будет отдавать страницы.</p>
            <h2>2. Установка (инфо)</h2>
            <p>В терминале: <code>pip install flask</code></p>
            <h2>3. Первый маршрут</h2>
            <pre><code>from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "&lt;h1&gt;Привет! Это мой первый сайт на Flask&lt;/h1&gt;"

if __name__ == '__main__':
    app.run(debug=True)</code></pre>
            <h2>4. Разбор</h2>
            <ul><li><code>Flask(__name__)</code> — создаём приложение</li><li><code>@app.route('/')</code> — декоратор, говорит какой URL обрабатывать</li><li><code>def home()</code> — функция, возвращает HTML</li><li><code>app.run(debug=True)</code> — запускаем сервер</li></ul>
            <div class="lesson-callout warning"><div class="lesson-callout-title">Важно</div><p>В этом браузерном тренажёре Flask не запустится. Пиши код локально в VS Code/Thonny и запускай в терминале.</p></div>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Создай app.py</li><li>Напиши первый маршрут</li><li>Запусти и открой http://127.0.0.1:5000</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай 2 маршрута: / — главная, /about — страница "Обо мне". На каждой верни разный HTML.</p></div></div>
        `,
        starterCode: `from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef index():\n    return "<h1>Главная страница</h1>"\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`
    },
    {
        id: 16,
        number: "16",
        title: "Шаблоны Jinja2",
        subtitle: "Отдельные HTML-файлы",
        content: `
            <h1>Урок 16. Шаблоны Jinja2</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Возвращать огромный HTML из Python неудобно. Лучше хранить в отдельных .html файлах.</p>
            <h2>2. Структура проекта</h2>
            <pre><code>project/
├── app.py
└── templates/
    ├── index.html
    └── about.html</code></pre>
            <h2>3. render_template</h2>
            <pre><code>from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)</code></pre>
            <h2>4. Передача данных в шаблон</h2>
            <pre><code>@app.route('/')
def home():
    имя = "Артём"
    return render_template('index.html', имя=имя)</code></pre>
            <pre><code>&lt;h1&gt;Привет, {{ имя }}!&lt;/h1&gt;</code></pre>
            <h2>5. Условия и циклы в шаблоне</h2>
            <pre><code>{% if возраст >= 18 %}
  &lt;p&gt;Совершеннолетний&lt;/p&gt;
{% else %}
  &lt;p&gt;Несовершеннолетний&lt;/p&gt;
{% endif %}

{% for товар in список %}
  &lt;li&gt;{{ товар }}&lt;/li&gt;
{% endfor %}</code></pre>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Создай папку templates</li><li>Сделай index.html</li><li>Передай переменную из Python в шаблон</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай страницу с циклом: передай список любимых фильмов и выведи их в виде списка &lt;ul&gt;.</p></div></div>
        `,
        starterCode: `from flask import Flask, render_template\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return render_template('index.html', имя="Тест")\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`
    },
    {
        id: 17,
        number: "17",
        title: "Формы и обработка данных",
        subtitle: "Получаем данные от пользователя",
        content: `
            <h1>Урок 17. Формы и обработка данных</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Формы позволяют пользователю вводить данные (имя, отзыв, сообщение).</p>
            <h2>2. HTML форма</h2>
            <pre><code>&lt;form action="/send" method="POST"&gt;
  &lt;input type="text" name="имя" placeholder="Твое имя" required&gt;
  &lt;input type="text" name="сообщение" placeholder="Сообщение" required&gt;
  &lt;button type="submit"&gt;Отправить&lt;/button&gt;
&lt;/form&gt;</code></pre>
            <h2>3. Обработка в Flask</h2>
            <pre><code>from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        имя = request.form['имя']
        сообщение = request.form['сообщение']
        return f"&lt;p&gt;Спасибо, {имя}! Твое сообщение: {сообщение}&lt;/p&gt;"
    return render_template('form.html')

if __name__ == '__main__':
    app.run(debug=True)</code></pre>
            <h2>4. GET vs POST</h2>
            <ul><li><code>GET</code> — просто открыть страницу</li><li><code>POST</code> — отправить данные формы</li></ul>
            <div class="lesson-callout warning"><div class="lesson-callout-title">Важно</div><p>У поля input обязательно должно быть <code>name="..."</code>, по нему мы достаём данные в Python.</p></div>
            <div class="lesson-steps"><div class="lesson-steps-title">Практика по шагам</div><ol class="lesson-steps-list"><li>Сделай HTML форму</li><li>Обработай POST запрос</li><li>Выведи полученные данные</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай форму "Обратная связь": имя, email, сообщение. При отправке показывай "Спасибо за сообщение, [имя]!".</p></div></div>
        `,
        starterCode: `from flask import Flask, render_template, request\n\napp = Flask(__name__)\n\n@app.route('/', methods=['GET', 'POST'])\ndef index():\n    if request.method == 'POST':\n        имя = request.form.get('имя')\n        return f"<h2>Привет, {имя}!</h2>"\n    return render_template('index.html')\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`
    },
    {
        id: 18,
        number: "18",
        title: "Проект: Гостевая книга на Flask",
        subtitle: "Первый полноценный сайт",
        content: `
            <h1>Урок 18. Проект: Гостевая книга на Flask</h1>
            <h2>1. Задача</h2>
            <p>Сделаем гостевую книгу: люди могут оставить отзыв, все отзывы сохраняются и отображаются.</p>
            <h2>2. Структура</h2>
            <pre><code>guestbook/
├── app.py
├── reviews.json
├── templates/
│   ├── base.html
│   ├── index.html
│   └── add.html
└── static/
    └── style.css</code></pre>
            <h2>3. План работы</h2>
            <div class="lesson-steps"><div class="lesson-steps-title">По шагам</div><ol class="lesson-steps-list"><li><strong>Шаг 1.</strong> Создай базовый шаблон base.html с меню</li><li><strong>Шаг 2.</strong> Главная страница - список отзывов</li><li><strong>Шаг 3.</strong> Страница добавления отзыва (форма)</li><li><strong>Шаг 4.</strong> Сохранение в JSON</li><li><strong>Шаг 5.</strong> Отображение отзывов при загрузке</li><li><strong>Шаг 6.</strong> Добавь стили CSS</li></ol></div>
            <h2>4. Подсказки по коду</h2>
            <ul><li>Читай JSON при старте: <code>json.load</code></li><li>Добавь новый отзыв в список</li><li>Сохрани обратно: <code>json.dump</code></li><li>Используй <code>datetime</code> для даты</li></ul>
            <div class="lesson-callout success"><div class="lesson-callout-title">Главная цель</div><p>Понять связку: форма → Flask → сохранение → показ на странице</p></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Собери гостевую книгу по плану выше. Минимум: форма + сохранение в JSON + вывод всех отзывов.</p></div></div>
        `,
        starterCode: `# app.py заготовка\nfrom flask import Flask, render_template, request, redirect\nimport json, os\nfrom datetime import datetime\n\napp = Flask(__name__)\n\n@app.route('/')\ndef index():\n    return render_template('index.html')\n\n@app.route('/add', methods=['GET', 'POST'])\ndef add():\n    if request.method == 'POST':\n        # TODO: сохранить отзыв\n        return redirect('/')\n    return render_template('add.html')\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`
    },
    {
        id: 19,
        number: "19",
        title: "Проект: Сайт-визитка с навигацией",
        subtitle: "Финальный проект курса",
        content: `
            <h1>Урок 19. Финальный проект: Сайт-визитка</h1>
            <h2>1. Задача</h2>
            <p>Сделай полноценный многостраничный сайт-визитку, объединяющий всё пройденное.</p>
            <h2>2. Страницы</h2>
            <ul><li><strong>Главная</strong> (/) — приветствие, кратко о себе</li><li><strong>Обо мне</strong> (/about) — фото, навыки, хобби</li><li><strong>Мои проекты</strong> (/projects) — список проектов с описанием</li><li><strong>Контакты</strong> (/contacts) — форма обратной связи</li></ul>
            <h2>3. Структура</h2>
            <pre><code>visitka/
├── app.py
├── static/
│   ├── css/style.css
│   └── img/
└── templates/
    ├── base.html
    ├── index.html
    ├── about.html
    ├── projects.html
    └── contacts.html</code></pre>
            <h2>4. Чек-лист для проверки</h2>
            <ul><li>[ ] Есть базовый шаблон с навигацией на все страницы</li><li>[ ] Подключён CSS из static/</li><li>[ ] Использованы шаблоны Jinja2</li><li>[ ] На странице проектов используется цикл</li><li>[ ] Есть форма на странице контактов с обработкой POST</li><li>[ ] Стили сделаны аккуратными</li></ul>
            <div class="lesson-callout success"><div class="lesson-callout-title">Поздравляю!</div><p>Если ты сделал этот проект самостоятельно — ты уже можешь писать небольшие сайты на Flask.</p></div>
            <div class="lesson-steps"><div class="lesson-steps-title">План</div><ol class="lesson-steps-list"><li>Сделай структуру папок</li><li>Создай base.html с меню</li><li>Сделай все страницы</li><li>Добавь CSS</li><li>Настрой роуты во Flask</li><li>Протести все переходы</li></ol></div>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Финальное задание</div></div><div class="lesson-task-body"><p>Собери сайт-визитку по чек-листу. Сделай его про себя. Потом можешь доработать как захочешь.</p></div></div>
        `,
        starterCode: `from flask import Flask, render_template, request\n\napp = Flask(__name__)\n\n@app.route('/')\ndef index():\n    return render_template('index.html')\n\n@app.route('/about')\ndef about():\n    return render_template('about.html')\n\n@app.route('/projects')\ndef projects():\n    мои_проекты = ["Викторина на Python", "Гостевая книга", "Сайт-визитка"]\n    return render_template('projects.html', проекты=мои_проекты)\n\n@app.route('/contacts', methods=['GET', 'POST'])\ndef contacts():\n    if request.method == 'POST':\n        return "<h2>Сообщение отправлено!</h2><a href='/'>На главную</a>"\n    return render_template('contacts.html')\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`
    }
];
