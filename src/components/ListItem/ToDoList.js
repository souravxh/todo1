import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDoItem from "./TodoListItem.jsx";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/todos");
      console.log(response.data); // Log the data to debug
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await axios.post("http://localhost:5500/api/todos", {
          text: newTodo,
        });
        setTodos([...todos, response.data]);
        setNewTodo("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateTodo = async (_id, newText) => {
    try {
      const response = await axios.patch(
        `http://localhost:5500/api/todos/${_id}`,
        {
          text: newText,
        }
      );
      setTodos(todos.map((todo) => (todo._id === _id ? response.data : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (_id) => {
    try {
      await axios.delete(`http://localhost:5500/api/todos/${_id}`);
      setTodos(todos.filter((todo) => todo._id !== _id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (_id) => {
    const todoToToggle = todos.find((todo) => todo._id === _id);
    try {
      const response = await axios.patch(
        `http://localhost:5500/api/todos/${_id}`,
        {
          completed: !todoToToggle.completed,
        }
      );
      setTodos(todos.map((todo) => (todo._id === _id ? response.data : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  if (!todos || todos.length === 0) {
    return <p>No todos available.</p>;
  }

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => {
          if (!todo || !todo._id) return null; // Safeguard against undefined todo
          return (
            <ToDoItem
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
