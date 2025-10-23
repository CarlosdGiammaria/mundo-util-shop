import { NavLink } from "react-router-dom";
import { Package, PlusCircle, ShoppingBag } from "lucide-react";
import "../../src/css/Admin.css";

interface AdminMenuProps {
  className?: string; // ✅ declara la prop opcional
}

const AdminMenu: React.FC<AdminMenuProps> = ({ className = "" }) => {
  const links = [
    { to: "/dashboard/crear-producto", label: "Crear Producto", icon: <PlusCircle size={18} /> },
    { to: "/dashboard/productos", label: "Productos", icon: <Package size={18} /> },
    { to: "/dashboard/pedidos", label: "Pedidos", icon: <ShoppingBag size={18} /> },
  ];

  return (
    <aside className={`admin-menu ${className}`.trim()}> {/* ✅ aplica la clase */}
      <h1 className="menu-title">Mundo Útil Admin</h1>
      <nav className="menu-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminMenu;
