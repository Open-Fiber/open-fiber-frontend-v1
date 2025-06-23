import { useState } from "react";
import { Link } from "react-router-dom";
import "./../../styles/pages/auth/login.css";
const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Register attempt:", formData);
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
          <h2>Registrate</h2>
          <div className="inputBx">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="inputBx">
            <input
              type="tel"
              name="phone"
              placeholder="Número de celular"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="inputBx">
            <input
              type="text"
              name="fullName"
              placeholder="Nombre completo"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="inputBx">
            <input
              type="text"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="inputBx">
            <input
              type="submit"
              value="Registrarse"
              onClick={handleSubmit}
              disabled={isLoading}
            />
          </div>
          <div className="links">
            <a href="#">
              <Link to="/">Inicio</Link>
            </a>
            <a href="#">
              <Link to="/login">Inicia Sesion</Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;  
