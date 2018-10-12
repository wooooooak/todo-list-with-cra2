import React from "react";
import "./style.scss";

const DateInfo = ({ date }) => {
  return (
    <div class="info">
      <div class="DateInfo-Date-Layout">
        <div class="DateInfo-Date">{date.getDate()}</div>
        <div class="DateInfo-Month-Year-Layout">
          <div class="DateInfo-Mont">{date.getMonth() + 1}</div>
          <div class="DateInfo-Year">{date.getFullYear()}</div>
        </div>
      </div>
      <div class="DateInfo-Day">MONDAY</div>
    </div>
  );
};

export default DateInfo;
