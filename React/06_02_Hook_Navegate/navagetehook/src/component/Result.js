import React from "react";
import { useNavigate } from "react-router-dom";

const Result = (props) => {

    const { surveyResult } = props;
    const navigate = useNavigate();

    const handleOnClickGoBack = (e) => {
        navigate("/")

    };

return(
    <div>
        <h1>Results</h1>
        {/* <p>Name: { surveyResult.name }</p> */}
        {/* <p>Coment: { surveyResult.comment }</p> */}
        <button className="btn btn-primary" onClick={handleOnClickGoBack}>Go Back Mather Fucker</button>
    </div>

        )
}

export default Result; 
