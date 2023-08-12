import React from "react"
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


    const DetailPirate = (props) => {
    const [pirate, setPirate] = useState(null);
    const [loading, setLoading] =useState(true);
    const [error, setError] =useState(null);
            
    
        // HOOKS & VARIABLES
        //-------------------------------------------------------------------------------
           // state Hook
           const navigate = useNavigate();
           // Param Hook
           const {pirateId} = useParams();

         

        // CALL API
        //-------------------------------------------------------------------------------
           
        useEffect(() => {
                console.log(pirate)

            const fetchPirate =  () => {
                try {
                     axios.get(`http://localhost:8000/pirates/${pirateId}`).then((response)=>{
                        setPirate(response.data.data[0]);
                        console.log(response.data.data)
                        setLoading(false);
                    })
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            };
        
            fetchPirate();
        }, []);




        // HANDLERS
        //-------------------------------------------------------------------------------
            
        const handlerCruewBoard = (e) => {
            navigate("/");

        }





        // JSX
        //-------------------------------------------------------------------------------
        return (

            <div  className="  ms-3 me-3 w-75   "style={{backgroundColor:"#ff9900"}}>  
                <div  style={{backgroundColor:"#3d271A"}}>
                            <h1 className =" d-flex justify-content-center pt-4 text-white p-3 ms-0 me-0" style={{backgroundColor:"#3d271A"}}>{pirate?.name}</h1>
                            <button className="btn btn-success mb-2" onClick={handlerCruewBoard}>Back to Crew Board</button>
                </div>
                    <div className="ms-3 me-3 "style={{ display: 'flex', alignItems: 'stretch' ,backgroundColor:"#ff9900" }}>
                        {/* izquierda */}
                            <div className="">
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={pirate?.photo}  style= {{ maxWidth: "50%"}} className="mt-5"/>
                                <h1>{pirate?.quote}</h1>
                            </div>
                    </div>



                    <div  className="bg-white mb-4 mt-2 ms-2 me-2"style={{ flex: 1, padding: '0 20px' }}>
                        <div>
                            <h2 className="fs-1">About</h2>
                        </div>
                        <div>
                            <h1 className="fs-3">Position: {pirate?.position}</h1>
                            <h1 className="fs-3">Treasure: {pirate?.treasure}</h1>
                            <h1 className="fs-3">Peg Leg: {pirate?.pegLeg ? "Yes" : "No"}</h1>
                            <h1 className="fs-3">Eye Patch: {pirate?.eyePatch ? "Yes" : "No"}</h1>
                            <h1 className="fs-3">Hook Hand: {pirate?.hookHand ? "Yes" : "No"}</h1>

                        </div>
                    </div>


                </div>

            </div>    



        )




    }

    export default DetailPirate;