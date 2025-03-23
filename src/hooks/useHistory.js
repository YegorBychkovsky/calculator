import { useState, useEffect } from "react";

export const useHistory = (onNewResult) => {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("calculatorHistory")) || [];
    } catch (error) {
      console.error("Error loading history:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("calculatorHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving history:", error);
    }
  }, [history]);

  const addHistoryEntry = (expression, result) => {
    const newEntry = {
      expression,
      result,
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [newEntry, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    if (window.confirm("Clear all operations history?")) {
      setHistory([]);
    }
  };

  return {
    history,
    addHistoryEntry,
    clearHistory,
  };
};
