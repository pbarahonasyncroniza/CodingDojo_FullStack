import React from "react";
import { useState } from "react";


const MassasgeForm = (props) => {
    const [msg, setMsg] = useState ("");

    const handleOnSubmit= (e) => {
        e.preventDefault()
        props.NewMassage(msg)
    }

return(
    <div>
        <h1>Set Massage</h1>
        <form onSubmit={handleOnSubmit}>
            <div>
                <textarea
                id ="msg" 
                name ="msg"
                row="4"
                cols ="50"
                onChange ={(e)=> setMsg(e.target.value)}></textarea>
            </div>
                <input type ="submit" value ="Submit"/>
            
        </form>
    </div>
)
};

export default MassasgeForm;