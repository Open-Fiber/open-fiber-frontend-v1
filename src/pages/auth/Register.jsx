import React from "react";
import { Link } from "react-router-dom";
import "./../../styles/pages/auth/register.css";

const Register = () => {
  return (
    <div className="conteiner-register-component">
      <div className="background-video">
        <video autoPlay loop muted>
          <source
            src="https://cdn.pixabay.com/video/2020/10/19/52849-473336269_large.mp4"
            type="video/mp4"
          />
          Tu navegador no soporta el video.
        </video>
      </div>

      <div className="register-container">
        <div className="register-form">
          <h2>Registrate</h2>
          <form>
            <div className="conteiner-input-register">
              <label htmlFor="email-register">Correo electrónico</label>
              <input type="email" id="email-register" required />

              <label htmlFor="phote-register">Numero de celular</label>
              <input type="tel" id="phote-register" required />

              <label htmlFor="name-register">Nombre completo</label>
              <input type="text" id="name-register" required />

              <label htmlFor="password-register">Contraseña</label>
              <input type="password" id="password-register" required />
            </div>
            <button type="submit">Registrase</button>
          </form>

          <div className="links">
            <p>¿Ya tienes una cuenta?</p>
            <Link to="/login">! Inicia sesión!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
