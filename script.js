document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let displayValue = '0';
    let expression = '';
    let operatorClicked = false;  
    const updateDisplay = (btnText) => {
        if (displayValue === '0' && btnText !== '.') {
            displayValue = '';
        }

        displayValue += btnText;
        expression += btnText;
        display.textContent = expression;  
    };

    
    const performOperation = (operator) => {
        if (operator === 'C') {
            displayValue = '0';
            expression = '';
            display.textContent = displayValue;
            operatorClicked = false;  
        } else if (operator === '=') {
            try {
                const evaluation = eval(expression);
                displayValue = evaluation + '';
                display.textContent = displayValue;
                expression = displayValue;
                operatorClicked = false;  
            } catch (e) {
                display.textContent = 'Error';
                displayValue = '0';
                expression = '';
                operatorClicked = false;  
            }
        } else if (operator === '.' && displayValue.includes('.')) {
            return;
        } else {
            if (!operatorClicked) {
                if (displayValue === '0') {
                    displayValue = '';
                }
                displayValue += operator;
                expression += operator;
                display.textContent = expression;
                operatorClicked = true;  
            }
        }
    };

    const buttons = document.querySelectorAll('.btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            const btnText = buttons[i].textContent;

            if (buttons[i].id === 'clear') {
                performOperation('C');
            } else if (buttons[i].id === 'equals') {
                performOperation('=');
            } else if (buttons[i].classList.contains('operator')) {
                performOperation(btnText);
            } else {
                updateDisplay(btnText);
            }
        });
    }
});
