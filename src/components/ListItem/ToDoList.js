import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDoListItem from "./TodoListItem.jsx";
import "./ToDoList.css";

const ToDoList = () => {
  const [task, setTasks] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/todos");
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await axios.post("http://localhost:5500/api/todos", {
          text: newTodo,
        });
        setTasks([...task, response.data]);
        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo", error);
      }
    }
  };
  const deleteTodo = async (_id) => {
    try {
      await axios.delete(`http://localhost:5500/api/todos/${_id}`);
      setTasks(task.filter((item) => item._id !== _id));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const toggleComplete = (_id) => {
    const todoToToggle = task.find((task) => task._id === _id);
    try {
      const response = axios.patch(`http://localhost:5500/api/todos/${_id}`, {
        completed: !todoToToggle.completed,
      });
      setTasks(task.map((task) => (task._id === _id ? response.data : task)));
    } catch (error) {
      console.error("Error toggling todo", error);
    }
  };
  const updateTodo = (_id, newText) => {
    try {
      const response = axios.patch(`http://localhost:5500/api/todos/${_id}`, {
        text: newText,
      });
      setTasks(task.map((item) => (item._id === _id ? response.data : item)));
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };
  if (!task || task.length === 0) {
    return <p>No todos available.</p>;
  }
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
        {todos.map((todo) => {
          if (!todo || !todo._id) return null;
          return (
            <ToDoListItem
              key={todo._id}
              item={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default ToDoList;
