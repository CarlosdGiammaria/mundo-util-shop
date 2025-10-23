import React, { useState } from "react";
import type { Product } from "../../types";
import "../../css/Createproducto.css"; // 👈 Importar los estilos

const CreateProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [materials, setMaterials] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !materials || !price || !image) {
      alert("⚠️ Por favor completa todos los campos antes de continuar");
      return;
    }

    setLoading(true);
    const imageBase64 = await toBase64(image);
    const storedProducts = localStorage.getItem("products");
    const products: Product[] = storedProducts ? JSON.parse(storedProducts) : [];

    const newProduct: Product = {
      id: Date.now(),
      name,
      materials,
      price: Number(price),
      image: imageBase64,
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    setName("");
    setMaterials("");
    setPrice("");
    setImage(null);
    setPreview(null);
    setLoading(false);

    alert("✅ Producto guardado correctamente");
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  return (
    <div className="create-product-page">
      <div className="create-product-card">
        <div className="create-product-header">Registrar Producto</div>

        <form onSubmit={handleSubmit} className="create-product-form">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="create-product-input"
          />

          <input
            type="text"
            placeholder="Materiales"
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
            className="create-product-input"
          />

          <input
            type="number"
            placeholder="Precio (COP)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="create-product-input"
          />

          <label className="create-product-file">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
            />
            📸 Selecciona una imagen
          </label>

          {preview && (
            <img src={preview} alt="Vista previa" className="preview-image" />
          )}

          <div className="create-product-buttons">
            <a href="/dashboard/productos" type="button" className="btn btn-back">
              Ver productos
            </a>
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-submit ${loading ? "opacity-70" : ""}`}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>

        <div className="create-product-footer">
          © {new Date().getFullYear()} | Desarrollado by CDG Desoft Solutions
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
