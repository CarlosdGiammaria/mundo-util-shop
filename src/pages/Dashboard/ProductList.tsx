import React, { useEffect, useState } from "react";
import type { Product } from "../../types";
import "../../css/ProductList.css";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleUpdate = (id: string) => {
    const name = prompt("Nuevo nombre del producto:");
    const price = prompt("Nuevo precio:");
    const materials = prompt("Nuevos materiales:");

    if (name && price && materials) {
      const updatedProducts = products.map((p) =>
        p.id === id
          ? { ...p, name, price: parseFloat(price), materials }
          : p
      );
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
  };

  if (products.length === 0) {
    return <p className="no-products">No hay productos guardados.</p>;
  }

  return (
    <div className="table-container">
      <a href="/dashboard/crear-producto" className="addProduct"><h3>Agregar Producto</h3></a>
      <h2 className="table-title">Lista de Productos</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Materiales</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.image} alt={p.name} className="table-image" />
              </td>
              <td>{p.name}</td>
              <td>{p.materials}</td>
              <td>${p.price}</td>
              <td>
                <button
                  className="btn-update"
                  onClick={() => handleUpdate(p.id)}
                >
                 <i className='bx bx-edit'></i>  Actualizar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(p.id)}
                >
                  <i className='bx bxs-trash'></i>  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
