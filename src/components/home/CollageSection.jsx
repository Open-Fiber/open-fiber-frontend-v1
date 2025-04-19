import React from "react";
import "./styles/collagesection.css";

const CollageSection = () => {
  return (
    <div className="collage-section">
      <div className="collage-layout">
        {/* Left side - Title and CTA */}
        <div className="collage-left">
          <div className="collage-title">
            <h2>
              <span className="highlight">CONSTRUYE +</span>
              <br />
              CON NOSOTROS
            </h2>
          </div>
          <div className="cta-button">
            <button>
              <span className="highlight">CONSTRUYE +</span>
            </button>
          </div>
        </div>

        {/* Right side - Images */}
        <div className="collage-right">
          <div className="framed-image img-1">
            <div className="frame">
              <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZCgsof-xTfwf5ceQFbo_6Za2cipCKBwzAm_-WUe9e4qnMdJLYj6o_fGNjyIUy9SNwW1_eaHl9xppz1yK2s10yjfgVqzye56N3ymHXZ8QlRIjzInX8Ub_y3bdAQXXiM9eg90UDYcTiyA/w1200-h630-p-k-no-nu/46288541711_a9d63f559d_k.jpg" />
            </div>
          </div>

          <div className="framed-image img-2">
            <div className="frame">
              <img src="https://www.undp.org/sites/g/files/zskgke326/files/2023-09/f31fq8_wsaaxzye.jpeg" />
            </div>
          </div>

          <div className="framed-image img-3">
            <div className="frame">
              <img
                src="https://i.ytimg.com/vi/021FKrbC82k/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgWigRMA8=&rs=AOn4CLBLG-FbxKUSHSPsfDzHGsMcQaMO2g"
                alt="Buddha statue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollageSection;
