

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProductList from "../View/EditProductList";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
   const [showEditForm, setShowEditForm] = useState(false)
  
  
  // APIs Calls
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/product");
        const sortedProducts = response.data.data.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setProductList(sortedProducts);
      } catch (error) {
        console.error("Response ", error.message);
      }
    };
    fetchProducts();
  }, []);

  // Handlers

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/product/${productId}`);
      // Actualizar lista de productos después de eliminar el producto
      setProductList((prevProductList) =>
        prevProductList.filter((product) => product._id !== productId)
      );
      alert("Producto Eliminado con Éxito");
    } catch (error) {
      console.error("Error al eliminar el producto: ", error.message);
      alert("Error al eliminar el producto. Por favor, intenta nuevamente.");
    }
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setShowEditForm(true);
  };

  // Dummy data para pruebas - Puedes eliminar esto cuando conectes con la API
 

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul className="list-group">
        {productList.map((product) => (
          <li key={product._id} className="list-group-item">
            <strong>{product.title}</strong> - ${product.price}
            <p>{product.description}</p>
            <button className="btn btn-danger ms-2" onClick={() => handleDelete(product._id)}>
              Eliminar
            </button>

            <Link to={`/edit/${product._id}`} 
            className="btn btn-warning ms-2" 
            onClick={() => handleEditProduct(product)}>Editar</Link>
            
            <Link to={`/${product._id}`} className="btn btn-primary ms-2">
              Ver Detalle
            </Link>
          </li>
        ))}
      </ul>

      {showEditForm && (
        <EditProductList
          product={productToEdit}
          setShowEditForm={setShowEditForm}
        />
      )}
    </div>
  );
};

export default ProductList;
