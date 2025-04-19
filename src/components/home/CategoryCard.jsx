import React from "react";
import "./styles/categorycard.css";

const CategoryCard = ({ imageUrl, title }) => {
  return (
    <div className="category-card">
      <div className="card-container">
        <div
          className="card-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="card-overlay"></div>
          <div className="spotlight-effect">
            <div className="spotlight-line top-left"></div>
            <div className="spotlight-line top-right"></div>
            <div className="spotlight-line bottom-left"></div>
            <div className="spotlight-line bottom-right"></div>
          </div>
          <h3 className="card-title">{title}</h3>
        </div>
      </div>
      {/* Outside sticks */}
      <div className="outside-sticks">
        <div className="stick top-stick"></div>
        <div className="stick right-stick"></div>
        <div className="stick bottom-stick"></div>
        <div className="stick left-stick"></div>
      </div>
    </div>
  );
};

export default CategoryCard;
