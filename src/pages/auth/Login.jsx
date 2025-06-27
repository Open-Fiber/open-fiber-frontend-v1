import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/auth/auth.css";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login2 attempt:", formData);
    }, 2000);
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
          <div className="inputBx">
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="inputBx">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputBx">
            <input
              type="submit"
              value="Iniciar Sesion"
              onClick={handleSubmit}
              disabled={isLoading}
            />
          </div>
          <div className="links">
            <Link to="/forgot-password">Cambiar Contraseña</Link>
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
