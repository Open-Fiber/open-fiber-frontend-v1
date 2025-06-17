import React, { useState } from "react";
import { Link } from "react-router-dom";
import ParticlesBackground from "./../../components/ParticlesBackground/ParticlesBackground";
import "./../../styles/pages/auth/login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
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
      console.log("Login attempt:", formData);
    }, 2000);
  };

  return (
    <div className="login-page">
      <ParticlesBackground />

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Bienvenido de vuelta</h1>
            <p className="login-subtitle">
              Inicia sesión en tu cuenta para continuar
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
                onChange={handleInputChange}
                placeholder="tu@email.com"
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
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Recordarme
              </label>
              <a href="#" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className={`login-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="button-spinner"></div>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="signup-prompt">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="signup-link">
                Regístrate aquí
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

export default Login;
