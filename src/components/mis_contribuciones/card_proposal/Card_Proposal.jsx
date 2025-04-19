// src/components/mis_contribuciones/card_proposal/Card_Proposal.jsx
import React from "react";
import "../styles/card_proposal.css";
import FlagIcon from "../FlagIcon";

const Card_Proposal = ({ image, nombre, fechaLanzamiento, estado, pais }) => {
  // Determinar la clase CSS para el estado
  const estadoClass = estado.toLowerCase().includes("revisión")
    ? "estado-revision"
    : estado.toLowerCase() === "rechazado"
    ? "estado-rechazado"
    : "estado-aceptado";

  return (
    <div className="proposal-card">
      <div className="proposal-image-container">
        <img
          src={image || "/placeholder-image.jpg"}
          alt={nombre}
          className="proposal-image"
        />
      </div>
      <div className="proposal-content">
        <div className="proposal-header">
          <h3 className="proposal-title">{nombre}</h3>
          <FlagIcon country={pais} />
        </div>
        <div className="proposal-details">
          <p className="proposal-fecha">
            <span className="proposal-label">Fecha de lanzamiento</span>
            <span className="proposal-value">{fechaLanzamiento}</span>
          </p>
          <p className="proposal-estado">
            <span className="proposal-label">Estado</span>
            <span className={`proposal-value ${estadoClass}`}>{estado}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card_Proposal;
