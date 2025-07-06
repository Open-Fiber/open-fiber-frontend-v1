import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  logout,
  selectIsAuthenticated,
  selectUser,
} from "../../slices/authSlice";
import "./second_header.css";

const Second_Header = ({ isFixed = false, className = "" }) => {
  const [barPosition, setBarPosition] = useState({ left: 0, width: 0 });
  const [showDropdown, setShowDropdown] = useState(false);
  const navRef = useRef(null);

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

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

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    console.log("User logged out successfully");
  };

  // Close dropdown when clicking outside
  const handleDropdownBlur = (e) => {
    // Small delay to allow link clicks to register
    setTimeout(() => {
      setShowDropdown(false);
    }, 150);
  };

  const headerClass = `second-header ${
    isFixed ? "fixed" : ""
  } ${className}`.trim();

  const getUserDisplayName = () => {
    if (!user) return "";
    return user.nombre || user.name || user.email || "Usuario";
  };

  return (
    <header className={headerClass}>
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <span className="logo-text" draggable={false}>
            Open Fiber
          </span>
        </Link>
      </div>

      <nav className="nav" ref={navRef}>
        <Link to="/nosotros" className="nav-link" onMouseEnter={handleHover}>
          NOSOTROS
        </Link>
        <Link
          to="/page-aprende"
          className="nav-link"
          onMouseEnter={handleHover}
        >
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
          {isAuthenticated && (
            <span
              className="user-name"
              style={{ marginLeft: "8px", fontSize: "14px" }}
            >
              {getUserDisplayName()}
            </span>
          )}
        </div>

        {showDropdown && (
          <div className="profile-dropdown" onBlur={handleDropdownBlur}>
            {!isAuthenticated ? (
              // Show these options when not logged in
              <>
                <Link
                  to="/login"
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  Registrarse
                </Link>
              </>
            ) : (
              // Show these options when logged in
              <>
                <Link
                  to="/settings"
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  Ajustes
                </Link>
                <button
                  className="dropdown-item logout-btn"
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    padding: "inherit",
                    color: "inherit",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                  }}
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Second_Header;
