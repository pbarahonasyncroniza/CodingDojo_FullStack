import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";



const BackLog = (props) => {

// PROPS & VARIABLES
//---------------------------------------------------------------------------------------
    const { tasks, setTasks,triggerUpdate } = props; // Usamos desestructuración aquí para extraer tasks y setTasks de props
   
    
//HANDLERS
//---------------------------------------------------------------------------------------
    const handlerStartProject = async (taskId) => {
        try {
            console.log("updating task Id:", taskId);
            // 1. Actualizar estado de task en el backend
            const updatedTask = { status: "inprogress" };
            console.log("Sending updated task:", updatedTask);
            await axios.patch(`http://localhost:8000/tasks/${taskId}`, updatedTask);

            // 2. actualizar el estado global de tareas
            const updatedTasks = tasks.map(task =>
                task._id === taskId ? { ...task, status: "inprogress" } : task
            );
            setTasks(updatedTasks);
            triggerUpdate();

        } catch (err) {
            console.error("Error updating task status:", err);
        }
    };



//SPECIAL FUNTIONS
//---------------------------------------------------------------------------------------

        
            
//JSX
//-----------------------------------------------------------------------------------------



    return (
       
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className=" ">
        <h2 className="bg-primary-subtle  border border-dark">BackLog</h2>
            <ul className="list-group" style={{ flexGrow: 1 }}>
                {tasks.map(task => (
                    <li key={task._id} className="list-group-item bg-light-subtle mt-1 border-dark">
                        <div style={{ fontWeight: 'bold' }}>{task.task}</div>
                        <div className="d-flex align-items-center">
                            <p className="mb-0 ms-3 me-5">Due:</p>
                            <span style={{ color: "red", fontSize: "15px" }} className="ml-2">{task.due_date}</span>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-warning me-2 w-100" onClick={() => handlerStartProject(task._id)}>Start Project </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <div className="mt-auto">
            <Link to="/new/" className="btn btn-info me-2 mb-3 mt-3 w-100"> + Add New Project</Link>
        </div>
    </div>

        
    );
}

export default BackLog;
