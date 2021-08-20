import { useCallback } from "react";
import "./day-mask.style.css";

const dayArray = day_mask => {
  const days = [];
  for (var i = 0; i < 7; i++) {
    days.push({ value: day_mask % 2, id: i });
    day_mask >>= 1;
  }
  return days;
};

const DayMask = ({ day_mask }) => {
  const daysArr = useCallback(dayArray, [day_mask]);
  return (
    <div className="mask-container">
      {daysArr(day_mask).map(d => (
        <div
          key={d.id}
          className="day"
          style={{ background: d.value ? "#00B74A" : "#B71C1C " }}
        ></div>
      ))}
    </div>
  );
};

export default DayMask;
