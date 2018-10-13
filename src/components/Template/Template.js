import React from "react";
import "./style.scss";

const Template = ({ dateInfo, form, children, onClickSorting }) => {
  return (
    <div class="Template-Layout">
      <div class="Date-Info-Layout">{dateInfo}</div>
      <div class="Form-Layout">{form}</div>
      {children}
      <div onClick={onClickSorting}>sorting</div>
    </div>
  );
};

export default Template;
