import React, { useState } from "react";
import ToDoListItem from "./TodoListItem.jsx";
import "./ToDoList.css";

const ToDoList = () => {
  const [task, setTasks] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const addTodo = () => {
    if (newTodo.trim()) {
      const newItem = { id: Date.now(), text: newTodo, completed: false };
      setTasks([...task, newItem]);
      setNewTodo("");
    }
  };
  const deleteTodo = (id) => {
    setTasks(task.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      task.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const updateTodo = (id, newText) => {
    setTasks(
      task.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
  };
  return (
    <div className="list-style">
      <input
        type="text"
        value={newTodo}
        placeholder="Add a new task"
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {task.map((task) => (
          <ToDoListItem
            key={task.id}
            item={task}
            updateTodo={updateTodo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};
export default ToDoList;
