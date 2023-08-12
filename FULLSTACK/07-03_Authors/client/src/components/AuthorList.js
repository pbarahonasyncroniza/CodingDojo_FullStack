
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

    const AuthorList = () => {
    //1 HOOK 
    //------------------------------------------------------------------------------------
    
        const [authors, setAuthors] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        const navigate = useNavigate();


    //2 HANDLERS
    //------------------------------------------------------------------------------------
        const handleDeleteAuthor= async(authorId)=>{
            // confirmacion al usuario de borrar 
            const ConfirmDelete = window.confirm(" are you sure?")
            if(!ConfirmDelete) return;

            try {
                await axios.delete(`http://localhost:8000/authors/${authorId}`)
                //una vez eleiminado se debe actualizar el estado para reflejar el cambio
                const updatedAuthors = authors.filter(author => author._id !== authorId);
                setAuthors(updatedAuthors);
            }
                catch(err){
                    console.error("Error you can't delete Author", err.message)
                }

        }


        const handlerEditAuthor =(authorId)=> {
            navigate(`/edit/${authorId}`)
        }
    //-----------------------------------------------------------------------------------



    // API CLASS
    //-------------------------------------------------------------------------------    
    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get("http://localhost:8000/authors");
                if(response.data&&Array.isArray(response.data.data)) {
                   
                   // Orden alfabetico de la lista 
                    const sortedAuthors = [...response.data.data].sort((a,b)=>{
                       const comparisonLast = a.last_name.localeCompare(b.last_name);
                        if(comparisonLast  !==0){
                            return comparisonLast
                        }
                        return a.first_name.localeCompare(b.first_name);
                    })

                    setAuthors(sortedAuthors)
                    setError(null)
                }
              
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAuthors();
    }, []);

    //3 AUX FUNCTIONS
    //--------------------------------------------------------------------------------------------------

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;




        //4  JSX
        //---------------------------------------------------------------------------------------------------
    return (
        <div className="container mt-4 mb-4 pb-4 w-50 bg-dark-subtle"   >

            <h2 className="mt-3">List of Authors</h2>
            {/*----------------------------------------------------------------------------------------------  */}

            <Link to="/new" className="row mb-3" >
                <button className="btn btn-info fs-6 text-center w-25 mt-2 ms-2">Add New Author here</button>
            </Link>

            <h2 className="fs-6 mb-3 ms-3 text-start" >We have quotes by</h2>
            {/* -----------------------------Headers -------------------------------------------------------- */}
            <ul className="list-group mt-3">
                <li className="list-group-item d-flex justify-content-betwen align-items-center bg-light">
                    <span className="fs-5 me-auto font-weight-bolt">AUTHOR NAME</span>
                    <span className="fs-5 font-weight-bold me-4">ACTIONS</span>
                </li>
            {/* ------------------------------List Authors---------------------------------------------------- */}

                {authors.map((author) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={author._id}>
                        
                        {/*name - lastname  */}
                        <span className="fs-6 me-auto">
                            {author.first_name} <strong >{author.last_name}</strong>
                        </span>
            {/*-------------------------------------------------------edit button-----------------------------  */}
                    <div className="d-flex align-items-center">
                            <button className="btn btn-info sm-2" onClick={()=>handlerEditAuthor(author._id)}>Edit</button>
                 
            {/*---------------------- --------------------------------delete Button--------------------------- */}
                 
                        <button className="btn btn-danger ms-2" onClick={()=>handleDeleteAuthor(author._id)}
                        >Delete</button>
                    </div>    
                         
                   </li>
                ))}
            </ul>
        </div>
    );
}

export default AuthorList;
