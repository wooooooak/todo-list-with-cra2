import React from "react";
import "./style.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

var DaysEnum = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY"
};

const colorHoliday = (day) => {
  if (day === 0 || day === 6) {
    return "#F16B6F";
  } else {
    return "#011627";
  }
};

const DateInfo = ({ date, onChangeDate }) => {
  return (
    <div class="info">
      <FaAngleLeft class="DateInfo-icon" onClick={() => onChangeDate(-1)} />
      <div class="DateInfo-Date-Layout">
        <div class="DateInfo-Date" style={{ color: colorHoliday(date.getDay()) }}>
          {date.getDate()}
        </div>
        <div>
          <div>{date.getMonth() + 1}</div>
          <div>{date.getFullYear()}</div>
        </div>
      </div>
      <div class="DateInfo-Day" style={{ color: colorHoliday(date.getDay()) }}>
        {DaysEnum[date.getDay()]}
      </div>
      <FaAngleRight class="DateInfo-icon" onClick={() => onChangeDate(1)} />
    </div>
  );
};

export default DateInfo;
