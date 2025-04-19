// src/components/mis_contribuciones/FlagIcon.jsx
import React from "react";
import "./styles/flag-icon.css";

const FlagIcon = ({ country }) => {
  return (
    <img
      src={`https://flagcdn.com/${country}.svg`}
      alt={`Bandera de ${country}`}
      className="flag-icon"
    />
  );
};

export default FlagIcon;
