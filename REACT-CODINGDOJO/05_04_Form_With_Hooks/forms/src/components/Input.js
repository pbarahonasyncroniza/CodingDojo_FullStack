import React from "react";

const Input = (props) => {

const {filter, setFilter} = props; 

const handleOnChange = (e) => {
    setFilter (e.target.value)
};

    return (
        <div>
            <input value ={filter} onChange={handleOnChange}/>
        </div>
    )
}

