// Инициализация переменной `expression`, которая будет хранить текущие вычисления
let expression = '';

// Получение элемента дисплея калькулятора по его ID `iphoneTotal`
const display = document.getElementById("iphoneTotal");

// Функция для добавления числа в выражение
function appendNumber(num) {
    // Если текущий выражение равно '0', заменяем его на новое число
    if (expression === '0') {
        expression = num.toString();
    } else {
        // В противном случае, добавляем число к текущему выражению
        expression += num;
    }
    // Обновляем дисплей калькулятора
    updateDisplay();
}

// Функция для добавления десятичной точки в выражение
function appendDecimal() {
    // Разделяем выражение по операторам (+, -, *, /) для получения последнего числа
    const parts = expression.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    // Проверяем, содержит ли последнее число уже десятичную точку
    if (!lastPart.includes('.')) {
        // Если нет, добавляем точку к выражению
        expression += '.';
        // Обновляем дисплей калькулятора
        updateDisplay();
    }
}

// Функция для добавления оператора в выражение
function appendOperator(operator) {
    // Если выражение пустое, ничего не делаем
    if (expression === '') return;
    // Получаем последний символ текущего выражения
    const lastChar = expression[expression.length - 1];
    // Если последний символ уже является оператором
    if (['+', '-', '*', '/'].includes(lastChar)) {
        // Заменяем последний оператор новым оператором
        expression = expression.slice(0, -1) + operator;
    } else {
        // В противном случае, добавляем оператор к выражению
        expression += operator;
    }
    // Обновляем дисплей калькулятора
    updateDisplay();
}

// Функция для вычисления логарифма последнего числа в выражении
function toggleSign() { // Имя функции осталось прежним для совместимости с HTML
    // Если выражение пустое, ничего не делаем
    if (expression === '') return;
    // Разделяем выражение по операторам, сохраняя сами операторы в массиве
    const parts = expression.split(/([\+\-\*\/])/);
    // Извлекаем последнее число из массива
    const lastPart = parts.pop();
    if (lastPart) {
        // Преобразуем последнее число в тип float
        const num = parseFloat(lastPart);
        // Проверяем, является ли последнее значение числом
        if (isNaN(num)) {
            // Если нет, выводим предупреждение
            alert("Последний элемент не является числом");
            return;
        }
        // Проверяем, положительное ли число (логарифм определён только для положительных чисел)
        if (num <= 0) {
            alert("Логарифм определён только для положительных чисел");
            return;
        }
        // Вычисляем десятичный логарифм числа. Для натурального логарифма используйте Math.log(num)
        const log = Math.log10(num);
        // Заменяем последнее число на его логарифм
        parts.push(log.toString());
        // Объединяем части обратно в строку
        expression = parts.join('');
        // Обновляем дисплей калькулятора
        updateDisplay();
    }
}

// Функция для вычисления процента от текущего выражения
function percentage() {
    try {
        // Вычисляем выражение с помощью eval, делим результат на 100 и сохраняем обратно в выражение
        expression = (eval(expression) / 100).toString();
        // Обновляем дисплей калькулятора
        updateDisplay();
    } catch (error) {
        // Если выражение некорректно, выводим предупреждение
        alert("Некорректное выражение");
    }
}

// Функция для сброса (очистки) выражения
function resetIphone() {
    // Очищаем выражение
    expression = '';
    // Обновляем дисплей калькулятора
    updateDisplay();
}

// Функция для вычисления результата выражения
function calculate() {
    try {
        // Вычисляем выражение с помощью eval
        let result = eval(expression);
        // Преобразуем результат в строку и сохраняем обратно в выражение
        expression = result.toString();
        // Обновляем дисплей калькулятора
        updateDisplay();
    } catch (error) {
        // Если выражение некорректно, выводим предупреждение
        alert("Некорректное выражение");
    }
}

// Функция для обновления дисплея калькулятора
function updateDisplay() {
    // Если выражение пустое, отображаем '0'
    if (expression === '') {
        display.innerHTML = '0';
    } else {
        // В противном случае, отображаем текущее выражение
        display.innerHTML = expression;
    }
    // Вызываем функцию для динамического изменения размера шрифта
    adjustFontSize();
}

// Функция для динамического изменения размера шрифта дисплея в зависимости от длины выражения
function adjustFontSize() {
    const maxFontSize = 32; // Максимальный размер шрифта (px)
    const minFontSize = 16; // Минимальный размер шрифта (px)
    const maxLength = 10; // Максимальная длина выражения перед уменьшением шрифта

    // Устанавливаем начальный размер шрифта
    let fontSize = maxFontSize;

    // Если длина выражения превышает максимальную длину
    if (expression.length > maxLength) {
        // Вычисляем новый размер шрифта, уменьшая его на 2px за каждый символ сверх maxLength
        fontSize = maxFontSize - (expression.length - maxLength) * 2;
        // Убедимся, что размер шрифта не меньше минимального
        if (fontSize < minFontSize) {
            fontSize = minFontSize;
        }
    }

    // Применяем вычисленный размер шрифта к дисплею
    display.style.fontSize = fontSize + 'px';
}

// Обработка ввода с клавиатуры
document.addEventListener('keydown', function(event) {
    const key = event.key; // Получаем нажатую клавишу
    if (!isNaN(key)) { // Если клавиша - цифра
        appendNumber(parseInt(key)); // Добавляем число в выражение
    } else if (key === '.' || key === ',') { // Если клавиша - точка или запятая
        appendDecimal(); // Добавляем десятичную точку
    } else if (['+', '-', '*', '/'].includes(key)) { // Если клавиша - оператор
        appendOperator(key); // Добавляем оператор в выражение
    } else if (key === 'Enter' || key === '=') { // Если клавиша - Enter или =
        event.preventDefault(); // Отменяем стандартное поведение (например, отправку формы)
        calculate(); // Вычисляем результат
    } else if (key === 'Backspace') { // Если клавиша - Backspace
        event.preventDefault(); // Отменяем стандартное поведение (например, удаление текста)
        deleteLast(); // Удаляем последний символ из выражения
    } else if (key === 'Escape') { // Если клавиша - Escape
        resetIphone(); // Сбрасываем выражение
    }
});

// Функция для удаления последнего символа из выражения
function deleteLast() {
    // Удаляем последний символ из строки `expression`
    expression = expression.slice(0, -1);
    // Обновляем дисплей калькулятора
    updateDisplay();
}
