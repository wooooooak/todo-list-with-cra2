import React from "react";
import "./style.scss";

const Template = ({ dateInfo, form, children }) => {
  return (
    <div class="Template-Layout">
      <div class="Date-Info-Layout">{dateInfo}</div>
    </div>
  );
};

export default Template;
