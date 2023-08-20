

import React, { useMemo } from "react";
import axios from "axios";

const Completed = React.memo((props) => {
    
    const { tasks, setTasks, triggerUpdate } = props;

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8000/tasks/${taskId}`);
            const updatedTasks = tasks.filter(task => task._id !== taskId);
            setTasks(updatedTasks);
            triggerUpdate()
        } catch (err) {
            console.error("Error deleting task:", err);
        }
        
    };

    // Optimizando la filtración de tareas completadas con useMemo
    const completedTasks = useMemo(() => tasks.filter(task => task.status === 'completed'), [tasks]);

    return (
        <div>
            <h2 className="bg-success  border border-dark">Completed</h2>
            <ul className="list-group">
                {completedTasks.map(task => (
                    <li key={task._id} className="list-group-item mt-1 border-dark">
                        <div style={{ fontWeight: 'bold' }}>{task.task}</div>

                        <div className="d-flex align-items-center">
                            <p className="mb-0 me-5 ms-3">Due:</p>
                            <span style={{ color:"red", fontSize: "15px" }}>{task.due_date}</span>
                        </div>

                        <button className="btn btn-danger me-2 w-100" onClick={() => handleDeleteTask(task._id)}>    Delete    </button>
                    </li>
                ))}
            </ul>
        </div> 
    );
});

export default Completed;
