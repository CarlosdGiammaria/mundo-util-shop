import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product, CartContextType, CartItem } from "../types";

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Guardar carrito sin datos pesados
  useEffect(() => {
    try {
      const lightCart = cart.map(({ id, name, price, quantity, subtotal }) => ({
        id,
        name,
        price,
        quantity,
        subtotal,
      }));
      localStorage.setItem("cart", JSON.stringify(lightCart));
    } catch (error) {
      console.error("⚠️ Error guardando carrito en localStorage:", error);
    }
  }, [cart]);

  // ✅ Agregar o actualizar producto
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                quantity: p.quantity + 1,
                subtotal: (p.quantity + 1) * p.price,
              }
            : p
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            subtotal: product.price,
          },
        ];
      }
    });
  };

  // ✅ Disminuir cantidad o eliminar si llega a 0
  const decreaseQuantity = (productId: number) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === productId
            ? {
                ...p,
                quantity: p.quantity - 1,
                subtotal: (p.quantity - 1) * p.price,
              }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  // ✅ Eliminar producto del carrito
  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
