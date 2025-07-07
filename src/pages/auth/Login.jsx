import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  clearError,
} from "../../slices/authSlice";
import "../../styles/pages/auth/auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      // Clear error after 5 seconds
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return; // Don't submit if fields are empty
    }

    try {
      const result = await dispatch(
        login({
          email: formData.email,
          password: formData.password,
        })
      );

      if (login.fulfilled.match(result)) {
        console.log("Login successful:", result.payload);
        navigate("/");
      } else {
        console.log("Login failed:", result.payload);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="container">
      <div className="square">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <div className="login">
          <h2>Bienvenido</h2>

          {/* UPDATED: Better error handling with close button */}
          {error && (
            <div
              className="error-message"
              style={{
                color: "red",
                marginBottom: "10px",
                padding: "8px",
                border: "1px solid red",
                borderRadius: "4px",
                backgroundColor: "#ffebee",
                position: "relative",
              }}
            >
              {typeof error === "string"
                ? error
                : error.message || "Error de inicio de sesión"}
              <button
                onClick={() => dispatch(clearError())}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "4px",
                  background: "none",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="inputBx">
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
            </div>

            <div className="inputBx">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
            </div>

            <div className="inputBx">
              <input
                type="submit"
                value={loading ? "Iniciando..." : "Iniciar Sesión"}
                disabled={loading}
                style={{
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              />
            </div>
          </form>

          <div className="links">
            <Link to="/Settings">Cambiar Contraseña</Link>
          </div>
          <div className="links">
            <Link to="/register">Registrate</Link>
            <Link to="/">Inicio</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
