import React, { useState } from "react";
import { Link } from "react-router-dom";
import ParticlesBackground from "./../../components/ParticlesBackground/ParticlesBackground";
import "./../../styles/pages/auth/login.css"; // Usar el CSS de login para estandarizar

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Register attempt:", formData);
    }, 2000);
  };

  return (
    <div className="login-page">
      <ParticlesBackground />

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Crea tu cuenta</h1>
            <p className="login-subtitle">
              Regístrate para acceder a todas nuestras funciones.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Numero de celular
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ej: 5512345678"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Nombre completo
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-input"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className={`login-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="button-spinner"></div>
              ) : (
                "Registrarse"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="signup-prompt">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="signup-link">
                ¡Inicia sesión!
              </Link>
            </p>
            <p className="signup-prompt">
              <Link to="/" className="signup-link">
                Volver al Inicio
              </Link>
            </p>
          </div>
        </div>

        <div className="login-illustration">
          <div className="illustration-content">
            <div className="floating-elements">
              <div className="floating-card card-1"></div>
              <div className="floating-card card-2"></div>
              <div className="floating-card card-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
