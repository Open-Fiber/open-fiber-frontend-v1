import React from "react";
import "./imagetextsection.css";

const ImageTextSection = ({ imageUrl, title, text, imageOnLeft = true }) => {
  return (
    <div
      className={`image-text-section ${
        imageOnLeft ? "image-left" : "image-right"
      }`}
    >
      <div className="content-container">
        <div className="image-container-home">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="text-container">
          <h2 className="section-title">{title}</h2>
          <p className="section-text">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageTextSection;
