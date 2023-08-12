import React, {useState, useEffect} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"



    const PirateCrew =() => {
    
    //1) HOOKS & VARIABLES 
    //-----------------------------------------------------------------------

        const [pirates, setPirates] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState (true)

        const navigate = useNavigate();

    // 2) HANDLERS
    //-----------------------------------------------------------------------
    
        const handlerDeletePirate = async(pirateId)=>{
            // confirmacion al usuario de borrar 
            const ConfirmDelete = window.confirm(" are you sure?")
            if(!ConfirmDelete) return;

            try {
                await axios.delete(`http://localhost:8000/pirates/${pirateId}`)
                //una vez eleiminado se debe actualizar el estado para reflejar el cambio
                const updatedPirates = pirates.filter(pirates => pirates._id !== pirateId);
                setPirates(updatedPirates);
            }
                catch(err){
                    console.error("Error you can't delete this Pirate", err.message)
                }

        }

        const handlerViewPirate = (pirateId) => {
            navigate(`/edit/${pirateId}` )
        }


        const handleAddPirate = (e) => {
            navigate("/new");
        }

    //3 CALL API
    //-----------------------------------------------------------------------

        useEffect(()=>{
            const fetchPirates = async () => {
                try{
                    const response = await axios.get("http://localhost:8000/pirates");
                    console.log(response)
                    if(response.data && Array.isArray(response.data.data)) {  
                        setPirates(response.data.data) 
                    }
                }
                 catch(err){
                    setError(err.message)
                 }finally{
                    setLoading(false)
                 }   
            }
            fetchPirates();
        },[])

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
    // JSX

    //-----------------------------------------------------------------------
        return(

            <div>
                <div className="container mt-1 w-75"style={{backgroundColor:"#ff9900"}}  >
                    
                    <div className=" text-white  "style={{backgroundColor:"#3d271A"}}>
                        <h2 className="d-flex justify-content-center pt-4 fs-1">Pirate Crew</h2>
                        <button className="btn btn-success mb-3 " onClick={handleAddPirate}>Add Pirate Here!!</button>
                    </div>

                        <div className="container  p-0 rounded "style={{backgroundColor:"#ff9900"}} >
                            <ul className="list-group">
                                {pirates.map((pirate)=>(
                                    <li key={pirate._id} className="list-group-item" style={{backgroundColor:"#ff9900"}}>
                                       <div className="d-flex flex-column">
                                            <div className="row">
                                                <div className="col-12">
                                                <img src={pirate.photo} style={{ width: "100px", height: "100px" }} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                <div className="mb-2 font-weight-bold display-6">{pirate.name}</div>
                                                <div className="d-flex justify-content-center">
                                                    <button className="btn btn-primary me-2" onClick={() => handlerViewPirate(pirate._id)}>View Pirate</button>
                                                    <button className="btn btn-danger" onClick={() => handlerDeletePirate(pirate._id)}>Walk the Plank</button>
                                                </div>
                                                </div>
                                            </div>
                                            </div>    
                                    </li>
                                ))}
                            </ul>
                        </div>
                </div>   

            </div>

        )

    }

        export default PirateCrew;