import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import type { Product } from "../types";
import "../css/Products.css";

const Products = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Products must be used within a CartProvider");

  const { addToCart } = context;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  if (products.length === 0) {
    return <p className="no-products">No hay productos disponibles.</p>;
  }

  return (
    <div className="products-container">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <div className="image-wrapper">
            {p.image ? (
              <img src={p.image} alt={p.name} className="product-image" />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "240px",
                  backgroundColor: "#eaeaea",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555",
                  fontSize: "0.9rem",
                }}
              >
                Sin imagen
              </div>
            )}
          </div>
          <div className="product-info">
            <h3 className="product-name">{p.name}</h3>
            <p className="product-materials">{p.materials}</p>
            <p className="product-price">${p.price.toLocaleString()}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(p)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
