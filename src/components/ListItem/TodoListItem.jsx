import React from "react";
import "./TodoListItem.css";

const ToDoListItem = ({ item }) => {
  return <li className="list-item-style">{item}</li>;
};

export default ToDoListItem;
