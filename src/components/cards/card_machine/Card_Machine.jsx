import React, { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import {
  FaCog,
  FaUser,
  FaCalendarAlt,
  FaDownload,
  FaEye,
  FaPrint,
} from "react-icons/fa";
import FlagIcon from "../../mis_contribuciones/FlagIcon";
import "../styles/card_machine.css";

const Card_Machine = ({
  image,
  nombre,
  descripcion,
  pais,
  likes,
  difficulty,
  category,
  createdAt,
  tags = [],
  author,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(false);

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Principiante":
        return { bg: "#abc3ff", text: "#1a1a1a" };
      case "Intermedio":
        return { bg: "#4949e9", text: "#ffffff" };
      case "Avanzado":
        return { bg: "#dcf342", text: "#1a1a1a" };
      default:
        return { bg: "#6b7280", text: "#ffffff" };
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Electronica":
        return { bg: "rgba(73, 73, 233, 0.2)", text: "#ffffff" };
      case "Mecanica":
        return { bg: "rgba(171, 195, 255, 0.2)", text: "#ffffff" };
      case "Estetica":
        return { bg: "rgba(220, 243, 66, 0.2)", text: "#ffffff" };
      default:
        return { bg: "rgba(107, 114, 128, 0.2)", text: "#ffffff" };
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
    });
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleCardHover = () => {
    setHoveredCard(true);
  };

  const handleCardLeave = () => {
    setHoveredCard(false);
  };

  const difficultyStyle = getDifficultyColor(difficulty);
  const categoryStyle = getCategoryColor(category);

  return (
    <div
      className={`app-card ${hoveredCard ? "hovered" : ""}`}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
    >
      {/* Background Image */}
      <div className="app-background">
        <img src={image || "/placeholder-image.jpg"} alt={nombre} />
        <div className="app-overlay"></div>
      </div>

      {/* Category Badge */}
      <div
        className="category-badge"
        style={{
          backgroundColor: categoryStyle.bg,
          color: categoryStyle.text,
        }}
      >
        <span>{category}</span>
      </div>

      {/* Floating Icon */}
      <div className="floating-icon">
        <FaPrint />
      </div>

      {/* Card Content */}
      <div className="app-content">
        {/* Always visible header */}
        <div className="app-header">
          <div className="header-main">
            <h3 className="app-title">{nombre}</h3>
            <div className="header-meta">
              <FlagIcon country={pais} />
              <span className="app-author">
                <FaUser className="meta-icon" />
                {author}
              </span>
              <span
                className="app-difficulty"
                style={{
                  backgroundColor: difficultyStyle.bg,
                  color: difficultyStyle.text,
                }}
              >
                {difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Hidden content that slides up on hover */}
        <div className="app-details">
          <p className="app-description">{descripcion}</p>

          {/* Tags */}
          <div className="app-tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>

          {/* app Stats */}
          <div className="app-stats">
            <div className="stat">
              <FaCalendarAlt className="stat-icon-machine" />
              <span>{formatDate(createdAt)}</span>
            </div>
            <div className="stat">
              <FaPrint className="stat-icon-machine" />
              <span>Imprimible 3D</span>
            </div>
            <div className="stat">
              <FaEye className="stat-icon-machine" />
              <span>Open Source</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="app-actions">
            <div className="likes-section">
              <button
                className={`like-button ${isLiked ? "liked" : ""}`}
                onClick={handleLike}
              >
                {isLiked ? <AiFillLike /> : <AiOutlineLike />}
              </button>
              <span className="like-count">{likes + (isLiked ? 1 : 0)}</span>
            </div>

            <div className="action-buttons">
              <button className="action-btn primary">
                <FaDownload className="btn-icon" />
                <span>Descargar</span>
              </button>
              <button className="action-btn secondary">
                <FaEye className="btn-icon" />
                <span>Ver</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effects */}
      <div className="app-effects">
        <div className="glow-effect"></div>
        <div className="shimmer-effect"></div>
      </div>

      {/* Interactive Border */}
      <div className="interactive-border">
        <div className="border-line top"></div>
        <div className="border-line right"></div>
        <div className="border-line bottom"></div>
        <div className="border-line left"></div>
      </div>
    </div>
  );
};

export default Card_Machine;
