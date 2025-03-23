import { useState, useEffect } from "react";

export const useCalculator = () => {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  useEffect(() => {
    const savedValue = localStorage.getItem("calculatorValue");
    if (savedValue) setInput(savedValue);
  }, []);

  useEffect(() => {
    if (result !== null) {
      localStorage.setItem("calculatorValue", result.toString());
    }
  }, [result]);

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setInput(num);
      setWaitingForOperand(false);
    } else {
      setInput(input === "0" ? num : input + num);
    }
  };

  const handleOperator = (op) => {
    if (operator && !waitingForOperand) handleEquals();
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
      case "+":
        newResult = previousValue + currentValue;
        break;
      case "-":
        newResult = previousValue - currentValue;
        break;
      case "*":
        newResult = previousValue * currentValue;
        break;
      case "/":
        if (currentValue === 0) {
          setInput("Error: Division by zero");
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
    return newResult;
  };

  const handleClear = () => {
    setInput("0");
    setOperator(null);
    setResult(null);
    setWaitingForOperand(false);
    localStorage.setItem("calculatorValue", "0");
  };

  const handleBackspace = () => {
    if (input.length === 1 || input === "Error: Division by zero") {
      setInput("0");
    } else {
      setInput(input.slice(0, -1));
    }
  };

  return {
    input,
    result,
    operator,
    handleNumber,
    handleOperator,
    handleEquals,
    handleClear,
    handleBackspace,
  };
};
