import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminMenu from "../../layouts/AdminMenu";
import "../../css/AdminDashboard.css";

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // inicializamos en false

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    // definimos el tamaño inicial seguro
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();

    // escuchamos cambios de tamaño
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="admin-dashboard">
      {isMobile && (
        <button className="menu-toggle-btn" onClick={toggleMenu}>
          <i className='bx bx-menu'></i>
        </button>
      )}

      {/* ahora seguro */}
      <AdminMenu className={isMobile && !menuOpen ? "hide" : ""} />

      <main
        className="admin-content"
        style={{ marginLeft: !isMobile ? "240px" : "0" }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
