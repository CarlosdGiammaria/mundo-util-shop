import { useEffect, useState } from "react";
import type { Order } from "../../types";
import "../../css/Order.css"; // ✅ Asegúrate de tener este archivo

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  return (
    <div className="orders-container">
      <h2 className="orders-title">📦 Pedidos Registrados</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No hay pedidos registrados.</p>
      ) : (
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Observaciones</th>
                <th>Método de Pago</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i}>
                  <td>{o.clientName}</td>
                  <td>{o.email}</td>
                  <td>{o.phone}</td>
                  <td>{o.address}</td>
                  <td>{o.observations || "—"}</td>
                  <td>{o.paymentMethod}</td>
                  <td className="price">${o.total.toLocaleString()}</td>
                  <td>{new Date(o.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
