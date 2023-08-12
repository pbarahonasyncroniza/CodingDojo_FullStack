import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Error } from "mongoose";


    const AddPirates = () => {
        const [formErrors, setFormErrors] = useState ({})            
        const [piratesCreate, setPiratesCreate] = useState ({

            name:"",
            quote: "",
            position:"",
            photo: "",
            treasure:"",
            peg_leg: false,
            eye_patch: false,
            hook_hand: false

        })

        const navigate = useNavigate();
        // HANDLERS 
        //---------------------------------------------------------------------------------------------------
            const handleChange = (e) =>{
                    const {name,value, checked, type} = e.target
                    const finalValue = type ==="checkbox" ? checked : value;
                    setPiratesCreate({...piratesCreate,[name]:finalValue})
            }


            const handlerCruewBoard = (e) => {
                navigate("/");
    
            }

        // API CALL
        //---------------------------------------------------------------------------------------------------
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(piratesCreate)
        
            try{
                const response =await axios.post("http://localhost:8000/pirates/", piratesCreate)
                    console.log(response)
             

                    setPiratesCreate ({

                        name:"",
                        quote: "",
                        position:"",
                        photo: "",
                        treasure: 0,
                        peg_leg: false,
                        eye_patch: false,
                        hook_hand:false

                    })
                    console.log(response)
            }
                catch (error){
                    console.log(error)
                    if(error.response.data.error.errors){
                      console.log(error.response.data)
                        const responseErrors = error.response.data.error.errors;
                        setFormErrors(responseErrors)
                        alert ("Error please try again")
                    }  else{
                        console.error("Request failed" , error.message);
                        alert("Request failed, Please try again")
                    }
                }     
        }

        //JSX
        //---------------------------------------------------------------------------------------------------

        return (

            <div className="w-75">

                <div className=" text-white ms-3 me-3 "style={{backgroundColor:"#3d271A"}}>
                    <h2 className="d-flex justify-content-center "style={{backgroundColor:"#3d271A"}}> Add Pirate Crew</h2>
                    <button className="btn btn-success mb-3" onClick={handlerCruewBoard}>Back to Crew Board</button>
                 </div>
                <form onSubmit={handleSubmit}>   
                    <div className="row ms-3 me-3">
                        {/* columna Izquierda */}
                        <div className="col-md-6 d-flex flex-column align-items-center" style={{backgroundColor:"#ff9900"}}>
                            <div className="mb-2">
                                <label htmlFor="name" className="form-label">Pirate Name</label>
                                    <input
                                        className="form-control  "
                                        type="text"
                                        id ="name"
                                        name="name"
                                        value={piratesCreate.name}
                                        onChange={handleChange}
                                        />
                                     <div className="form-text text-danger fw-bold">{formErrors["name"]?.message}</div>
                            </div>
                             
                            <div className="mb-3">
                                <label htmlFor="photo">Image URL</label>
                                    <input
                                        className="form-control "
                                        type="text"
                                        id ="photo"
                                        name="photo"
                                        value={piratesCreate.photo}
                                        onChange={handleChange}
                                    />
                                    <div className="form-text text-danger fw-bold">{formErrors["photo"]?.message}</div>
                             </div>

                             <div className="mb-3">
                                <label htmlFor="treasure"># of treasure</label>
                                    <input
                                        className="form-control  "
                                        type="number"
                                        id ="treasure"
                                        name="treasure"
                                        value={piratesCreate.treasure}
                                        onChange={handleChange}
                                    />
                                    <div className="form-text text-danger fw-bold">{formErrors["treasure"]?.message}</div>
                            </div>
                           
                            <div className="mb-3">
                                <label htmlFor="quote">Pirate Catch Phase</label>
                                    <input
                                        className="form-control "
                                        type="text"
                                        id ="quote"
                                        name="quote"
                                        value={piratesCreate.quote}
                                        onChange={handleChange}
                                    />
                            <div className="form-text text-danger fw-bold">{formErrors["quote"]?.message}</div>
                            </div>
                        
                        </div>    
                         {/*columna Derecha  */}
                         <div className="col-md-6"style={{backgroundColor:"#ff9900"}}>
                            <div className="mb-3">
                                <label htmlFor="position">Crew Position</label>
                                    <select
                                        className="form-select"
                                        id ="position"
                                        name="position"
                                        value={piratesCreate.position}
                                        onChange={handleChange}
                                    >
                                        <option value=""></option>
                                        <option value="Captain">Captain</option>
                                        <option value="First Mate">First Mate</option>
                                        <option value="Boatswain">First Mate</option>
                                        <option value="Navigator">Navigator</option>
                                        <option value="Cabin Boy">Cabin Boy</option>
                                    </select>
                                    <div className="form-text text-danger fw-bold">{formErrors["position"]?.message}</div>
                                </div>
                           
                                <div className="form-check mb-3">
                                    <label htmlFor="peg_leg">Peg Leg</label>
                                        <input
                                            className=""
                                            type="checkbox"
                                            id ="peg_leg"
                                            name="peg_leg"
                                            value={piratesCreate.peg_leg}
                                            onChange={handleChange}
                                        />
                                      
                                </div>
                            
                                <div className="form-check mb-3">
                                    <label htmlFor="eye_patch">Eye Patch</label>
                                    <input
                                        className=""
                                        type="checkbox"
                                        id ="eye_patch"
                                        name="eye_patch"
                                        value={piratesCreate.eye_patch}
                                        onChange={handleChange}
                                    />
                                </div>
                            
                                <div className="form-check mb-3">
        <                           label htmlFor="kook_hand">Hook Hand</label>
                                    <input
                                        className=""
                                        type="checkbox"
                                        id ="hook_hand"
                                        name="hook_hand"
                                        value={piratesCreate.hook_hand}
                                        onChange={handleChange}
                                    />
                                </div>
                                    <input
                                    className="btn btn-success mt-3 mb-3 ms-2 me-2"
                                    type ="submit"
                                    value ="Add Pirate"
                                />

                        </div>   


                    </div>

                </form>


            </div>

            )

        
     }
     export default AddPirates;