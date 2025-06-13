// src/components/home_header/Home_Header.jsx
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import "./home_header.css";

const Home_Header = () => {
  const [barPosition, setBarPosition] = useState({ left: 0, width: 0 });
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const navRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);

  // Sophisticated phrases related to Open Fiber project
  const phrases = [
    "Construyendo el futuro sostenible",
    "Tejiendo redes de colaboración",
    "Transformando plástico en posibilidades",
    "Innovación abierta, impacto global",
    "Makers unidos por un mundo mejor",
    "Tecnología ancestral, visión moderna",
    "Creando fibras, construyendo comunidad",
    "Del desperdicio a la innovación",
  ];

  const subtitle = "Donde la tradición se encuentra con la tecnología";

  useEffect(() => {
    const initAnimations = async () => {
      // Dynamically import anime.js V4
      const { animate, createTimeline, stagger, utils } = await import(
        "animejs"
      );

      // Setup smooth scrolling
      document.documentElement.style.scrollBehavior = "smooth";

      const animatePhrase = (phraseIndex) => {
        const currentPhrase = phrases[phraseIndex];

        // Clear current text
        if (textRef.current) {
          textRef.current.innerHTML = "";

          // Create spans for each character
          currentPhrase.split("").forEach((char, index) => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            span.style.opacity = "0";
            span.style.transform = "translateY(30px) rotateX(-90deg)";
            span.className = "char";
            textRef.current.appendChild(span);
          });
        }

        // Create timeline for character animations
        const tl = createTimeline({
          defaults: {
            duration: 800,
            ease: "outBack",
          },
        });

        // Animate characters appearing with stagger
        tl.add(".char", {
          opacity: {
            to: 1,
            duration: 600,
          },
          translateY: {
            to: 0,
            ease: "outCubic",
          },
          rotateX: {
            to: 0,
            ease: "outBack",
          },
          delay: stagger(50, {
            from: "center",
            start: 200,
          }),
        });

        // Add subtitle animation
        tl.add(
          subtitleRef.current,
          {
            opacity: {
              to: 1,
              duration: 1000,
            },
            translateY: {
              from: 20,
              to: 0,
            },
            letterSpacing: {
              from: "0.2em",
              to: "0.05em",
              duration: 1200,
            },
          },
          "-=400"
        );

        // Hold the phrase for reading time
        tl.add({
          duration: 3000,
        });

        // Animate characters disappearing with stagger
        tl.add(".char", {
          opacity: {
            to: 0,
            duration: 400,
          },
          translateY: {
            to: -20,
            ease: "inCubic",
          },
          rotateX: {
            to: 90,
            ease: "inBack",
          },
          scale: {
            to: 0.8,
            ease: "inBack",
          },
          delay: stagger(30, {
            from: "last",
            start: 0,
          }),
        });

        // Fade out subtitle
        tl.add(
          subtitleRef.current,
          {
            opacity: {
              to: 0,
              duration: 600,
            },
            translateY: {
              to: -10,
            },
          },
          "-=800"
        );

        // When animation completes, move to next phrase
        tl.then(() => {
          const nextIndex = (phraseIndex + 1) % phrases.length;
          setCurrentPhraseIndex(nextIndex);
          setTimeout(() => animatePhrase(nextIndex), 500);
        });
      };

      // Start the animation cycle
      setTimeout(() => animatePhrase(0), 1000);

      // Animate header elements on load
      animate(".header", {
        opacity: {
          from: 0,
          to: 1,
          duration: 1200,
        },
        translateY: {
          from: -50,
          to: 0,
          duration: 1000,
          ease: "outCubic",
        },
      });

      animate(".nav-link", {
        opacity: {
          from: 0,
          to: 1,
        },
        translateY: {
          from: -20,
          to: 0,
        },
        delay: stagger(100, { start: 800 }),
        duration: 800,
        ease: "outCubic",
      });

      animate(".logo-text", {
        scale: {
          from: 0.8,
          to: 1,
          duration: 1000,
          ease: "outBack",
        },
        opacity: {
          from: 0,
          to: 1,
          duration: 800,
        },
      });
    };

    initAnimations();

    // Cleanup function
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const handleHover = (e) => {
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = e.target.getBoundingClientRect();
    setBarPosition({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="logo-container">
          <span className="logo-text">Open Fiber</span>
        </div>

        {/* Navegación */}
        <nav className="nav" ref={navRef}>
          <Link to="/nosotros" className="nav-link" onMouseEnter={handleHover}>
            NOSOTROS
          </Link>
          <Link to="/aprende" className="nav-link" onMouseEnter={handleHover}>
            APRENDE +
          </Link>
          <Link to="/construye" className="nav-link" onMouseEnter={handleHover}>
            CONSTRUYE
          </Link>
          <Link to="/comunidad" className="nav-link" onMouseEnter={handleHover}>
            COMUNIDAD
          </Link>
          <Link to="/contacto" className="nav-link" onMouseEnter={handleHover}>
            CONTACTO
          </Link>

          {/* Barra dinámica */}
          <span
            className="bar"
            style={{
              left: `${barPosition.left}px`,
              width: `${barPosition.width}px`,
            }}
          ></span>
        </nav>

        {/* Icono de perfil con dropdown */}
        <div className="profile-container">
          <div className="profile-icon" onClick={toggleDropdown}>
            <FaRegCircleUser className="icon" />
          </div>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="profile-dropdown">
              <Link to="/login" className="dropdown-item">
                Iniciar sesión
              </Link>
              <Link to="/register" className="dropdown-item">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Animated Text Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="text-container">
            <h1 className="animated-title" ref={textRef}></h1>
            <p className="animated-subtitle" ref={subtitleRef}>
              {subtitle}
            </p>
          </div>

          {/* Decorative elements */}
          <div className="hero-decorations">
            <div className="fiber-strand strand-1"></div>
            <div className="fiber-strand strand-2"></div>
            <div className="fiber-strand strand-3"></div>
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home_Header;
