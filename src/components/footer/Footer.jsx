import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowUp,
  FaHeart,
  FaRocket,
} from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  const footerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;

    // Set initial states for animation
    const sections = footer.querySelectorAll(".footer-section");
    const socialIcons = footer.querySelectorAll(".social-icon");
    const bottomBar = footer.querySelector(".footer-bottom");

    animate(sections, {
      opacity: 0,
      translateY: 40,
      duration: 0,
    });

    animate(socialIcons, {
      scale: 0,
      rotate: -180,
      duration: 0,
    });

    animate(bottomBar, {
      opacity: 0,
      translateY: 20,
      duration: 0,
    });

    // Intersection Observer for scroll-triggered animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate sections
            animate(sections, {
              opacity: 1,
              translateY: 0,
              duration: 1000,
              delay: stagger(150),
              ease: "outExpo",
            });

            // Animate social icons
            animate(socialIcons, {
              scale: 1,
              rotate: 0,
              duration: 800,
              delay: stagger(100, { from: "center" }),
              ease: "outBack",
            });

            // Animate bottom bar
            animate(bottomBar, {
              opacity: 1,
              translateY: 0,
              duration: 800,
              delay: 600,
              ease: "outCirc",
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (footer) {
      observer.observe(footer);
    }

    // Scroll to top button visibility
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (footer) observer.unobserve(footer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSocialClick = (platform) => {
    // Add your social media links here
    const links = {
      github: "https://github.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    };

    window.open(links[platform], "_blank");
  };

  return (
    <footer ref={footerRef} className="footer">
      {/* Background Elements */}
      <div className="footer-background">
        <div className="bg-gradient"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i}`}></div>
          ))}
        </div>
      </div>

      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Info Section */}
          <div className="footer-section company-info">
            <div className="company-logo">
              <h3>Open Fiber</h3>
              <FaRocket className="logo-icon" />
            </div>
            <p className="company-description">
              Uniendo saberes ancestrales y tecnologías abiertas para
              transformar botellas plásticas en fibras reutilizables.
              Construyendo un futuro más sostenible juntos.
            </p>
            <div className="social-links">
              <button
                className="social-icon github"
                onClick={() => handleSocialClick("github")}
                aria-label="GitHub"
              >
                <FaGithub />
              </button>
              <button
                className="social-icon twitter"
                onClick={() => handleSocialClick("twitter")}
                aria-label="Twitter"
              >
                <FaTwitter />
              </button>
              <button
                className="social-icon linkedin"
                onClick={() => handleSocialClick("linkedin")}
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </button>
              <button
                className="social-icon instagram"
                onClick={() => handleSocialClick("instagram")}
                aria-label="Instagram"
              >
                <FaInstagram />
              </button>
              <button
                className="social-icon youtube"
                onClick={() => handleSocialClick("youtube")}
                aria-label="YouTube"
              >
                <FaYoutube />
              </button>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section quick-links">
            <h4>Explora</h4>
            <ul>
              <li>
                <Link to="/nosotros">Nosotros</Link>
              </li>
              <li>
                <Link to="/aprende">Aprende +</Link>
              </li>
              <li>
                <Link to="/construye">Construye</Link>
              </li>
              <li>
                <Link to="/comunidad">Comunidad</Link>
              </li>
              <li>
                <Link to="/my-machines">Mis Máquinas</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section contact">
            <h4>Contacto</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>hello@openfiber.org</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+591 (XXX) XXX-XXXX</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>La Paz, Bolivia</span>
              </div>
            </div>
          </div>

          {/* Resources Section */}

          {/* Newsletter Section */}
          <div className="footer-section newsletter">
            <h4>Newsletter</h4>
            <p>Mantente al día con las últimas innovaciones</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="newsletter-input"
                />
                <button
                  type="submit"
                  className={`newsletter-btn ${
                    isSubscribed ? "subscribed" : ""
                  }`}
                  disabled={isSubscribed}
                >
                  {isSubscribed ? "¡Suscrito!" : "Suscribirse"}
                </button>
              </div>
            </form>
            {isSubscribed && (
              <p className="success-message">¡Gracias por suscribirte! 🎉</p>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <span>© 2025 Open Fiber. Diseñado con </span>
              <FaHeart className="heart-icon" />
              <span> por CDS</span>
            </div>
            <div className="footer-links"></div>
            <div className="powered-by">
              <span>Powered by CDS Organization</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Volver arriba"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
