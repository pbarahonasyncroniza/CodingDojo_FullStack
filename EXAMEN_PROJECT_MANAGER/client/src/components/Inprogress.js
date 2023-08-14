import React from "react";
import axios from "axios";

const Inprogress = (props) => {
    const { tasks, setTasks,triggerUpdate  } = props; // Usamos desestructuración aquí para extraer tasks y setTasks de props

    const handlerToCompled = async (taskId) => {
        try {
            console.log("Moving task Id to completed:", taskId);
    
            // 1. Actualizar el estado de la tarea a "completed"
            const updatedTask = { status: "completed" };
            await axios.patch(`http://localhost:8000/tasks/${taskId}`, updatedTask);
          
            // 2. Actualizar el estado global de tareas
            const updatedTasks = tasks.map(task =>
                task._id === taskId ? { ...task, status: "completed" } : task
            );
            setTasks(updatedTasks);
            triggerUpdate();
    
        } catch (err) {
            console.error("Error moving task to completed:", err);
        }
    }

    return (
        <div className="">
            <div className="">
                <h2 className=" bg-warning border border-dark">In Progress</h2>
                <ul className="list-group">
                    {tasks.filter(task => task.status === 'inprogress').map(task => (
                    <li key={task._id} className="list-group-item  mt-1 border-dark">
                        <div style={{ fontWeight: 'bold' }}>{task.task}</div>

                        <div className="d-flex align-items-center">
                            <p className="mb-0 me-5 ms-3">Due:</p>
                            <span style={{ color:"red", fontSize: "15px" }}>{task.due_date}</span>
                        </div>

                       <div> 
                            <button className="btn btn-primary me-2 w-100" 
                            onClick={() => handlerToCompled(task._id)}>Move to Completed</button>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>            
        </div>
    );
}

export default Inprogress;
