import React, { useState } from "react";

const TaskList = ({ tasks, onDelete, onToggle }) => {
  const [counter, setCounter] = useState(1);

  const handleToggle = (index) => {
    onToggle(index);
  };

  return (
    <ul>
      {tasks.map((task, index) => {
        const taskNumber = counter + index;
        return (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(index)}
            />
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {taskNumber}. {task.task}
            </span>
            <button onClick={() => onDelete(index)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
