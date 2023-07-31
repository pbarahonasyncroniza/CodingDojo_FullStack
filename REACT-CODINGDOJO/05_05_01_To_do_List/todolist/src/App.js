import React, { useState } from "react";
import "./App.css";
import InputTask from "./components/InputTask";
import TaskList from "./components/TaskList";

const App = () => {
  const [currentTasks, setCurrentTasks] = useState([]);
  
  const addNewTask = (newTask) => {
    setCurrentTasks([...currentTasks, { task: newTask, completed: false }]);
    
  };

  const deleteTask = (index) => {
    const updatedTasks = currentTasks.filter((_, idx) => idx !== index);
    setCurrentTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...currentTasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setCurrentTasks(updatedTasks);
  };

  return (
    <div className="App">
      <InputTask newTask={addNewTask} />
      <TaskList tasks={currentTasks} onDelete={deleteTask} onToggle={toggleTaskCompletion}  />
    </div>
  );
}

export default App;
