import { useEffect, useState } from "react";
import type { Order } from "../../types";
import "../../css/Order.css";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  const toggleDetails = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">
        <i className="bx bx-package"></i> Pedidos Registrados
      </h2>

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
                <th>Productos</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <>
                  <tr key={i}>
                    <td>{o.clientName}</td>
                    <td>{o.email}</td>
                    <td>{o.phone}</td>
                    <td>{o.address}</td>
                    <td>{o.observations || "—"}</td>
                    <td>{o.paymentMethod}</td>
                    <td className="price">${o.total.toLocaleString()}</td>
                    <td>{new Date(o.date).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn-details"
                        onClick={() => toggleDetails(i)}
                      >
                        {openIndex === i ? "Ocultar" : "Ver productos"}
                      </button>
                    </td>
                  </tr>

                  {openIndex === i && (
                    <tr className="products-row">
                      <td colSpan={9}>
                        <table className="inner-table">
                          <thead>
                            <tr>
                              <th>Producto</th>
                              <th>Precio</th>
                              <th>Cantidad</th>
                              <th>Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {o.items.map((item, index) => (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.price.toLocaleString()}</td>
                                <td>{item.quantity}</td>
                                <td className="price">
                                  ${item.subtotal.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
