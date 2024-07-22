document.addEventListener('DOMContentLoaded', function() {
    const displayContent = document.getElementById('display');
    let displayValue = '0';
    let expression = '';
    const operators = ['+', '-', '*', '/'];
    let lastInput = '';
    let resultDisplayed = false;

    const updateDisplay = (btnText) => {
        if (resultDisplayed) {
            displayValue = '';
            expression = '';
            resultDisplayed = false;
        }

        if (displayValue === '0' && btnText !== '.') {
            displayValue = '';
        }

        displayValue += btnText;
        expression += btnText;
        displayContent.textContent = expression;
        lastInput = btnText;

        
        displayContent.scrollLeft = displayContent.scrollWidth;
    };

    const performOperation = (operator) => {
        if (operator === 'C') {
            displayValue = '0';
            expression = '';
            displayContent.textContent = displayValue;
            displayContent.scrollLeft = 0; 
            lastInput = '';
            resultDisplayed = false;
        } else if (operator === '=') {
            try {
                const evaluation = eval(expression);
                displayValue = evaluation + '';
                displayContent.textContent = displayValue;
                expression = displayValue;
                lastInput = displayValue;
                resultDisplayed = true;
                
                
                displayContent.scrollLeft = displayContent.scrollWidth;
            } catch (e) {
                displayContent.textContent = 'Error';
                displayValue = '0';
                expression = '';
                lastInput = '';
                resultDisplayed = false;
                displayContent.scrollLeft = 0; 
            }
        } else if (operator === '.' && lastInput === '.') {
            return;
        } else if (operators.includes(operator) && operators.includes(lastInput)) {
            return;
        } else {
            if (displayValue === '0' && operator !== '.') {
                displayValue = '';
            }
            displayValue += operator;
            expression += operator;
            displayContent.textContent = expression;
            lastInput = operator;
            resultDisplayed = false;

            
            displayContent.scrollLeft = displayContent.scrollWidth;
        }
    };

    const handleBackspace = () => {
        if (expression.length > 0) {
            expression = expression.slice(0, -1);
            displayValue = displayValue.slice(0, -1);
            displayContent.textContent = expression;
            lastInput = expression.slice(-1);

            
            displayContent.scrollLeft = displayContent.scrollWidth;
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
            } else if (buttons[i].id === 'backspace') {
                handleBackspace();
            } else if (buttons[i].classList.contains('operator')) {
                performOperation(btnText);
            } else {
                updateDisplay(btnText);
            }
        });
    }
});
