import React from "react";

export const ThemeToggle = ({ darkMode, onToggle }) => {
  return (
    <div className="theme-toggle">
      <button onClick={onToggle}>{darkMode ? "☀️" : "🌙"}</button>
    </div>
  );
};
