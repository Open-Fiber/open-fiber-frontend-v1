import React from "react";
import "../../styles/components/footer/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-left">Ⓒ Designed By Maru</span>

        <nav className="footer-center">
          <p href="#construye">Construye</p>
          <p href="#crea">Crea</p>
          <p href="#hackea">Hackea</p>
          <p href="#diseña">Diseña</p>
        </nav>

        <span className="footer-right">Powered by CDS</span>
      </div>
    </footer>
  );
};

export default Footer;
