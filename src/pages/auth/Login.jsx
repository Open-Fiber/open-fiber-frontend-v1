import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import "../../styles/pages/auth/auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return; // Don't submit if fields are empty
    }

    try {
      const result = await dispatch(login(formData.email, formData.password));
      if (result.success) {
        navigate("/");
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

          {error && (
            <div
              className="error-message"
              style={{ color: "red", marginBottom: "10px" }}
            >
              {error}
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
                required
              />
            </div>

            <div className="inputBx">
              <input
                type="submit"
                value={loading ? "Iniciando..." : "Iniciar Sesión"}
                disabled={loading}
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
