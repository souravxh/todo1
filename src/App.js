import React from "react";
import Header from "./components/Header/header.jsx";
import Footer from "./components/Footer/footer.jsx";
import ToDoList from "./components/ListItem/ToDoList.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <ToDoList />
      <Footer />
    </div>
  );
}

export default App;
