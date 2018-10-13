import React from "react";
import "./style.scss";

import TodoItem from "../TodoItem";

const mapItemsToTodoItem = (items, onDelete, onClickDone, onChangeDeadeLine) => {
  return items.map((item, index) => {
    return (
      <TodoItem
        key={index}
        _id={item._id}
        title={item.title}
        check={item.check}
        deadLine={item.deadLine}
        onDelete={onDelete}
        onClickDone={onClickDone}
        onChangeDeadeLine={onChangeDeadeLine}
      />
    );
  });
};

const TodoList = ({ items, onDelete, onClickDone, onChangeDeadeLine }) => {
  return (
    <div class="TodoList-Wrapper">{mapItemsToTodoItem(items, onDelete, onClickDone, onChangeDeadeLine)}</div>
  );
};

export default TodoList;
