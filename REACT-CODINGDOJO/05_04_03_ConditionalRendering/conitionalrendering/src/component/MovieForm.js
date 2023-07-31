import React from "react";
import { useState } from "react";

const MovieForm = () => {
   
const [title, setTitle] = useState("");
const [titleError, SetTitleError] = useState ("");
const [movieTitleCreated, setMovieTitleCreated] = useState (false);

const handleOnChangeMovieTitle =(e) =>{
    setTitle(e.target.value);
    if(e.target.value.length < 1){
        SetTitleError ( "Title is required");
    }else if (e.target.value.length < 3){
        SetTitleError ( "Title must be 3 caracter or longer!");       
    }else {
        SetTitleError ("")
    }
    setMovieTitleCreated(false);
}



const handleOnSubmitMovieForm = (e) => {
    e.preventDefault ()
    setMovieTitleCreated(false);
}

return (
    <div className="w-50 mt-4 mx-auto">
      <h1>Movie Form</h1>
      <form onSubmit={handleOnSubmitMovieForm} className="mb-3">
        <div className="mb-3">
          <label htmlFor="titleInput" className="form-label">TITLE</label>
          <input
            type="text"
            className={`form-control ${titleError ? "is-invalid" : ""} `}
            id="titleInput"
            value={title}
            onChange={handleOnChangeMovieTitle}
          />
          {titleError && <div className="invalid-feedback">{titleError}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Create Movie</button>
      </form>
      {movieTitleCreated && (<p className="alert alert-success">{title} was created</p>)}
</div>

)

}
export default MovieForm; 