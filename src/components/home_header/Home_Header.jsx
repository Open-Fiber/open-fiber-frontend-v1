// src/components/Header/Header.jsx
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import "./home_header.css";

const Home_Header = () => {
  const [barPosition, setBarPosition] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);

  const handleHover = (e) => {
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = e.target.getBoundingClientRect();
    setBarPosition({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo-container">
        <span className="logo-text">Open Fiber</span>
      </div>

      {/* Navegación */}
      <nav className="nav" ref={navRef}>
        <Link to="/nosotros" className="nav-link" onMouseEnter={handleHover}>
          NOSOTROS
        </Link>
        <Link to="/aprende" className="nav-link" onMouseEnter={handleHover}>
          APRENDE +
        </Link>
        <Link to="/comunidad" className="nav-link" onMouseEnter={handleHover}>
          COMUNIDAD
        </Link>
        <Link to="/contacto" className="nav-link" onMouseEnter={handleHover}>
          CONTACTO
        </Link>

        {/* Barra dinámica */}
        <span
          className="bar"
          style={{
            left: `${barPosition.left}px`,
            width: `${barPosition.width}px`,
          }}
        ></span>
      </nav>

      {/* Icono de perfil */}
      <div className="profile-icon">
        <FaRegCircleUser className="icon" />
      </div>
    </header>
  );
};

export default Home_Header;
