import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import "../css/ClientLayout.css";
import logo from "../assets/mejorca.png"; // ✅ importa la imagen

const ClientLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "active" : "";

  return (
    <div className="layout-container">
      {/* 🔹 Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="logo">
            <img src={logo} alt="" className="logo-img"/>  Mundo Útil
          </Link>

          {/* Botón hamburguesa */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            ☰
          </button>

          {/* Enlaces */}
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li>
              <Link
                to="/"
                className={isActive("/")}
                onClick={() => setMenuOpen(false)}
              >
                <i className='bx bx-home-alt' ></i> Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/productos"
                className={isActive("/productos")}
                onClick={() => setMenuOpen(false)}
              >
                <i className='bx bx-store'></i> Productos
              </Link>
            </li>
            <li>
              <Link
                to="/carrito"
                className={isActive("/carrito")}
                onClick={() => setMenuOpen(false)}
              >
                <i className='bx bxs-cart-alt'></i> Carrito
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 🔹 Contenido principal */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* 🔹 Footer */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Mundo Útil | Crea, diseña y construye tu mundo con Mundo Útil.<br />
          Desarrollado por <span className="cdg">CDG Desoft Solutions</span>
        </p>
      </footer>
    </div>
  );
};

export default ClientLayout;
