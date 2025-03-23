import React, { useState, useEffect } from 'react';

const Calculator = () => {
    const [input, setInput] = useState('0');
    const [result, setResult] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedValue = localStorage.getItem('calculatorValue');
        if (savedValue) {
            setInput(savedValue);
        }
    }, []);

    useEffect(() => {
        if (result !== null) {
            localStorage.setItem('calculatorValue', result.toString());
        }
    }, [result]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key >= '0' && e.key <= '9') {
                handleNumber(e.key);
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                handleOperator(e.key);
            } else if (e.key === '=' || e.key === 'Enter') {
                handleEquals();
            } else if (e.key === 'Escape') {
                handleClear();
            } else if (e.key === 'Backspace') {
                handleBackspace();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [input, operator, result, waitingForOperand]);

    const handleNumber = (num) => {
        if (waitingForOperand) {
            setInput(num);
            setWaitingForOperand(false);
        } else {
            setInput(input === '0' ? num : input + num);
        }
    };

    const handleOperator = (op) => {
        if (operator && !waitingForOperand) {
            handleEquals();
        }
        setOperator(op);
        setResult(input);
        setWaitingForOperand(true);
    };

    const handleEquals = () => {
        if (!operator || waitingForOperand) return;

        const currentValue = parseFloat(input);
        const previousValue = parseFloat(result);
        let newResult;

        switch (operator) {
            case '+':
                newResult = previousValue + currentValue;
                break;
            case '-':
                newResult = previousValue - currentValue;
                break;
            case '*':
                newResult = previousValue * currentValue;
                break;
            case '/':
                if (currentValue === 0) {
                    setInput('Error: Division by zero');
                    setOperator(null);
                    setResult(null);
                    setWaitingForOperand(true);
                    return;
                }
                newResult = previousValue / currentValue;
                break;
            default:
                return;
        }

        setInput(newResult.toString());
        setOperator(null);
        setResult(newResult);
        setWaitingForOperand(true);
    };
    const handleClear = () => {
        setInput('0');
        setOperator(null);
        setResult(null);
        setWaitingForOperand(false);
    };

    const handleBackspace = () => {
        if (input.length === 1 || input === 'Error: Division by zero') {
            setInput('0');
        } else {
            setInput(input.slice(0, -1));
        }
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`calculator-container ${darkMode ? 'dark' : 'light'}`}>
            <div className="calculator">
                <div className="theme-toggle">
                    <button onClick={toggleTheme}>
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
                <div className="display">
                    <div className="expression">
                        {result && operator ? `${result} ${operator}` : ''}
                    </div>
                    <div className="input">{input}</div>
                </div>
                <div className="keypad">
                    <button className="clear" onClick={handleClear}>C</button>
                    <button className="backspace" onClick={handleBackspace}>⌫</button>
                    <button className="operator" onClick={() => handleOperator('*')}>*</button>
                    <button className="operator" onClick={() => handleOperator('/')}>/</button>

                    <button onClick={() => handleNumber('7')}>7</button>
                    <button onClick={() => handleNumber('8')}>8</button>
                    <button onClick={() => handleNumber('9')}>9</button>
                    <button className="operator" onClick={() => handleOperator('+')}>+</button>

                    <button onClick={() => handleNumber('4')}>4</button>
                    <button onClick={() => handleNumber('5')}>5</button>
                    <button onClick={() => handleNumber('6')}>6</button>
                    <button className="operator" onClick={() => handleOperator('-')}>-</button>

                    <button onClick={() => handleNumber('1')}>1</button>
                    <button onClick={() => handleNumber('2')}>2</button>
                    <button onClick={() => handleNumber('3')}>3</button>

                    <button onClick={() => handleNumber('0')}>0</button>
                    <button onClick={() => handleNumber('.')}>.</button>
                    <button className="equals" onClick={handleEquals}>=</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;