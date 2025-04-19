// src/components/mis_contribuciones/card_machine/Card_Machine.jsx
import React from "react";
import "../styles/card_machine.css";
import FlagIcon from "../FlagIcon";

const Card_Machine = ({ image, nombre, descripcion, pais, likes }) => {
  return (
    <div className="machine-card">
      <div className="machine-image-container">
        <img
          src={image || "/placeholder-image.jpg"}
          alt={nombre}
          className="machine-image"
        />
      </div>
      <div className="machine-content">
        <div className="machine-header">
          <h3 className="machine-title">{nombre}</h3>
          <FlagIcon country={pais} />
        </div>
        <p className="machine-description">{descripcion}</p>
        <div className="machine-likes">
          <span className="machine-like-icon">👍</span>
          <span className="machine-like-count">{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Card_Machine;
