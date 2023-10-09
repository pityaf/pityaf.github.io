document.addEventListener('DOMContentLoaded', () => {
    console.log('Hello!');

    const numbers = document.querySelectorAll('[data-number]');
    const operators = document.querySelectorAll('[data-operator]');

    const decimal = document.getElementById('decimal');
    const equal = document.getElementById('equal');
    const clear = document.getElementById('clear');

    const operatorOne = document.getElementById('operator-one');
    const operatorTwo = document.getElementById('operator-two');
    const sign = document.getElementById('sign');
    const result = document.getElementById('operation-result');

    let operatorIsSet = 0;
    let secondOperatorIsSetting = 0;
    let first = 1;

    let newOperation = 0;

    const cleanSlate = () => {
        operatorIsSet = 0;
        secondOperatorIsSetting = 0;
        first = 1;

        newOperation = 0;

        operatorOne.textContent = '';
        operatorTwo.textContent = '';
        sign.textContent = '';
        result.textContent = '';
    }

    console.log(numbers);
    console.log(operators);

    const appendNumber = (number) => {
        if(newOperation) {
            cleanSlate();
            newOperation = 0;
        }
        console.log('append number');
        console.log(number);
        if(!operatorIsSet) {
            secondOperatorIsSetting = 1;
            console.log(number)
            if(first) {
                if(!(number === '00')) {
                    operatorOne.textContent = number;
                    first = 0;
                } else {
                    first = 1;
                }
                return
            } else {
                operatorOne.textContent = `${operatorOne.textContent}${number}`;
                return
            }
        }


        if(first) {
            if(!(number === '00')) {
                operatorTwo.textContent = number;
                first = 0;
            } else {
                first = 1;
            }
            return
        } else {
            operatorTwo.textContent = `${operatorTwo.textContent}${number}`;
            return
        }
    };
    const setOperation = (operator) => {
        if(secondOperatorIsSetting) {
            sign.textContent = operator;
            operatorIsSet = 1;
            first = 1;
        }
    };

    const add = (num, anotherNum) => {
        return parseInt(num) + parseInt(anotherNum);
    }
    const subtract = (num, anotherNum) => {
        return num - anotherNum;
    }
    const multiply = (num, anotherNum) => {
        return num * anotherNum;
    }
    const divide = (num, anotherNum) => {
        return num / anotherNum;
    }

    const performOperation = () => {
        if(operatorOne.textContent === '' || operatorTwo.textContent === '' || sign.textContent === '') {
            return;
        }
        console.log(sign.textContent);
        switch(sign.textContent) {
            case '+':
                result.textContent = add(operatorOne.textContent, operatorTwo.textContent);
                break;
            case '-':
                result.textContent = subtract(operatorOne.textContent, operatorTwo.textContent);
                break;
            case '/':
                if(operatorTwo.textContent !== '0') {
                    result.textContent = divide(operatorOne.textContent, operatorTwo.textContent);
                } else {
                    result.textContent = 'error!';
                }
                break;
            case '*':
                result.textContent = multiply(operatorOne.textContent, operatorTwo.textContent);
                break;
        } 
        newOperation = 1;
    }

    numbers.forEach(number => {
        number.addEventListener('click', () => appendNumber(number.textContent));
    });
    operators.forEach(operator => {
        operator.addEventListener('click', () =>  setOperation(operator.textContent));
    });

    equal.addEventListener('click', () => performOperation())
    clear.addEventListener('click', () => cleanSlate())

})