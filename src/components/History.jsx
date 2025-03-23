import React from "react";

export const History = ({ history, onClear }) => {
  return (
    <div className="history-section">
      <div className="history-header">
        <h3>Operations History</h3>
        <button onClick={onClear} className="clear-history">
          Clear History
        </button>
      </div>
      <div className="history-list">
        {history.length > 0 ? (
          history.map((entry, index) => (
            <div key={index} className="history-entry">
              <span>{entry.expression} =</span>
              <span>{entry.result}</span>
            </div>
          ))
        ) : (
          <div className="empty-history">No operations history</div>
        )}
      </div>
    </div>
  );
};
