import { useState } from "react";

const Description = (props) => {
     const {description,setDescription} = props

     const handleSubmit = (e) => {
        e.preventDeFault();
        const newItem 0 {description};



     }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                 type="text"
                 placeholder="task"
                 value={description}
                 onChange ={e => setDescription(e.target.value)}                   
                />
                <button>Add</button>
            </form>
        </div>

   




    )


}

export default Description;