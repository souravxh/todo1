import React from "react";
import ToDoListItem from "./TodoListItem.jsx";
import "./ToDoList.css";

const ToDoList = () => {
  const task = [
    { id: 1, task: "Task 1" },
    { id: 2, task: "Task 2" },
    { id: 3, task: "Task 3" },
    { id: 4, task: "Task 4" },
    { id: 5, task: "Task 5" },
    { id: 6, task: "Task 6" },
  ];
  return (
    <ul className="list-style">
      {task.map((item) => (
        <ToDoListItem key={item.id} item={item.task} />
      ))}
    </ul>
  );
};
export default ToDoList;
