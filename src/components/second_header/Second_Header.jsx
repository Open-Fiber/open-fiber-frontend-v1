// src/components/second_header/Second_Header.jsx
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import "./second_header.css";

const Second_Header = ({ isFixed = false, className = "" }) => {
  const [barPosition, setBarPosition] = useState({ left: 0, width: 0 });
  const [showDropdown, setShowDropdown] = useState(false);
  const navRef = useRef(null);

  const handleHover = (e) => {
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = e.target.getBoundingClientRect();
    setBarPosition({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const headerClass = `second-header ${
    isFixed ? "fixed" : ""
  } ${className}`.trim();

  return (
    <header className={headerClass}>
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <span className="logo-text" draggable={false}>Open Fiber</span>
        </Link>
      </div>

      <nav className="nav" ref={navRef}>
        <Link to="/nosotros" className="nav-link" onMouseEnter={handleHover}>
          NOSOTROS
        </Link>
        <Link to="/aprende" className="nav-link" onMouseEnter={handleHover}>
          APRENDE +
        </Link>
        <Link to="/construye" className="nav-link" onMouseEnter={handleHover}>
          CONSTRUYE
        </Link>
        <Link to="/comunidad" className="nav-link" onMouseEnter={handleHover}>
          COMUNIDAD
        </Link>
        <Link to="/contacto" className="nav-link" onMouseEnter={handleHover}>
          CONTACTO
        </Link>

        <span
          className="bar"
          style={{
            left: `${barPosition.left}px`,
            width: `${barPosition.width}px`,
          }}
        ></span>
      </nav>

      <div className="profile-container">
        <div className="profile-icon" onClick={toggleDropdown}>
          <FaRegCircleUser className="icon" />
        </div>

        {showDropdown && (
          <div className="profile-dropdown">
            <Link to="/login" className="dropdown-item">
              Iniciar sesión
            </Link>
            <Link to="/register" className="dropdown-item">
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Second_Header;
