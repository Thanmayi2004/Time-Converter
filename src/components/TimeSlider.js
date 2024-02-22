import React from "react";

const TimezoneSlider = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="range"
        min={-12}
        max={12}
        step={0.5}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <span>{value}</span>
    </div>
  );
};

export default TimezoneSlider;
