import React, { useState } from "react";
import "./TodoListItem.css";

const ToDoItem = ({ item, toggleComplete, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);

  const handleUpdate = () => {
    updateTodo(item._id, editedText);
    setIsEditing(false);
  };

  return (
    <li
      style={{ textDecoration: item.completed ? "line-through" : "none" }}
      className="list-item-style">
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <span onClick={() => toggleComplete(item._id)}>{item.text}</span>
      )}
      <div>
        {isEditing ? (
          <button onClick={handleUpdate}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={() => deleteTodo(item._id)}>Delete</button>
      </div>
    </li>
  );
};

export default ToDoItem;
