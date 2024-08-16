import React from "react";
import "./TodoListItem.css";

const ToDoListItem = ({ item, toggleComplete, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState(item.text);

  const handleUpdate = () => {
    updateTodo(item.id, editedText);
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
        <span onClick={() => toggleComplete(item.id)}>{item.text}</span>
      )}
      <div>
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={() => deleteTodo(item.id)}>Delete</button>
      </div>
    </li>
  );
};

export default ToDoListItem;
