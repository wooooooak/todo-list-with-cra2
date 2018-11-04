import React from "react";
import { FaQuestionCircle, FaTimes } from "react-icons/fa";
import "./style.scss";

const Template = ({ dateInfo, form, children, onClickSorting }) => {
  return (
    <div class="Template-Layout">
      <div class="Logo" />
      <div class="Date-Info-Layout">{dateInfo}</div>
      <div class="Form-Layout">{form}</div>
      <div class="Sorting" onClick={onClickSorting}>
        마감순 정렬
      </div>
      {children}
      <div class="help">
        <div class="help-container">글을 등록한 후에 제목을 클릭하시면 마감시간을 설정할 수 있습니다.</div>
        <FaQuestionCircle class="question-mark" />
      </div>
    </div>
  );
};

export default Template;
