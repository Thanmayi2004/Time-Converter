import React from "react";

const TimezoneList = ({ timezones, onRemove, onReorder }) => {
  return (
    <div>
      {timezones.map((timezone, index) => (
        <div key={index}>
          <span>{timezone.name}</span>
          <button onClick={() => onRemove(timezone)}>Remove</button>
          {index > 0 && (
            <button onClick={() => onReorder(index, index - 1)}>Move Up</button>
          )}
          {index < timezones.length - 1 && (
            <button onClick={() => onReorder(index, index + 1)}>
              Move Down
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimezoneList;
