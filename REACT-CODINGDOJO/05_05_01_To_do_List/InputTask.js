import React from "react";
import {useState} from "react";


const InputTask = (props) => {

const [taskName, setTaskName] = useState ("");

const handleOnSubmit = (e) => {
    e.preventDefault ()
    if (taskName.trim()!==""){
    props.newTask(taskName)
    setTaskName("")
    }
}


return(
    <div>
        <form onSubmit={handleOnSubmit}>
            <div>
                <label htmlFor="taskName">Task Name</label>
                <input
                type = "text"
                onChange={(e) => setTaskName(e.target.value)}
                value={taskName}
                />
            </div>
            <input type="submit" value = " ADD"   />
        </form>
    </div>
)
};

export default InputTask;