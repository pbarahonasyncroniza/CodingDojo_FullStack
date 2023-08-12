import {useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

    const CreateAuthors = () => {

        const [authorCreate, setAuthorCreate] = useState ({
            first_name :"",
            last_name:""
        })

        const navigate = useNavigate()


// 1)  HANDLERS AND AUX FUNCTIONS
//-----------------------------------------------------------------------
        const handleChange = (e) => {
            const {name, value} =e.target
            setAuthorCreate ({...authorCreate, [name]:value})
        };


        const handleGoHome = (e) => {
                navigate("/");

        }
//-------------------------------------------------------------------------
        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                await axios.post("http://localhost:8000/authors",authorCreate)

                    setAuthorCreate ({
                    first_name :"",
                    last_name:""
                    
                    })

            } 
                catch (error){
                    console.error("Error add Author" , error.message)
                    alert("Error, please try again")
                }    
        }


//3) JSX
//-----------------------------------------------------------------------------

        return (
            <div className="container bg-dark-subtle w-25 mt-3">
                <h3>Add an Author</h3>
                <form onSubmit={handleSubmit}> 
                    <div className="" >
                        <div className="row g-2" >
                            <label col-6 htmlFor="first_name" className="bg-dark-subtle mt-3 mb-1 font-weight-bold ">FIRST NAME</label>
                            <input
                                className="form-control ps-2"
                                type ="text"
                                id="first_name"
                                name="first_name"
                                value={authorCreate.first_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="first_name" className=" bg-dark-subtle mt-3 mb-1 font-weight-bold">LAST NAME</label>
                            <input
                                className="form-control ps-2  "
                                type ="text"
                                id="last_name"
                                name="last_name"
                                value={authorCreate.last_name}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            className="btn btn-primary mt-3 mb-3 ms-2 me-2"
                            type ="submit"
                            value ="Submit"
                        />  
                        <button 
                        className="btn btn-info ms-2"
                        onClick={handleGoHome}>Back</button>

                    </div>
                </form>
            </div>
        )

        
    }

    export default CreateAuthors;