import React from "react";



const MassageDisplay = (props) => {

return(

    <div>
        <h1>Current Massage</h1>
        <pre>{props.message}</pre>
    </div>
)
};

export default MassageDisplay;