import React from "react";
import { Link } from "react-router-dom";
import "./../../styles/pages/auth/login.css";

const Login = () => {
  return (
    <div className="conteiner-login-component">
      <div className="background-video">
        <video autoPlay loop muted>
          <source
            src="https://cdn.pixabay.com/video/2020/10/19/52849-473336269_large.mp4"
            type="video/mp4"
          />
          Tu navegador no soporta el video.
        </video>
      </div>

      <div className="login-container">
        <div className="login-form">
          <h2>Bienvenido</h2>
          <form>
            <div className="conteiner-input-login">
              <label htmlFor="email-login">Correo electrónico</label>
              <input type="email" id="email-login" required />

              <label htmlFor="password-login">Contraseña</label>
              <input type="password" id="password-login" required />
            </div>
            <button type="submit">Iniciar Sesión</button>
          </form>

          <div className="links">
            <p>¿No tienes una cuenta?</p>
            <Link to="/register">¡Crea una!</Link>
          </div>
        </div>

        <div className="image-container">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARYAAAC1CAMAAACtbCCJAAAAA1BMVEWUlZnYhXhJAAAASElEQVR4nO3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBjA8VDAAH+iSvZAAAAAElFTkSuQmCC"
            alt="Imagen de fondo"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
