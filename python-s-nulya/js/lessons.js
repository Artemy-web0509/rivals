 export const lessons = [
    {
        id: 0, number: "0", title: "Введение + настройка", subtitle: "Знакомство с курсом и тренажёром",
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
        starterCode: `print("Привет, мир!")\n`,
        quiz: { questions: [ { q: "Какая функция выводит текст на экран?", options: ["echo()", "print()", "log()"], correct: 1 }, { q: "Текст в Python обязательно брать в...", options: ["Круглые скобки", "Кавычки", "Фигурные скобки"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 1, number: "1", title: "Переменные, типы данных, ввод/вывод", subtitle: "Храним и получаем данные",
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
        starterCode: `имя = input("Как тебя зовут? ")\nвозраст = int(input("Сколько тебе лет? "))\nprint(f"Привет, {имя}! Тебе {возраст} лет.")\n`,
        quiz: { questions: [ { q: "Как преобразовать строку в число?", options: ["str()", "int()", "float()"], correct: 1 }, { q: "Что делает f перед строкой f'...'", options: ["Делает строку жирной", "Позволяет вставлять переменные в {}", "Ничего не делает"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 2, number: "2", title: "Условия if/elif/else", subtitle: "Принимаем решения",
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
        starterCode: `возраст = int(input("Сколько тебе лет? "))\nif возраст >= 18:\n    print("Совершеннолетний")\nelse:\n    print("Несовершеннолетний")\n`,
        quiz: { questions: [ { q: "С каким символом заканчивается строка с if?", options: ["Точка с запятой", "Двоеточие", "Запятая"], correct: 1 }, { q: "Что проверяет оператор == ?", options: ["Присваивание", "Равенство", "Неравенство"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 3, number: "3", title: "Циклы for и while", subtitle: "Повторяем код",
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
        starterCode: `for i in range(1, 6):\n    print(i)\n`,
        quiz: { questions: [ { q: "Какая функция генерирует последовательность чисел?", options: ["generate()", "range()", "list()"], correct: 1 }, { q: "Что будет, если в while не менять переменную?", options: ["Цикл завершится", "Бесконечный цикл", "Ошибка синтаксиса"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 4, number: "4", title: "Списки", subtitle: "Много данных в одном месте",
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
        starterCode: `список = ["хлеб", "молоко"]\nсписок.append("яйца")\nprint(список)\n`,
        quiz: { questions: [ { q: "Как добавить элемент в конец списка?", options: ["add()", "append()", "push()"], correct: 1 }, { q: "Какой индекс у первого элемента списка?", options: ["1", "0", "-1"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 5, number: "5", title: "Словари", subtitle: "Ключ -> значение",
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
        starterCode: `контакты = {"Аня": "+79001234567", "Миша": "+79007654321"}\nprint(контакты["Аня"])\n`,
        quiz: { questions: [ { q: "Как получить значение из словаря?", options: ["по индексу", "по ключу", "по порядку"], correct: 1 }, { q: "Какой метод возвращает пары ключ-значение?", options: [".values()", ".items()", ".keys()"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 6, number: "6", title: "Строки, методы, f-строки", subtitle: "Работаем с текстом",
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
        starterCode: `имя = "анна"\nprint(имя.capitalize())\nprint(имя.upper())\n`,
        quiz: { questions: [ { q: "Какой метод делает все буквы заглавными?", options: [".upper()", ".lower()", ".capitalize()"], correct: 0 }, { q: "Какой метод убирает пробелы по краям?", options: [".trim()", ".strip()", ".clean()"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 7, number: "7", title: "Функции", subtitle: "Упаковываем и переиспользуем код",
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
        starterCode: `def приветствие(имя):\n    print(f"Привет, {имя}!")\n\nприветствие("Тест")\n`,
        quiz: { questions: [ { q: "Какое ключевое слово создаёт функцию?", options: ["func", "def", "function"], correct: 1 }, { q: "Что делает return?", options: ["Выводит на экран", "Возвращает результат из функции", "Останавливает программу"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 8, number: "8", title: "Файлы и JSON", subtitle: "Сохраняем данные",
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
        starterCode: `import json\n\nданные = [{"текст": "Первая заметка"}]\nwith open("заметки.json", "w", encoding="utf-8") as f:\n    json.dump(данные, f, ensure_ascii=False, indent=4)\n\nprint("Сохранено!")\n`,
        quiz: { questions: [ { q: "Какой режим открытия файла для записи?", options: ["'r'", "'w'", "'a'"], correct: 1 }, { q: "Зачем нужен encoding='utf-8'?", options: ["Для скорости", "Для корректной работы с русским текстом", "Для шифрования"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 9, number: "9", title: "Ошибки и try/except", subtitle: "Делаем программу устойчивой",
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
        starterCode: `try:\n    x = int(input("Число: "))\n    print(x * 2)\nexcept ValueError:\n    print("Ошибка! Введи число.")\n`,
        quiz: { questions: [ { q: "Какой блок выполняется, если ошибки не было?", options: ["finally", "else", "catch"], correct: 1 }, { q: "Какую ошибку вызовет деление на ноль?", options: ["ValueError", "ZeroDivisionError", "TypeError"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 10, number: "10", title: "Модули и библиотеки", subtitle: "Подключаем готовый код",
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
        starterCode: `import random\n\nprint(random.randint(1, 10))\n`,
        quiz: { questions: [ { q: "Как импортировать конкретную функцию из модуля?", options: ["import func from math", "from math import func", "include math.func"], correct: 1 }, { q: "Какой модуль генерирует случайные числа?", options: ["random", "chance", "luck"], correct: 0 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 11, number: "11", title: "Повторение Python + мини-проект Викторина", subtitle: "Закрепляем базу",
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
        starterCode: `вопросы = [\n    {"вопрос": "Столица России?", "ответ": "москва"},\n    {"вопрос": "2+2=?", "ответ": "4"},\n]\nбаллы = 0\nfor q in вопросы:\n    ans = input(q["вопрос"] + " ").lower()\n    if ans == q["ответ"]:\n        print("Верно!")\n        баллы += 1\n    else:\n        print("Неверно")\nprint("Результат:", баллы, "/", len(вопросы))\n`,
        quiz: { questions: [ { q: "Что лучше использовать для хранения вопроса и ответа?", options: ["Список", "Словарь", "Строка"], correct: 1 }, { q: "Как привести ответ пользователя к нижнему регистру?", options: [".down()", ".lower()", ".small()"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 12, number: "12", title: "Введение в HTML", subtitle: "Строим структуру сайта",
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
        starterCode: `<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="UTF-8">\n  <title>Мой первый сайт</title>\n</head>\n<body>\n  <h1>Привет, мир!</h1>\n  <p>Я учусь создавать сайты</p>\n</body>\n</html>\n`,
        quiz: { questions: [ { q: "Какой тег создаёт самый большой заголовок?", options: ["<head>", "<h1>", "<title>"], correct: 1 }, { q: "Какой атрибут задаёт ссылку в теге <a>?", options: ["src", "href", "link"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 13, number: "13", title: "Введение в CSS", subtitle: "Оформляем сайт",
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
        starterCode: `body {\n  background-color: #1f1f1f;\n  color: white;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  text-align: center;\n  color: #4f9bff;\n}\n`,
        quiz: { questions: [ { q: "Как подключить внешний CSS файл?", options: ["<style>", "<link rel='stylesheet'>", "<css>"], correct: 1 }, { q: "Как обратиться к классу в CSS?", options: ["#имя", ".имя", "@имя"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 14, number: "14", title: "Как работает веб. Браузер-сервер", subtitle: "Понимаем основы",
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
        starterCode: `# Теория\n# GET - получить\n# POST - отправить\nprint("Понял принцип работы сайта")\n`,
        quiz: { questions: [ { q: "Какой HTTP-метод используется для отправки формы?", options: ["GET", "POST", "SEND"], correct: 1 }, { q: "Что такое сервер?", options: ["Программа на компьютере пользователя", "Компьютер, который отдаёт данные по запросу", "Браузер"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 15, number: "15", title: "Знакомство с Flask", subtitle: "Первый сайт на Python",
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
        starterCode: `from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef index():\n    return "<h1>Главная страница</h1>"\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`,
        quiz: { questions: [ { q: "Какой декоратор задаёт маршрут?", options: ["@app.path", "@app.route", "@route"], correct: 1 }, { q: "Что делает debug=True?", options: ["Ускоряет сайт", "Показывает ошибки в браузере и перезагружает сервер", "Шифрует код"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 16, number: "16", title: "Шаблоны Jinja2", subtitle: "Отдельные HTML-файлы",
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
        starterCode: `from flask import Flask, render_template\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return render_template('index.html', имя="Тест")\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`,
        quiz: { questions: [ { q: "Как передать переменную в шаблон?", options: ["render_template('f.html', var=value)", "send(var)", "html(var)"], correct: 0 }, { q: "Как вывести переменную в Jinja2?", options: ["{ var }", "{{ var }}", "<%= var %>"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 17, number: "17", title: "Формы и обработка данных", subtitle: "Получаем данные от пользователя",
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
        starterCode: `from flask import Flask, render_template, request\n\napp = Flask(__name__)\n\n@app.route('/', methods=['GET', 'POST'])\ndef index():\n    if request.method == 'POST':\n        имя = request.form.get('имя')\n        return f"<h2>Привет, {имя}!</h2>"\n    return render_template('index.html')\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`,
        quiz: { questions: [ { q: "Откуда брать данные формы во Flask?", options: ["request.data", "request.form", "request.input"], correct: 1 }, { q: "Какой атрибут обязателен у <input> для отправки?", options: ["id", "name", "class"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 18, number: "18", title: "Проект: Гостевая книга на Flask", subtitle: "Первый полноценный сайт",
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
        starterCode: `# app.py заготовка\nfrom flask import Flask, render_template, request, redirect\nimport json, os\nfrom datetime import datetime\n\napp = Flask(__name__)\n\n@app.route('/')\ndef index():\n    return render_template('index.html')\n\n@app.route('/add', methods=['GET', 'POST'])\ndef add():\n    if request.method == 'POST':\n        # TODO: сохранить отзыв\n        return redirect('/')\n    return render_template('add.html')\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`,
        quiz: { questions: [ { q: "Как перенаправить пользователя на другую страницу?", options: ["return redirect('/')", "return go('/')", "window.location"], correct: 0 }, { q: "Где должны лежать HTML-шаблоны во Flask?", options: ["В корне", "В папке templates", "В папке static"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 19, number: "19", title: "ПРОМЕЖУТОЧНЫЙ ЭКЗАМЕН. Уроки 0-18", subtitle: "Напиши работающий сайт на Flask с нуля",
        content: `
            <h1>ПРОМЕЖУТОЧНЫЙ ЭКЗАМЕН</h1>
            <h2>Задание</h2>
            <p><strong>Напиши с нуля полный, рабочий многостраничный сайт-визитку на Flask.</strong></p>
            <p>Используй ТОЛЬКО темы, пройденные до этого урока.</p>
            <h2>Требования</h2>
            <ul>
                <li>Структура: app.py, папка templates/ с минимум 3-мя HTML-шаблонами, папка static/ с style.css</li>
                <li>Минимум 3 маршрута через @app.route (главная, страница "Обо мне", страница с контактами)</li>
                <li>Используй render_template для HTML-страниц</li>
                <li>Используй базовый шаблон (base.html) с наследованием или единый стиль через CSS</li>
                <li>На одной из страниц реализуй форму (GET/POST), обработай через request.form</li>
                <li>Подключи CSS из static/</li>
            </ul>
            <p><strong>Без подсказок. Напиши весь код сайта целиком в редакторе.</strong></p>
        `,
        starterCode: `from flask import Flask, render_template, request\n\napp = Flask(__name__)\n\n# Напиши полный рабочий сайт-визитку здесь\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`,
        quiz: { type: 'exam', mode: 'code', title: 'Промежуточный экзамен 1', instructions: 'Напиши с нуля работающий многостраничный сайт-визитку на Flask. Обязательные требования: @app.route минимум 3 маршрута, render_template, templates/, static/style.css, форма с request.form, наследование шаблонов или единый стиль.', checks: ['flask', 'route', 'render_template', 'templates', 'static', 'form', 'request'] }
    },
    {
        id: 20, number: "20", title: "ООП: Классы и объекты", subtitle: "Основы объектно-ориентированного программирования",
        content: `
            <h1>Урок 20. ООП: Классы и объекты</h1>
            <h2>1. Зачем это нужно?</h2>
            <p>Когда программа становится большой, удобно группировать данные и функции вместе. Классы позволяют создавать свои "типы данных" с методами (функциями) и атрибутами (переменными).</p>
            <h2>2. Создание класса</h2>
            <pre><code>class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Привет, меня зовут {self.name}!"

user1 = User("Артём", 25)
print(user1.greet())
print(user1.name)</code></pre>
            <h2>3. Разбор</h2>
            <ul>
                <li><code>class User:</code> — объявляем класс</li>
                <li><code>__init__</code> — конструктор, вызывается при создании объекта</li>
                <li><code>self</code> — ссылка на сам объект</li>
                <li><code>self.name = name</code> — сохраняем значение в атрибут</li>
            </ul>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Создай класс <code>Student</code> с полями <code>name</code> и <code>grade</code>. Добавь метод <code>introduce()</code>, который выводит "Меня зовут [имя], я учусь на [оценка]".</p></div></div>
        `,
        starterCode: `class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    
    def introduce(self):
        return f"Меня зовут {self.name}, я учусь на {self.grade}"

student = Student("Артём", "отлично")
print(student.introduce())`,
        quiz: { questions: [ { q: "Что такое self в Python?", options: ["Указатель на текущий объект", "Глобальная переменная", "Ключевое слово для импорта"], correct: 0 }, { q: "Какой метод является конструктором?", options: ["__start__", "__init__", "create"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 21, number: "21", title: "Наследование и инкапсуляция", subtitle: "Расширяем возможности классов",
        content: `
            <h1>Урок 21. Наследование</h1>
            <h2>1. Наследование</h2>
            <pre><code>class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return f"{self.name} говорит: Гав!"

dog = Dog("Бобик")
print(dog.speak())</code></pre>
            <h2>2. super() — вызов метода родителя</h2>
            <pre><code>class Employee(Person):
    def __init__(self, name, age, salary):
        super().__init__(name, age)
        self.salary = salary</code></pre>
            <h2>3. Приватные атрибуты</h2>
            <pre><code>class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # Двойное подчёркивание = приватный
    
    def get_balance(self):
        return self.__balance</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Создай класс <code>Admin</code>, наследуемый от <code>User</code>, с дополнительным полем <code>role</code>. Переопредели метод <code>greet()</code>.</p></div></div>
        `,
        starterCode: `class User:
    def __init__(self, name):
        self.name = name
    
    def greet(self):
        return f"Привет, {self.name}"

class Admin(User):
    def __init__(self, name, role):
        super().__init__(name)
        self.role = role
    
    def greet(self):
        return f"Админ {self.name} с ролью {self.role}"

admin = Admin("Артём", "superuser")
print(admin.greet())`,
        quiz: { questions: [ { q: "Как вызвать метод родительского класса?", options: ["super()", "parent()", "base()"], correct: 0 }, { q: "Как сделать атрибут приватным?", options: ["_name", "__name", "private name"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 22, number: "22", title: "Декораторы", subtitle: "Модификация функций",
        content: `
            <h1>Урок 22. Декораторы</h1>
            <h2>1. Простой декоратор</h2>
            <pre><code>def my_decorator(func):
    def wrapper():
        print("До")
        func()
        print("После")
    return wrapper

@my_decorator
def say_hello():
    print("Привет!")

say_hello()</code></pre>
            <h2>2. Декоратор с аргументами</h2>
            <pre><code>def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Время: {time.time() - start:.2f} сек")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    return "Готово!"</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Напиши декоратор <code>logger</code>, который выводит имя вызываемой функции.</p></div></div>
        `,
        starterCode: `import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Время: {time.time() - start:.2f} сек")
        return result
    return wrapper

@timer
def test():
    time.sleep(1)
    return "Готово!"

print(test())`,
        quiz: { questions: [ { q: "Какой символ используется для декоратора?", options: ["#", "@", "&"], correct: 1 }, { q: "Что возвращает декоратор?", options: ["Новую функцию-обёртку", "Число", "Строку"], correct: 0 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 23, number: "23", title: "Генераторы и yield", subtitle: "Экономия памяти",
        content: `
            <h1>Урок 23. Генераторы</h1>
            <h2>1. Простой генератор</h2>
            <pre><code>def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1

for num in count_up_to(5):
    print(num)</code></pre>
            <h2>2. Генераторное выражение</h2>
            <pre><code># Список (занимает память)
squares_list = [x**2 for x in range(1000)]

# Генератор (экономит память)
squares_gen = (x**2 for x in range(1000))</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Создай генератор <code>even_numbers(max)</code>, который выдаёт только чётные числа от 2 до max.</p></div></div>
        `,
        starterCode: `def even_numbers(max):
    num = 2
    while num <= max:
        yield num
        num += 2

for i in even_numbers(20):
    print(i)`,
        quiz: { questions: [ { q: "Что делает yield?", options: ["Завершает функцию", "Приостанавливает и возвращает значение", "Импортирует модуль"], correct: 1 }, { q: "Какой тип данных возвращает функция с yield?", options: ["Список", "Генератор", "Словарь"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 24, number: "24", title: "Работа с API (requests)", subtitle: "Получаем данные из интернета",
        content: `
            <h1>Урок 24. API и requests</h1>
            <h2>1. GET-запрос</h2>
            <pre><code>import requests

response = requests.get("https://jsonplaceholder.typicode.com/posts/1")
print(response.status_code)
data = response.json()
print(data["title"])</code></pre>
            <h2>2. POST-запрос</h2>
            <pre><code>import requests

url = "https://jsonplaceholder.typicode.com/posts"
new_post = {"title": "Мой пост", "body": "Текст", "userId": 1}
response = requests.post(url, json=new_post)
print(response.json())</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сделай запрос к API <code>https://jsonplaceholder.typicode.com/users</code> и выведи имена первых 5 пользователей.</p></div></div>
        `,
        starterCode: `import requests

response = requests.get("https://jsonplaceholder.typicode.com/posts/1")
data = response.json()
print(f"Заголовок: {data['title']}")`,
        quiz: { questions: [ { q: "Какой метод используется для получения данных?", options: ["requests.post", "requests.get", "requests.fetch"], correct: 1 }, { q: "Как преобразовать ответ в словарь Python?", options: [".text()", ".json()", ".dict()"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 25, number: "25", title: "Базы данных SQLite", subtitle: "Хранение данных структурированно",
        content: `
            <h1>Урок 25. SQLite</h1>
            <h2>1. Создание таблицы</h2>
            <pre><code>import sqlite3

conn = sqlite3.connect("test.db")
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER
    )
""")
conn.commit()</code></pre>
            <h2>2. Вставка данных</h2>
            <pre><code>cursor.execute(
    "INSERT INTO users (name, age) VALUES (?, ?)",
    ("Артём", 25)
)
conn.commit()</code></pre>
            <h2>3. Чтение данных</h2>
            <pre><code>cursor.execute("SELECT * FROM users")
all_users = cursor.fetchall()
for user in all_users:
    print(user)</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Создай таблицу <code>tasks</code> с полями id, title, completed. Добавь 3 задачи, выведи все.</p></div></div>
        `,
        starterCode: `import sqlite3

conn = sqlite3.connect("test.db")
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER
    )
""")

cursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("Артём", 25))
conn.commit()

cursor.execute("SELECT * FROM users")
print(cursor.fetchall())

conn.close()`,
        quiz: { questions: [ { q: "Какой метод выполняет SQL-запрос?", options: ["cursor.run", "cursor.execute", "cursor.do"], correct: 1 }, { q: "Что нужно вызвать после INSERT для сохранения?", options: ["conn.save()", "conn.commit()", "conn.push()"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 26, number: "26", title: "Виртуальные окружения", subtitle: "Изоляция зависимостей",
        content: `
            <h1>Урок 26. venv</h1>
            <h2>1. Создание окружения</h2>
            <pre><code># В терминале:
python -m venv venv</code></pre>
            <h2>2. Активация</h2>
            <pre><code># Windows:
venv\\Scripts\\activate

# Linux/Mac:
source venv/bin/activate</code></pre>
            <h2>3. Установка библиотек</h2>
            <pre><code>pip install flask requests</code></pre>
            <h2>4. requirements.txt</h2>
            <pre><code># Сохранить:
pip freeze > requirements.txt

# Установить:
pip install -r requirements.txt</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Изучи команды создания venv для твоей ОС.</p></div></div>
        `,
        starterCode: `# В терминале:\n# python -m venv venv\n# source venv/bin/activate (Linux/Mac)\n# venv\\Scripts\\activate (Windows)\nprint("Окружение активировано!")`,
        quiz: { questions: [ { q: "Зачем нужно виртуальное окружение?", options: ["Для ускорения кода", "Для изоляции библиотек проекта", "Для шифрования данных"], correct: 1 }, { q: "Где хранится файл с зависимостями?", options: ["config.txt", "requirements.txt", "deps.json"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 27, number: "27", title: "Тестирование (unittest)", subtitle: "Пишем надёжный код",
        content: `
            <h1>Урок 27. unittest</h1>
            <h2>1. Простой тест</h2>
            <pre><code>import unittest

def add(a, b):
    return a + b

class TestAdd(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)

if __name__ == '__main__':
    unittest.main()</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Напиши тест для функции умножения двух чисел.</p></div></div>
        `,
        starterCode: `import unittest

def multiply(a, b):
    return a * b

class TestMultiply(unittest.TestCase):
    def test_multiply(self):
        self.assertEqual(multiply(2, 3), 6)

if __name__ == '__main__':
    unittest.main()`,
        quiz: { questions: [ { q: "Какой метод проверяет равенство?", options: ["self.check_equal", "self.assertEqual", "self.is_equal"], correct: 1 }, { q: "От какого класса наследовать тест?", options: ["unittest.Test", "unittest.TestCase", "unittest.Runner"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 28, number: "28", title: "Логирование (logging)", subtitle: "Отслеживание событий",
        content: `
            <h1>Урок 28. logging</h1>
            <h2>1. Базовое логирование</h2>
            <pre><code>import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logging.info("Приложение запущено")
logging.warning("Внимание!")
logging.error("Ошибка!")</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Настрой логирование и выведи сообщения разных уровней.</p></div></div>
        `,
        starterCode: `import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logging.info("Приложение запущено")
logging.warning("Внимание: мало места")
logging.error("Произошла ошибка!")`,
        quiz: { questions: [ { q: "Какой уровень логирования самый критичный?", options: ["INFO", "WARNING", "CRITICAL"], correct: 2 }, { q: "Зачем использовать logging?", options: ["Можно выводить в файл и управлять уровнями", "Он быстрее", "Он красивее"], correct: 0 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 29, number: "29", title: "ПРАКТИЧЕСКИЙ ЭКЗАМЕН. Уроки 0-28", subtitle: "Напиши работающий сайт с ООП на Flask с нуля",
        content: `
            <h1>ПРАКТИЧЕСКИЙ ЭКЗАМЕН 1</h1>
            <h2>Задание</h2>
            <p><strong>Напиши с нуля полноценный рабочий сайт "Библиотека книг" на Flask с использованием ООП.</strong></p>
            <p>Используй ТОЛЬКО пройденные темы.</p>
            <h2>Требования</h2>
            <ul>
                <li>Создай класс <code>Book</code> (и при необходимости другие классы)</li>
                <li>Минимум 4 маршрута через @app.route</li>
                <li>Форма добавления книги через POST с обработкой request.form</li>
                <li>Хранение данных (список/словарь в памяти)</li>
                <li>HTML-шаблоны в templates/, CSS в static/</li>
                <li>Используй render_template</li>
            </ul>
            <p><strong>Без вариантов ответов. Пиши весь код с нуля.</strong></p>
        `,
        starterCode: `from flask import Flask, render_template, request\n\napp = Flask(__name__)\n\n# Напиши сайт "Библиотека книг" с ООП с нуля\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`,
        quiz: { type: 'exam', mode: 'code', title: 'Практический экзамен 1', instructions: 'Напиши с нуля работающий сайт Библиотека книг на Flask с классом Book, формой, маршрутизацией, шаблонами.', checks: ['class', 'route', 'render_template', 'form', 'request'] }
    },
    {
        id: 30, number: "30", title: "REST API архитектура", subtitle: "GET, POST, PUT, DELETE",
        content: `
            <h1>Урок 30. REST API</h1>
            <h2>1. HTTP-методы</h2>
            <ul>
                <li><code>GET</code> — получить данные</li>
                <li><code>POST</code> — создать</li>
                <li><code>PUT</code> — обновить</li>
                <li><code>DELETE</code> — удалить</li>
            </ul>
            <h2>2. Пример</h2>
            <pre><code>@app.route('/users/&lt;int:user_id&gt;', methods=['GET'])
def get_user(user_id):
    return jsonify({"id": user_id, "name": "User"})</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Создай маршрут GET /users/&lt;id&gt;, который возвращает данные пользователя.</p></div></div>
        `,
        starterCode: `from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return jsonify({"id": user_id, "name": "User"})

if __name__ == '__main__':
    app.run(debug=True)`,
        quiz: { questions: [ { q: "Какой метод для обновления данных?", options: ["POST", "PUT", "DELETE"], correct: 1 }, { q: "Что возвращать при успешном создании?", options: ["200 OK", "201 Created", "404 Not Found"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 31, number: "31", title: "Аутентификация и JWT", subtitle: "Безопасный вход",
        content: `
            <h1>Урок 31. JWT токены</h1>
            <h2>1. Генерация токена</h2>
            <pre><code>import jwt

payload = {"user": "admin", "role": "superuser"}
secret = "my_secret_key"

token = jwt.encode(payload, secret, algorithm="HS256")
print("Токен:", token)

decoded = jwt.decode(token, secret, algorithms=["HS256"])
print("Расшифровано:", decoded)</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Сгенерируй и расшифруй JWT токен.</p></div></div>
        `,
        starterCode: `import jwt

payload = {"user": "admin", "role": "superuser"}
secret = "my_super_secret_key"

token = jwt.encode(payload, secret, algorithm="HS256")
print("Токен:", token)

decoded = jwt.decode(token, secret, algorithms=["HS256"])
print("Расшифровано:", decoded)`,
        quiz: { questions: [ { q: "Что хранится внутри JWT?", options: ["Только пароль", "Полезная нагрузка и подпись", "Исходный код"], correct: 1 }, { q: "Почему секретный ключ должен быть надёжным?", options: ["Для скорости", "Чтобы никто не подделал токен", "Для совместимости"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 32, number: "32", title: "SQLAlchemy ORM", subtitle: "Работа с БД через объекты",
        content: `
            <h1>Урок 32. SQLAlchemy</h1>
            <h2>1. Определение модели</h2>
            <pre><code>from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    age = db.Column(db.Integer)</code></pre>
            <h2>2. Создание таблиц</h2>
            <pre><code>with app.app_context():
    db.create_all()</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Определи модель User с полями id, name, email.</p></div></div>
        `,
        starterCode: `from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True)

with app.app_context():
    db.create_all()

print("Таблицы созданы!")`,
        quiz: { questions: [ { q: "Что такое ORM?", options: ["Object-Relational Mapping", "Online Request Manager", "Object Render Method"], correct: 0 }, { q: "Какой атрибут задаёт первичный ключ?", options: ["primary_key=True", "id=True", "unique=True"], correct: 0 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 33, number: "33", title: "Flask Blueprints", subtitle: "Структурирование проекта",
        content: `
            <h1>Урок 33. Blueprints</h1>
            <h2>1. Создание Blueprint</h2>
            <pre><code>from flask import Blueprint

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login')
def login():
    return "Страница входа"

# В основном файле:
# app.register_blueprint(auth_bp)</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Создай Blueprint для маршрутов авторизации.</p></div></div>
        `,
        starterCode: `from flask import Flask, Blueprint

app = Flask(__name__)

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login')
def login():
    return "Страница входа"

app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run(debug=True)`,
        quiz: { questions: [ { q: "Зачем нужны Blueprints?", options: ["Для рисования схем", "Для модульности кода", "Для ускорения БД"], correct: 1 }, { q: "Как зарегистрировать Blueprint?", options: ["app.add(bp)", "app.register_blueprint(bp)", "app.include(bp)"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 34, number: "34", title: "Fetch API на фронтенде", subtitle: "Связь JS и Python",
        content: `
            <h1>Урок 34. Fetch API</h1>
            <h2>1. GET-запрос из JavaScript</h2>
            <pre><code>fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));</code></pre>
            <h2>2. POST-запрос</h2>
            <pre><code>fetch('/api/submit', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({name: 'Артём'})
})
  .then(response => response.json())
  .then(data => console.log(data));</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Напиши JS-код для получения данных с /api/data.</p></div></div>
        `,
        starterCode: `// JavaScript код
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));`,
        quiz: { questions: [ { q: "Что возвращает fetch()?", options: ["JSON", "Promise с Response", "HTML строку"], correct: 1 }, { q: "Какой метод для чтения JSON?", options: [".text()", ".json()", ".data()"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 35, number: "35", title: "Основы WebSockets", subtitle: "Двусторонняя связь",
        content: `
            <h1>Урок 35. WebSockets</h1>
            <h2>1. Flask-SocketIO</h2>
            <pre><code>from flask import Flask
from flask_socketio import SocketIO, send

app = Flask(__name__)
socketio = SocketIO(app)

@socketio.on('message')
def handle_message(msg):
    send(msg, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Изучи пример настройки Flask-SocketIO.</p></div></div>
        `,
        starterCode: `# Требуется Flask-SocketIO
# pip install flask-socketio

from flask import Flask
from flask_socketio import SocketIO, send

app = Flask(__name__)
socketio = SocketIO(app)

@socketio.on('message')
def handle_message(msg):
    print(f"Получено: {msg}")
    send(msg, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)`,
        quiz: { questions: [ { q: "Отличие WebSocket от HTTP?", options: ["Быстрее для картинок", "Держит постоянное соединение", "Нет отличий"], correct: 1 }, { q: "Для чего используют WebSockets?", options: ["Загрузка CSS", "Чаты и уведомления", "Хранение файлов"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 36, number: "36", title: "Деплой: Gunicorn и Nginx", subtitle: "Выкладываем сайт",
        content: `
            <h1>Урок 36. Деплой</h1>
            <h2>1. Gunicorn</h2>
            <pre><code># Установка:
pip install gunicorn

# Запуск:
gunicorn -w 4 -b 127.0.0.1:8000 app:app</code></pre>
            <h2>2. Nginx (обратный прокси)</h2>
            <pre><code>server {
    listen 80;
    server_name example.com;
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
    }
}</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Изучи команду запуска Gunicorn.</p></div></div>
        `,
        starterCode: `# Запуск в терминале Linux:
# pip install gunicorn
# gunicorn -w 4 -b 127.0.0.1:8000 app:app

print("Gunicorn запущен!")`,
        quiz: { questions: [ { q: "Зачем нужен Nginx?", options: ["Для Python кода", "Для раздачи статики и защиты", "Для компиляции"], correct: 1 }, { q: "Что означает -w 4?", options: ["4 порта", "4 рабочих процесса", "4 гигабайта"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 37, number: "37", title: "Основы Docker", subtitle: "Контейнеризация",
        content: `
            <h1>Урок 37. Docker</h1>
            <h2>1. Dockerfile</h2>
            <pre><code>FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]</code></pre>
            <h2>2. Сборка и запуск</h2>
            <pre><code># Сборка образа:
docker build -t myapp .

# Запуск контейнера:
docker run -p 5000:5000 myapp</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Напиши Dockerfile для Python-приложения.</p></div></div>
        `,
        starterCode: `# Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]`,
        quiz: { questions: [ { q: "Как называется файл инструкций?", options: ["Containerfile", "Dockerfile", "Pyfile"], correct: 1 }, { q: "Что делает COPY?", options: ["Копирует файлы в образ", "Копирует образ", "Создаёт папку"], correct: 0 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 38, number: "38", title: "CI/CD и автотесты", subtitle: "Автоматизация",
        content: `
            <h1>Урок 38. CI/CD</h1>
            <h2>1. GitHub Actions</h2>
            <pre><code># .github/workflows/test.yml
name: Test
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: pytest</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Изучи структуру YAML-файла для GitHub Actions.</p></div></div>
        `,
        starterCode: `# .github/workflows/test.yml
name: Test
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: echo "Running tests"`,
        quiz: { questions: [ { q: "Что такое CI?", options: ["Continuous Integration", "Code Interface", "Computer Input"], correct: 0 }, { q: "Где хранятся конфигурации?", options: [".github/workflows/", "/ci/", "/actions/"], correct: 0 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 39, number: "39", title: "ПРАКТИЧЕСКИЙ ЭКЗАМЕН. Уроки 0-38", subtitle: "Напиши REST API с базой данных с нуля",
        content: `
            <h1>ПРАКТИЧЕСКИЙ ЭКЗАМЕН 2</h1>
            <h2>Задание</h2>
            <p><strong>Напиши с нуля рабочий REST API для блога с базой данных.</strong></p>
            <h2>Требования</h2>
            <ul>
                <li>Используй Flask + SQLite (sqlite3) или SQLAlchemy</li>
                <li>Модель/структура для постов</li>
                <li>Реализуй CRUD: GET (все), GET (один), POST (создать), PUT/PATCH (обновить), DELETE (удалить)</li>
                <li>Все ответы в формате JSON через jsonify</li>
                <li>Обработка ошибок через try/except</li>
            </ul>
            <p><strong>Без вариантов ответов. Пиши весь код с нуля.</strong></p>
        `,
        starterCode: `from flask import Flask, request, jsonify\nimport sqlite3\n\napp = Flask(__name__)\n\n# Напиши REST API блога с БД с нуля\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`,
        quiz: { type: 'exam', mode: 'code', title: 'Практический экзамен 2', instructions: 'Напиши с нуля REST API блога с CRUD операциями и работой с БД.', checks: ['sqlite', 'route', 'jsonify', 'try'] }
    },
    {
        id: 40, number: "40", title: "Безопасность: XSS и CSRF", subtitle: "Защита приложений",
        content: `
            <h1>Урок 40. Безопасность</h1>
            <h2>1. CSRF-защита</h2>
            <pre><code>from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect(app)</code></pre>
            <h2>2. XSS-защита</h2>
            <p>Jinja2 автоматически экранирует вывод. Не используй <code>|safe</code> без необходимости.</p>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Изучи, как подключить Flask-WTF для защиты форм.</p></div></div>
        `,
        starterCode: `# Flask-WTF CSRF защита
from flask import Flask
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
csrf = CSRFProtect(app)

print("CSRF защита активирована")`,
        quiz: { questions: [ { q: "Что такое XSS?", options: ["Cross-Site Scripting", "Extra Secure Server", "XML Style Sheet"], correct: 0 }, { q: "От чего защищает CSRF?", options: ["От перехвата паролей", "От подделки запросов", "От вирусов"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 41, number: "41", title: "Кэширование (Redis)", subtitle: "Ускорение приложения",
        content: `
            <h1>Урок 41. Redis</h1>
            <h2>1. Базовые операции</h2>
            <pre><code>import redis

r = redis.Redis(host='localhost', port=6379, db=0)
r.set('foo', 'bar')
print(r.get('foo').decode('utf-8'))</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Напиши пример сохранения и получения значения из Redis.</p></div></div>
        `,
        starterCode: `import redis

r = redis.Redis(host='localhost', port=6379, db=0)
r.set('foo', 'bar')
print(r.get('foo').decode('utf-8'))`,
        quiz: { questions: [ { q: "Где хранит данные Redis?", options: ["На диске", "В оперативной памяти", "В облаке"], correct: 1 }, { q: "Цель кэширования?", options: ["Шифрование", "Ускорение отклика", "Резервное копирование"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 42, number: "42", title: "Асинхронный Python", subtitle: "asyncio",
        content: `
            <h1>Урок 42. Asyncio</h1>
            <h2>1. Базовый пример</h2>
            <pre><code>import asyncio

async def main():
    print("Start")
    await asyncio.sleep(1)
    print("End")

asyncio.run(main())</code></pre>
            <h2>2. Параллельное выполнение</h2>
            <pre><code>async def task1():
    await asyncio.sleep(1)
    return "Task 1"

async def task2():
    await asyncio.sleep(2)
    return "Task 2"

async def main():
    results = await asyncio.gather(task1(), task2())
    print(results)</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Напиши асинхронную функцию с задержкой.</p></div></div>
        `,
        starterCode: `import asyncio

async def main():
    print("Start")
    await asyncio.sleep(1)
    print("End")

asyncio.run(main())`,
        quiz: { questions: [ { q: "Какое ключевое слово для асинхронной функции?", options: ["await", "async", "run"], correct: 1 }, { q: "Что делает await?", options: ["Останавливает программу", "Ждёт завершения операции", "Создаёт поток"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 43, number: "43", title: "Парсинг сайтов", subtitle: "BeautifulSoup",
        content: `
            <h1>Урок 43. Веб-скрапинг</h1>
            <h2>1. BeautifulSoup</h2>
            <pre><code>from bs4 import BeautifulSoup

html = "<h1>Заголовок</h1><p>Текст</p>"
soup = BeautifulSoup(html, 'html.parser')
print(soup.h1.text)</code></pre>
            <h2>2. Поиск элементов</h2>
            <pre><code>soup.find_all('p')  # Все теги p
soup.find(class_='my-class')  # По классу
soup.select('#my-id')  # CSS-селекторы</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Извлеки текст из тега h1 в HTML-строке.</p></div></div>
        `,
        starterCode: `from bs4 import BeautifulSoup

html = "<h1>Заголовок сайта</h1><p>Текст</p>"
soup = BeautifulSoup(html, 'html.parser')
print(soup.h1.text)`,
        quiz: { questions: [ { q: "Что делает BeautifulSoup?", options: ["Делает сайты красивыми", "Парсит HTML/XML", "Шифрует данные"], correct: 1 }, { q: "Какой парсер по умолчанию?", options: ["lxml", "html.parser", "xml"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 44, number: "44", title: "Загрузка файлов", subtitle: "Работа с S3",
        content: `
            <h1>Урок 44. Загрузка файлов</h1>
            <h2>1. Сохранение файла</h2>
            <pre><code>@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    if file:
        file.save(f"uploads/{file.filename}")
        return "Saved"
    return "No file"</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Изучи код сохранения загруженного файла.</p></div></div>
        `,
        starterCode: `from flask import Flask, request

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    if file:
        file.save(f"uploads/{file.filename}")
        return "Saved"
    return "No file"

if __name__ == '__main__':
    app.run(debug=True)`,
        quiz: { questions: [ { q: "Где хранятся загруженные файлы?", options: ["request.data", "request.files", "request.forms"], correct: 1 }, { q: "Почему используют S3?", options: ["Дешевле", "Масштабируемость", "Быстрее для CPU"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 45, number: "45", title: "JS для Python-разработчика", subtitle: "Основы JavaScript",
        content: `
            <h1>Урок 45. JavaScript</h1>
            <h2>1. Переменные и функции</h2>
            <pre><code>const name = "Артём";
console.log(\`Привет, \${name}\`);

function greet(name) {
    return \`Привет, \${name}\`;
}</code></pre>
            <h2>2. Работа с DOM</h2>
            <pre><code>document.querySelector('#btn').addEventListener('click', () => {
    alert('Нажато!');
});</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Напиши JS-код, который выводит сообщение при клике.</p></div></div>
        `,
        starterCode: `const name = "Артём";
console.log(\`Привет, \${name}\`);

// document.querySelector('#btn').addEventListener('click', () => {
//     alert('Нажато!');
// });`,
        quiz: { questions: [ { q: "Как объявить переменную в JS?", options: ["var", "let / const", "dim"], correct: 1 }, { q: "Как называется строка с интерполяцией?", options: ["f-строка", "Template literal", "Formatted string"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 46, number: "46", title: "Основы React", subtitle: "Современный фронтенд",
        content: `
            <h1>Урок 46. React</h1>
            <h2>1. Компонент</h2>
            <pre><code>function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}

ReactDOM.render(<Welcome name="Артём" />, document.getElementById('root'));</code></pre>
            <h2>2. Состояние (useState)</h2>
            <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Кликов: {count}
    </button>
  );
}</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Изучи структуру простого компонента React.</p></div></div>
        `,
        starterCode: `// Пример компонента React
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}

// ReactDOM.render(<Welcome name="Артём" />, document.getElementById('root'));`,
        quiz: { questions: [ { q: "Что такое компонент?", options: ["Функция, возвращающая UI", "База данных", "Маршрут"], correct: 0 }, { q: "Как передавать данные?", options: ["Через state", "Через props", "Через global"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 47, number: "47", title: "Архитектура MVC", subtitle: "Паттерны проектирования",
        content: `
            <h1>Урок 47. MVC</h1>
            <h2>1. Разделение ответственности</h2>
            <ul>
                <li><strong>Model</strong> — работа с данными (БД)</li>
                <li><strong>View</strong> — отображение (шаблоны)</li>
                <li><strong>Controller</strong> — логика (маршруты)</li>
            </ul>
            <h2>2. Пример во Flask</h2>
            <pre><code># Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

# Controller
@app.route('/user/<int:id>')
def get_user(id):
    user = User.query.get(id)
    return render_template('user.html', user=user)

# View (user.html)
# <h1>{{ user.name }}</h1></code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Определи, какая часть MVC отвечает за БД.</p></div></div>
        `,
        starterCode: `# Model: class User(db.Model)
# View: render_template('user.html')
# Controller: @app.route('/user')

print("Архитектура MVC разделяет логику, данные и отображение")`,
        quiz: { questions: [ { q: "Что отвечает за БД в MVC?", options: ["View", "Controller", "Model"], correct: 2 }, { q: "Где HTML-код?", options: ["Model", "View", "Controller"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 48, number: "48", title: "Портфолио разработчика", subtitle: "Как найти работу",
        content: `
            <h1>Урок 48. Портфолио</h1>
            <h2>1. Что включить</h2>
            <ul>
                <li>Сайт-визитка (Flask + HTML/CSS)</li>
                <li>REST API с БД (Flask + SQLAlchemy)</li>
                <li>Парсер или бот</li>
            </ul>
            <h2>2. README.md</h2>
            <pre><code># Название проекта

## Описание
Краткое описание что делает проект

## Технологии
- Python 3.9
- Flask
- SQLite

## Установка
\`\`\`bash
pip install -r requirements.txt
python app.py
\`\`\`

## Скриншоты
(добавь изображения)</code></pre>
            <div class="lesson-task"><div class="lesson-task-header"><div class="lesson-task-title">Задание</div></div><div class="lesson-task-body"><p>Напиши черновик README.md для своего проекта.</p></div></div>
        `,
        starterCode: `# Пример хорошего README:
# 1. Описание проекта
# 2. Стек технологий (Python, Flask, SQLite)
# 3. Инструкция по запуску
# 4. Скриншоты или GIF работы`,
        quiz: { questions: [ { q: "Что важно в GitHub профиле?", options: ["Количество звёзд", "Читаемый README и чистый код", "Цвет аватарки"], correct: 1 }, { q: "Сколько проектов в портфолио?", options: ["1", "3-4 качественных", "20 недоделанных"], correct: 1 } , { q: "Что такое отступ в Python?", options: ["Пустая строка", "Пробелы в начале строки для блока кода", "Точка с запятой"], correct: 1 }, { q: "Для чего нужны комментарии?", options: ["Для ускорения кода", "Для пояснения кода, игнорируются интерпретатором", "Для скрытия ошибок"], correct: 1 }, { q: "Что выведет print(2+3)?", options: ["23", "5", "2+3"], correct: 1 }, { q: "Какой тип данных у \"привет\"?", options: ["int", "str", "bool"], correct: 1 } ] }
    },
    {
        id: 49, number: "49", title: "🎓 ФИНАЛЬНЫЙ ЭКЗАМЕН. Уроки 0-48", subtitle: "Полноценное веб-приложение с нуля",
        content: `
            <h1>ФИНАЛЬНЫЙ ЭКЗАМЕН</h1>
            <h2>Задание</h2>
            <p><strong>Напиши с нуля полноценное рабочее веб-приложение "Портал объявлений".</strong></p>
            <h2>Требования</h2>
            <ul>
                <li>Flask + SQLite (sqlite3) или SQLAlchemy</li>
                <li>Регистрация/авторизация с использованием session</li>
                <li>CRUD для объявлений (создание, просмотр, редактирование, удаление)</li>
                <li>Шаблоны Jinja2 в templates/, CSS в static/</li>
                <li>Валидация форм</li>
                <li>Обработка ошибок через try/except</li>
            </ul>
            <p><strong>Без вариантов ответов. Пиши весь код с нуля.</strong></p>
        `,
        starterCode: `from flask import Flask, render_template, request, redirect, session\nimport sqlite3\n\napp = Flask(__name__)\napp.secret_key = 'exam_key'\n\n# Напиши портал объявлений с нуля\n\nif __name__ == '__main__':\n    app.run(debug=True)\n`,
        quiz: { type: 'exam', mode: 'code', title: 'Финальный экзамен', instructions: 'Напиши с нуля полноценное веб-приложение с авторизацией, CRUD, БД, сессиями.', checks: ['route', 'render_template', 'sqlite', 'session', 'try'] }
    }
];
