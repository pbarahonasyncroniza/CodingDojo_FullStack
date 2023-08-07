
import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
  });

  const [deleted, setDeleted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos del formulario al servidor
      await axios.post("http://localhost:8000/product", product);

      // Limpiar el formulario después del envío
      setProduct({
        title: "",
        price: "",
        description: "",
      });

      // Opcional: mostrar un mensaje de éxito o redirigir a otra página
      alert("Producto agregado con éxito");

      // Resetear el estado deleted a false cuando se agrega un producto nuevo
      setDeleted(false);
    } catch (error) {
      // Manejar errores en caso de que la solicitud falle
      console.error("Error al agregar el producto:", error.message);
      alert("Error al agregar el producto. Por favor, intenta nuevamente.");
    }
  };

  const handleDeleteClick = async () => {
    try {
      // Enviar una solicitud para eliminar el producto
      await axios.delete(`http://localhost:8000/product/${product._id}`);

      // Actualizar el estado deleted a true para indicar que el producto ha sido eliminado
      setDeleted(true);

      // Opcional: mostrar un mensaje de éxito o redirigir a otra página
      alert("Producto eliminado con éxito");
    } catch (error) {
      // Manejar errores en caso de que la solicitud falle
      console.error("Error al eliminar el producto:", error.message);
      alert("Error al eliminar el producto. Por favor, intenta nuevamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            className="form-control"
            type="text"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            className="form-control"
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <input className="mt-3 w-30 btn btn-primary" type="submit" value="Agregar" />
      {/* Botón de eliminar */}
      {!deleted && (
        <button className="mt-3 w-30 btn btn-danger ms-2" type="button" onClick={handleDeleteClick}>
          Eliminar
        </button>
      )}
    </form>
  );
};

export default ProductForm;
