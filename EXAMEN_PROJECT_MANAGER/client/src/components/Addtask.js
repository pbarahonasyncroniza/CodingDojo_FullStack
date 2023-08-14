import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

    const  AddTask = () => {

        //HOOKS & VARIABLE
        //-------------------------------------------------------------------------------
            const navigate = useNavigate();
            const [formErrors, setFormErrors] = useState ({})   
            const [taskCreate, setTaskCreate] = useState ({
             


            task: "",
            due_date :""

          })  

        //HANDLERS
        //-------------------------------------------------------------------------------
        const handleChange = (e) => {
            let new_data = {
                ...taskCreate,
                [e.target.name]: e.target.value
            }
    
            setTaskCreate(new_data);  
        }



        //API CALL
        //-------------------------------------------------------------------------------

            const handleSubmit = async (e) => {
                e.preventDefault();
                console.log(taskCreate)

                try{
                    const response = await axios.post("http://localhost:8000/tasks", taskCreate)
                        console.log (response)


                        navigate("/")

                        setTaskCreate({

                            task: "",
                            due_date :""


                        })


                }
                    catch(error){
                        if(error.response.data.error.errors){
                            console.log(error.response.data)
                            const responseErrors = error.response.data.error.errors
                            setFormErrors(responseErrors)
                            alert ( "Error Please Try Again")

                        }

                    }

            }





        //JSX
        //-------------------------------------------------------------------------------

           

            return(
                <div className="container ms-3 pb-3 border border-dark">
                    <h2 className="">Project Manager</h2>
            
                    <div className="">
                        <Link to="/" className="me-2 mb-3 mt-3">Back to DashBoard</Link>
                    </div>
            
                    <div className="bg-body-secundary ms-5 me-5 border border-dark "> 
                        <form onSubmit={handleSubmit}>
                            <div style={{ width: '80%', margin: '0 auto' }}> {/* Contenedor adicional con estilos */}
                                <h6 className="text-start">Plan a New Project</h6>
                                <div>  
                                    <div className="d-flex align-items-center">
                                        <label htmlFor="task" className="me-2">Project</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="task"
                                            value={taskCreate.task}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-text text-danger fw-bold">{formErrors["task"]?.message}</div>
                                </div>
            
                                <div>
                                    <div className="d-flex align-items-center">
                                        <label htmlFor="due_date" className="me-2">Due_Date</label>
                                        <input
                                            className="form-control"
                                            type="date"
                                            name="due_date"
                                            value={taskCreate.due_date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-text text-danger fw-bold">{formErrors["due_date"]?.message}</div>
                                </div>
            
                                <input
                                    className="btn btn-success mt-3 mb-3 ms-0 me-2 w-100"
                                    type ="submit" 
                                    value ="Project Plan"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )
            










    }

    export default AddTask;