// src/components/Header/Header.jsx
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import "./home_header.css";

const Home_Header = () => {
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

  return (
    <>
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

        {/* Icono de perfil con dropdown */}
        <div className="profile-container">
          <div className="profile-icon" onClick={toggleDropdown}>
            <FaRegCircleUser className="icon" />
          </div>

          {/* Dropdown menu */}
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

      {/* Texto en la esquina inferior derecha */}
      <div className="revolution-text">
        <h2>EMPEZANDO UNA REVOLUCIÓN</h2>
        <p>Construye más, contamina menos</p>
      </div>

      {/* Video background con overlay oscuro */}
      <div className="video-container-home">
        <div className="video-overlay-home"></div>
        <video autoPlay loop muted playsInline className="background-video">
          <source
            src="https://res.cloudinary.com/dvqsabodr/video/upload/v1745029047/n9sabavz81bnfi1et7lz.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </>
  );
};

export default Home_Header;
