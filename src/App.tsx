import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import CreateProduct from "./pages/Dashboard/CreateProduct";
import ProductList from "./pages/Dashboard/ProductList";
import Orders from "./pages/Dashboard/Orders";
import ClientLayout from "../src/layouts/ClienteLayout";
import AdminDashboard from "../src/pages/Dashboard/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* Vistas públicas */}
      <Route element={<ClientLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/carrito" element={<Cart />} />
      </Route>

      {/* Dashboard admin */}
      <Route path="/dashboard" element={<AdminDashboard />}>
        <Route path="crear-producto" element={<CreateProduct />} />
        <Route path="productos" element={<ProductList />} />
        <Route path="pedidos" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default App;
