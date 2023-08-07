import React,  { useState,useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

    const Detail = ()=>{
        const {id} = useParams();
        const [productDetail, setProductDetail ] = useState({})
        const [showDetails, setShowDetails] = useState(false);


        useEffect(()=>{
            const fetchProductsDetails = async () => {
            try{
                    const response = await axios.get(`http://localhost:8000/product/${id}`);
                    setProductDetail(response.data.data);
            } 
                catch(error) {
                    console.error("Response ",error.message)
                }

            }
            fetchProductsDetails();
        },[id]);

        if (Object.keys(productDetail).length === 0) {
            return <div>Cargando...</div>;
          }


        // Handles
            const handleShowDetails = () => {
                setShowDetails(true)
            }

            
        
        return (
            <div>
                <h2> Detalles del Producto</h2>
                <p>Title:{productDetail.title} </p>
                {showDetails && (
                 <>   
                <p>Price:{productDetail.price} </p>
                <p>Description:{productDetail.description} </p>
                <Link to="/" className="btn btn-danger">Volver</Link>
                </>
                )}
                {!showDetails && (
                    <button 
                    onClick={handleShowDetails} 
                    type="submit" 
                    className="btn btn-primary">Ver Detalle</button>
                )}
            </div>
        )
    };

    export default Detail;