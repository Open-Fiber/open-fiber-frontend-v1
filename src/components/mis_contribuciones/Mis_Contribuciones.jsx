// src/components/mis_contribuciones/MisContribuciones.jsx
import React from "react";
import Second_Header from "../second_header/Second_Header";
import "./styles/mis_contribuciones.css";
import {
  machinesHacked,
  applications,
  proposalsPending,
  proposalsReviewed,
} from "./data";
import Card_Machine from "../cards/card_machine/Card_Machine";
import Card_App from "../cards/card_app/Card_App";
import Card_Proposal from "../cards/card_proposal/Card_Proposal";
import { FaPlus } from "react-icons/fa";

const MisContribuciones = () => {
  return (
    Second_Header,
    (
      <div className="mis-contribuciones">
        {/* Sección 1: Mis Máquinas Hackeadas */}
        <section className="seccion">
          <h2>Mis Máquinas Hackeadas</h2>
          <div className="cards-container">
            {machinesHacked.map((card, index) => (
              <Card_Machine key={index} {...card} />
            ))}
            <button className="add-button">
              <FaPlus />
            </button>
          </div>
        </section>

        {/* Sección 2: Mis Aplicaciones */}
        <section className="seccion">
          <h2>Mis Aplicaciones</h2>
          <div className="cards-container">
            {applications.map((card, index) => (
              <Card_App key={index} {...card} />
            ))}
            <button className="add-button">
              <FaPlus />
            </button>
          </div>
        </section>

        {/* Sección 3: Propuestas en Revisión */}
        <section className="seccion">
          <h2>Propuestas en Revisión</h2>
          <div className="cards-container">
            {proposalsPending.map((card, index) => (
              <Card_Proposal key={index} {...card} />
            ))}
            <button className="add-button">
              <FaPlus />
            </button>
          </div>
        </section>

        {/* Sección 4: Propuestas Revisadas */}
        <section className="seccion">
          <h2>Propuestas Revisadas</h2>
          <div className="cards-container">
            {proposalsReviewed.map((card, index) => (
              <Card_Proposal key={index} {...card} />
            ))}
            <button className="add-button">
              <FaPlus />
            </button>
          </div>
        </section>
      </div>
    )
  );
};

export default MisContribuciones;
