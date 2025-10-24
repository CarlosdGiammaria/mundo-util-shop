import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import type { Order } from "../types";
import "../css/Cart.css";

const Cart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart must be used within a CartProvider");

  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = context;

  const [form, setForm] = useState({
    clientName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "efectivo",
    observations: "",
  });

  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: Order = {
      id: Date.now(),
      clientName: form.clientName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      paymentMethod: form.paymentMethod,
      observations: form.observations,
      items: cart.map(({ id, name, price, quantity, subtotal }) => ({
        id,
        name,
        price,
        quantity,
        subtotal,
      })),
      total,
      date: new Date().toISOString(),
    };

    try {
      const storedOrders = localStorage.getItem("orders");
      const orders = storedOrders ? JSON.parse(storedOrders) : [];
      orders.push(newOrder);

      const trimmedOrders = orders.slice(-20);
      localStorage.setItem("orders", JSON.stringify(trimmedOrders));

      setSuccess(true);

      // 🕒 Limpia el carrito 5 segundos después del mensaje
      setTimeout(() => {
        clearCart();
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("⚠️ Error guardando pedido:", error);
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">
        🛒 Carrito de Compras
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </h2>

      {success ? (
        <div className="success-message">
          ✅ <strong>Gracias por tu compra.</strong> <br />
          Tu pedido estará listo entre <strong>3 y 5 horas.</strong> <br />
          <small>(No válido para pedidos realizados después de las 4:00 p.m.)</small>
        </div>
      ) : cart.length === 0 ? (
        <p className="empty-cart">No hay productos en el carrito</p>
      ) : (
        <>
          {/* 🖥️ Vista escritorio */}
          <table className="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toLocaleString()}</td>
                  <td>
                    <button
                      className="btn-qty"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="qty">{item.quantity}</span>
                    <button
                      className="btn-qty"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </td>
                  <td>${item.subtotal.toLocaleString()}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="bx bxs-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 📱 Vista móvil */}
          <div className="cart-items-mobile">
            {cart.map((item) => (
              <div className="cart-item-card" key={item.id}>
                <div className="cart-item-header">
                  <span>{item.name}</span>
                  <span>${item.subtotal.toLocaleString()}</span>
                </div>
                <div className="cart-item-body">
                  <p>Precio: ${item.price.toLocaleString()}</p>
                  <div className="cart-item-actions">
                    <div>
                      <button
                        className="btn-qty"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="qty">{item.quantity}</span>
                      <button
                        className="btn-qty"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn-delete"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="bx bxs-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <h3 className="total">
              Total: <span>${total.toLocaleString()}</span>
            </h3>
            <button className="btn-clear" onClick={clearCart}>
              <i className="bx bxs-trash"></i> Vaciar carrito
            </button>
          </div>

          <form className="order-form" onSubmit={handleSubmit}>
            <h3>Información del cliente</h3>

            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre completo"
                value={form.clientName}
                onChange={(e) =>
                  setForm({ ...form, clientName: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                placeholder="Teléfono"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Dirección"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <select
                value={form.paymentMethod}
                onChange={(e) =>
                  setForm({ ...form, paymentMethod: e.target.value })
                }
              >
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>

            <div className="form-group">
              <textarea
                placeholder="Observaciones (opcional)"
                value={form.observations}
                onChange={(e) =>
                  setForm({ ...form, observations: e.target.value })
                }
                rows={3}
              />
            </div>

            <button type="submit" className="btn-submit">
              <i className="bx bx-cart-download bx-sm"></i> Confirmar pedido
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Cart;
