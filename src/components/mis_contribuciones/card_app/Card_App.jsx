// src/components/mis_contribuciones/card_app/Card_App.jsx
import React from "react";
import "../styles/card_app.css";
import FlagIcon from "../FlagIcon";

const Card_App = ({ image, nombre, descripcion, pais, likes }) => {
  return (
    <div className="app-card">
      <div className="app-image-container">
        <img
          src={image || "/placeholder-image.jpg"}
          alt={nombre}
          className="app-image"
        />
      </div>
      <div className="app-content">
        <div className="app-header">
          <h3 className="app-title">{nombre}</h3>
          <FlagIcon country={pais} />
        </div>
        <p className="app-description">{descripcion}</p>
        <div className="app-likes">
          <span className="app-like-icon">👍</span>
          <span className="app-like-count">{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Card_App;
