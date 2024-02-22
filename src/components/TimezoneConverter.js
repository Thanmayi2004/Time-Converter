import React, { useState, useEffect } from "react";
import TimezoneSlider from "./TimeSlider";
import TimezoneList from "./TimeZoneList";
import DatePicker from "./DatePicker";
import Buttons from "./Buttons";
import { DateTime } from "luxon";
import { format } from "date-fns";

const initialTimezones = [
  { name: "UTC", offset: 0 },
  { name: "IST", offset: 5.5 }, // Indian Standard Time
  { name: "EST", offset: -5 }, // Eastern Standard Time
  { name: "PST", offset: -8 }, // Pacific Standard Time
  { name: "CST", offset: -6 }, // Central Standard Time
  { name: "AEST", offset: 10 }, // Australian Eastern Standard Time
  { name: "JST", offset: 9 }, // Japan Standard Time
  { name: "CET", offset: 1 }, // Central European Time
  { name: "GMT", offset: 0 }, // Greenwich Mean Time
];

const TimezoneConverter = () => {
  const [timezones, setTimezones] = useState(initialTimezones);
  const [selectedDate, setSelectedDate] = useState(DateTime.now());
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");

  useEffect(() => {
    const updateDateForSelectedTimezone = () => {
      try {
        const zonedDate = selectedDate.setZone(selectedTimezone, {
          keepLocalTime: true,
        });
        const formattedDate = format(zonedDate.toJSDate(), "MM/dd/yyyy");
        setTimezones((prevTimezones) => {
          return prevTimezones.map((tz) =>
            tz.name === selectedTimezone ? { ...tz, date: formattedDate } : tz
          );
        });
      } catch (error) {
        console.error(
          "Error updating date for timezone:",
          selectedTimezone,
          error
        );
        setTimezones((prevTimezones) =>
          prevTimezones.map((tz) =>
            tz.name === selectedTimezone ? { ...tz, date: "Invalid Date" } : tz
          )
        );
      }
    };
    updateDateForSelectedTimezone();
  }, [selectedDate, selectedTimezone]);

  const handleDateChange = (e) => {
    const newDate = DateTime.fromISO(e.target.value);
    setSelectedDate(newDate);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    const rootElement = document.documentElement;
    darkMode
      ? rootElement.classList.remove("dark-theme")
      : rootElement.classList.add("dark-theme");
  };

  const reverseOrder = () => {
    setTimezones((prevTimezones) => [...prevTimezones].reverse());
  };

  const scheduleMeet = () => {
    // Implement logic to schedule Google Meet
  };

  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone);
  };

  return (
    <div className={`timezone-converter ${darkMode ? "dark-mode" : ""}`}>
      <TimezoneSlider />
      <TimezoneList timezones={timezones} />
      {/* <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} /> */}
      <Buttons
        onReverseOrder={reverseOrder}
        onToggleDarkMode={toggleDarkMode}
        onScheduleMeet={scheduleMeet}
      />
      <input
        type="date"
        value={selectedDate.toISODate()}
        onChange={handleDateChange}
      />

      <select
        value={selectedTimezone}
        onChange={(e) => handleTimezoneChange(e.target.value)}
      >
        {timezones.map((tz) => (
          <option key={tz.name} value={tz.name}>
            {tz.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimezoneConverter;
