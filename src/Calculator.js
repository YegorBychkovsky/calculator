import React, { useState } from "react";
import { useCalculator } from "./hooks/useCalculator";
import { useHistory } from "./hooks/useHistory";
import { History } from "./components/History";
import { ThemeToggle } from "./components/ThemeToggle";

export const Calculator = () => {
  const [darkMode, setDarkMode] = useState(false);
  const {
    input,
    result,
    operator,
    handleNumber,
    handleOperator,
    handleEquals,
    handleClear,
    handleBackspace,
  } = useCalculator();

  const { history, addHistoryEntry, clearHistory } = useHistory();

  const handleCalculate = () => {
    const calculationResult = handleEquals();
    if (typeof calculationResult === "number" && !isNaN(calculationResult)) {
      addHistoryEntry(`${result} ${operator} ${input}`, calculationResult);
    }
  };

  return (
    <div className={`calculator-container ${darkMode ? "dark" : "light"}`}>
      <div className="calculator">
        <ThemeToggle
          darkMode={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
        />

        <div className="display">
          <div className="expression">
            {result && operator ? `${result} ${operator}` : ""}
          </div>
          <div className="input">{input}</div>
        </div>

        <div className="keypad">
          <button className="clear span-2" onClick={handleClear}>
            C
          </button>
          <button className="backspace" onClick={handleBackspace}>
            ⌫
          </button>
          <button className="operator" onClick={() => handleOperator("/")}>
            /
          </button>
          <button className="operator" onClick={() => handleOperator("*")}>
            ×
          </button>

          <button onClick={() => handleNumber("7")}>7</button>
          <button onClick={() => handleNumber("8")}>8</button>
          <button onClick={() => handleNumber("9")}>9</button>
          <button className="operator" onClick={() => handleOperator("-")}>
            -
          </button>

          <button onClick={() => handleNumber("4")}>4</button>
          <button onClick={() => handleNumber("5")}>5</button>
          <button onClick={() => handleNumber("6")}>6</button>
          <button className="operator" onClick={() => handleOperator("+")}>
            +
          </button>

          <button onClick={() => handleNumber("1")}>1</button>
          <button onClick={() => handleNumber("2")}>2</button>
          <button onClick={() => handleNumber("3")}>3</button>

          <button className="equals span-2" onClick={handleCalculate}>
            =
          </button>

          <button className="span-2" onClick={() => handleNumber("0")}>
            0
          </button>
          <button onClick={() => handleNumber(".")}>.</button>
        </div>

        <History history={history} onClear={clearHistory} />
      </div>
    </div>
  );
};
