import React from "react";

const Buttons = ({ onReverseOrder, onToggleDarkMode, onScheduleMeet }) => {
  return (
    <div>
      <button onClick={onReverseOrder}>Reverse Order</button>
      <button onClick={onToggleDarkMode}>Toggle Dark Mode</button>
      <button onClick={onScheduleMeet}>Schedule Meet</button>
    </div>
  );
};

export default Buttons;
