import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminMenu from "../../layouts/AdminMenu";
import "../../css/AdminDashboard.css";

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="admin-dashboard">
      {isMobile && (
        <button className="menu-toggle-btn" onClick={toggleMenu}>
          ☰
        </button>
      )}

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
