import React from "react"
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


    const EdithAuthor = (props) => {
        
        // 1) HOOKS AND VARIABLES 
        //--------------------------------------------------------------------------------------
        const [author, setAuthor] =useState(null)
        const [loading, setLoading] =useState(true);
        const [error, setError] =useState(null);

        const {authorID} = useParams ()
        const navigate = useNavigate()
        // console.log(authorID)
        //2) CALL API
        //---------------------------------------------------------------------------------------
        
        
            useEffect(() => {
                
                const fetchAuthor =  () => {
                    try {
                         axios.get(`http://localhost:8000/authors/${authorID}`).then((response)=>{
                            setAuthor(response.data.data[0]);
                            console.log(response.data)
                            setLoading(false);
                        })
                    } catch (err) {
                        setError(err.message);
                        setLoading(false);
                    }
                };
            
                fetchAuthor();
            }, []);

        //3) HANDLERS
        //------------------------------------------------------------------------------------------

        const handleUpdate = async (updatedAuthor) => {
            try {
                await axios.patch(`http://localhost:8000/authors/${authorID}`, updatedAuthor);
                // Quizás quieras redirigir al usuario a la lista de autores o mostrar un mensaje de éxito.
            } catch (err) {
                setError(err.message);
            }
        };
            
        const handlerChangeEditAuthor = (e) => {
            setAuthor(prevAuthor => ({ ...prevAuthor, [e.target.name]: e.target.value }));
        }



        const handleGoHome = (e) => {
            navigate("/");

        }
//---------------------------------------------------


        //4) JSX
        //--------------------------------------------------------------------------------------------
        return (

        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {author && (


                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(    
                        author                
                    );
                }}>
                    
                <div className="container bg-dark-subtle mt-3 w-25">    

                    <h3>Update your Favorite Author</h3>

                    <div className="col-6 d-flex align-items-center justify-content-end" >
                        <span>Name</span>
                    </div>   
                    <div> 
                        <input 
                        className="col-6 mt-1"
                        name="first_name" 
                        id="first_name"
                        value={author.first_name}
                        onChange={handlerChangeEditAuthor}
                        />
                    </div>

                    <div className="col-6 d-flex align-items-center justify-content-end">
                        <span>LastName</span>
                    </div>    
                    <div>
                        <input name="last_name" 
                        className="col-6 mt-1"
                        id="last_name"
                        onChange={handlerChangeEditAuthor}
                        value={author.last_name}
                        />
                    </div>



                    <div> 
                        <button type="submit" className="btn btn-danger mt-3 mb-3">Update</button>

                        <button 
                        className="btn btn-info mb-3 mt-3 ms-2"
                        onClick={handleGoHome}>Back</button>
                    </div>
                </div> 
                </form>
            )}
        </div> 
        )



}

export default EdithAuthor;