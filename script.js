class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand !== '0' && this.currentOperand.length > 1) {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        } else {
            this.currentOperand = '0';
        }
    }

    appendNumber(number) {
        if (readyToReset) {
            this.currentOperand = '';
            readyToReset = false;
        };
        //brise se 0 ako parametar nije cijelo
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = ''
        };
        //return ako vec postoji cijelo
        if (number === '.' && this.currentOperand.includes('.')) return;
        //ako je current prazan, a klik na cijelo
        if (this.currentOperand === '' && number === '.') this.currentOperand = '0';
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        //return ako je vec unesen operator
        if (this.currentOperand === '') return;
        //compute ako postoji previousOperand
        if (this.previousOperand !== 'empty') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        //return ako nije unesen broj
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                break;
        }
        readyToReset = true;
        this.previousOperand = '';
        this.currentOperand = computation;
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != undefined) {
            this.previousOperandTextElement.innerText = this.previousOperand + ' ' + this.operation;
        } else {
            this.previousOperandTextElement.innerText = this.previousOperand;
        }
    }
}

let readyToReset = false;
const numberButtons = document.querySelectorAll('[data-number]');
const operatButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operatButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});


//tipkovnica
document.addEventListener('keypress', function (event) {
    switch (event.keyCode) {
        case 13:
            calculator.compute();
            calculator.updateDisplay();
            break;
        case 8:
            calculator.delete();
            calculator.updateDisplay();
            break;
        case 49:
            calculator.appendNumber('1');
            calculator.updateDisplay();
            break;
        case 50:
            calculator.appendNumber('2');
            calculator.updateDisplay();
            break;
        case 51:
            calculator.appendNumber('3');
            calculator.updateDisplay();
            break;
        case 52:
            calculator.appendNumber('4');
            calculator.updateDisplay();
            break;
        case 53:
            calculator.appendNumber('5');
            calculator.updateDisplay();
            break;
        case 54:
            calculator.appendNumber('6');
            calculator.updateDisplay();
            break;
        case 55:
            calculator.appendNumber('7');
            calculator.updateDisplay();
            break;
        case 56:
            calculator.appendNumber('8');
            calculator.updateDisplay();
            break;
        case 57:
            calculator.appendNumber('9');
            calculator.updateDisplay();
            break;
        case 48:
            calculator.appendNumber('0');
            calculator.updateDisplay();
            break;
        case 46:
            calculator.appendNumber('.');
            calculator.updateDisplay();
            break;
        case 43:
            calculator.chooseOperation('+');
            calculator.updateDisplay();
            break;
        case 45:
            calculator.chooseOperation('-');
            calculator.updateDisplay();
            break;
        case 42:
            calculator.chooseOperation('x');
            calculator.updateDisplay();
            break;
        case 47:
            calculator.chooseOperation('÷');
            calculator.updateDisplay();
            break;
        case 99:
            calculator.clear();
            calculator.updateDisplay();
            break;
    }
});