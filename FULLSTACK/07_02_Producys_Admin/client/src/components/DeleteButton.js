import React from "react";
import axios from "axios";

const DeleteButton = ({ productId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/product/${productId}`);
      // Opcional: Mostrar un mensaje de éxito o redirigir a otra página
      alert("Producto eliminado con éxito");
    } catch (error) {
      // Manejar errores en caso de que la solicitud falle
      console.error("Error al eliminar el producto:", error.message);
      alert("Error al eliminar el producto. Por favor, intenta nuevamente.");
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Borrar Producto
    </button>
  );
};

export default DeleteButton;
