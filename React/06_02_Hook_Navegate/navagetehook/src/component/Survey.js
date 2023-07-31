import React from "react";
import {useNavigate} from "react-router-dom";

const Survey = (props) => {

const {name,setName, comment, setComment, surveyResult, setSurveyResult}= props;
const navigate = useNavigate();

const handlerOnChangeName = (e) => {
    setName(e.target.value)
};

const handlerOnChangeComment = (e) => {
        setComment(e.target.value);
};

const handleOnSubmitSurvey = (e) => {
    e.preventDefault();
    setSurveyResult({name,comment});
    console.log("Survey Submited");
    navigate ("/results");

}

    return(
        <div className="container mt-4 w-50">
            <form onSubmit={handleOnSubmitSurvey}> 
                <div className="mb-3">
                    <label htmlFor="nameImput">Your Name</label>
                    <input 
                    type="text" 
                    id="nameImput"
                    className="form-control"
                    onChange={handlerOnChangeName} 
                    value={name}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="commentInput" className="form-label">Your Comment</label>
                    <textarea  
                        className = "form-control"
                        id="commentInput"
                        onChange={handlerOnChangeComment} 
                        value={comment}>Comment here
                    </textarea>  
                </div>
                <div>
                    <button  
                        className="btn btn-primary "type="submit">Submit Survey</button>
                </div>

            </form>
        </div>

    );
};

export default Survey;