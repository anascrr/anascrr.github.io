const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function handleNumber(number) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    currentInput = currentInput === '0' ? number : currentInput + number;
}

function handleDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function calculate() {
    if (operator === null || shouldResetDisplay) {
        return;
    }
    const secondOperand = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case 'add':
            result = firstOperand + secondOperand;
            break;
        case 'subtract':
            result = firstOperand - secondOperand;
            break;
        case 'multiply':
            result = firstOperand * secondOperand;
            break;
        case 'divide':
            if (secondOperand === 0) {
                alert("Erro: Divisão por zero!");
                clearCalculator();
                return;
            }
            result = firstOperand / secondOperand;
            break;
    }
    
    currentInput = result.toString();
    operator = null;
    shouldResetDisplay = true;
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);
    if (operator && !shouldResetDisplay) {
        calculate();
        updateDisplay();
    }
    firstOperand = parseFloat(currentInput);
    operator = nextOperator;
    shouldResetDisplay = true;
}

function clearCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const { value, action } = button.dataset;

        if (value) {
            handleNumber(value);
        } else {
            switch (action) {
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    handleOperator(action);
                    break;
                case 'decimal':
                    handleDecimal();
                    break;
                case 'clear':
                    clearCalculator();
                    break;
                case 'calculate':
                    calculate();
                    break;
            }
        }
        updateDisplay();
    });
});

updateDisplay();