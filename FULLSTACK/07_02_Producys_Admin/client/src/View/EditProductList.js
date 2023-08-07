

import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

const EditProductList = () => {
  //1 states and variables
  //-----------------------------------------------------------------------------
  
  const { id } =useParams(); // obtener la ID del producto desde la URL
  const navigate = useNavigate(); // se puede ingresar a la historia de la navegacion
  const [product, setProduct] = useState ({})
  
  const [editedProduct, setEditedProduct] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
  });

  //3 llamadas a la API
  //---------------------------------------------------------------------------
    useEffect(()=> {
        const fetchProduct = async () =>{
            try{
                const response = await axios.get(`http://localhost:8000/product/${id}`)
                setProduct (response.data);
                setEditedProduct(response.data) // establecer datos iniciales para el formulario
            }
                catch(error){
                    console.error("Error al obtener el producto" , error.message)
                }
        }
        fetchProduct();
    },[id])


  //2 Handlers
  //--------------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:8000/product/${id}`, editedProduct);
        alert("Producto actualizado exitosamente");
        navigate("/")
    } catch (error) {
      console.error("Error al actualizar el producto", error.message);
      alert("Error al actualizar el producto. Por favor, intenta nuevamente.");
    }
  };

  if (!product) return <p>Cargando...</p>

  //3 JSX
  //---------------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit}>
      <h3>Editar Producto</h3>
      <div className="mb-3">
        <label className="form-label">Title:</label>
        <input
          className="form-control w-50"
          type="text"
          id="title"
          name="title"
          value={editedProduct.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="form-label">Price:</label>
        <input
          className="form-control w-50"   
          type="text"
          id="price"
          name="price"
          value={editedProduct.price}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="form-label">Description:</label>
        <input
          className="form-control w-50" 
          type="text"
          id="description"
          name="description"
          value={editedProduct.description}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-info">
        Save Changes
      </button>
      <Link to="/" className="btn btn-primary ms-3 my-3">Home</Link>
    </form>
  );
};

export default EditProductList;
