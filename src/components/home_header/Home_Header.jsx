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
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const configRef = useRef({
    particleDensity: 2,
    particleSizeMultiplier: 1 / 45,
    gravity: 0.08,
    friction: 0.98,
    bounce: 0.7,
    returnSpeed: 0.08,
    formationDelay: 2500, // More time for formation
    holdDuration: 3000,
    fallingDuration: 4000,
    nextPhraseDelay: 800,
  });

  // Sophisticated phrases related to Open Fiber project
  const phrases = [
    "Construyendo el futuro<br>sostenible",
    "Tejiendo redes de<br>colaboración",
    "Transformando plástico<br>en posibilidades",
    "Innovación abierta,<br>impacto global",
    "Makers unidos por<br>un mundo mejor",
    "Tecnología ancestral,<br>visión moderna",
    "Creando fibras,<br>construyendo comunidad",
    "Del desperdicio<br>a la innovación",
  ];

  const subtitle = "Donde la tradición se encuentra con la tecnología";

  // Particle class
  class Particle {
    constructor(x, y, color, size) {
      this.x = x;
      this.y = y;
      this.originalX = x;
      this.originalY = y;
      // Start particles from random positions within canvas bounds
      this.currentX =
        Math.random() * (canvasRef.current?.width || window.innerWidth);
      this.currentY =
        (canvasRef.current?.height || window.innerHeight) + Math.random() * 100;
      this.targetX = x;
      this.targetY = y;
      this.color = color;
      this.size = size;
      this.velocity = {
        x: (Math.random() - 0.5) * 3,
        y: Math.random() * -2,
      };
      this.opacity = 1;
      this.phase = "forming";
      this.active = false;
      this.formationDelay = Math.random() * 800; // Staggered start times
      this.formationSpeed = 0.04 + Math.random() * 0.02; // Varied formation speeds
    }

    update(timestamp, phase, canvas) {
      this.phase = phase;

      if (phase === "forming") {
        if (!this.active && timestamp > this.formationDelay) {
          this.active = true;
        }

        if (this.active) {
          // Move towards target position with slower, varied speed
          const dx = this.targetX - this.currentX;
          const dy = this.targetY - this.currentY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 1) {
            this.currentX += dx * this.formationSpeed;
            this.currentY += dy * this.formationSpeed;
          } else {
            this.currentX = this.targetX;
            this.currentY = this.targetY;
          }
        }
      } else if (phase === "holding") {
        // Stay in position with slight floating
        this.currentX = this.targetX + Math.sin(timestamp * 0.003) * 0.5;
        this.currentY = this.targetY + Math.cos(timestamp * 0.002) * 0.3;
      } else if (phase === "falling") {
        // Add initial falling velocity if just starting to fall
        if (this.phase !== "falling") {
          this.velocity.x = (Math.random() - 0.5) * 2;
          this.velocity.y = Math.random() * 0.5;
        }

        // Apply gravity and physics
        this.velocity.y += configRef.current.gravity;
        this.velocity.x *= configRef.current.friction;

        this.currentX += this.velocity.x;
        this.currentY += this.velocity.y;

        // Bounce off bottom
        if (this.currentY + this.size > canvas.height) {
          this.currentY = canvas.height - this.size;
          this.velocity.y *= -configRef.current.bounce;
          this.velocity.x += (Math.random() - 0.5) * 1.5;
          this.size *= 0.99; // Slightly reduce size on impact
        }

        // Bounce off sides
        if (this.currentX + this.size > canvas.width) {
          this.currentX = canvas.width - this.size;
          this.velocity.x *= -configRef.current.bounce;
        } else if (this.currentX - this.size < 0) {
          this.currentX = this.size;
          this.velocity.x *= -configRef.current.bounce;
        }
      }
    }

    draw(ctx) {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.currentX, this.currentY, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Create particles from text
  const createParticles = (text) => {
    const canvas = canvasRef.current;
    const textElement = textRef.current;
    if (!canvas || !textElement) return [];

    const particles = [];
    const canvasRect = canvas.getBoundingClientRect();
    const textRect = textElement.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(textElement);
    const fontSize = parseInt(computedStyle.fontSize);
    const particleSize = fontSize * configRef.current.particleSizeMultiplier;

    // Create temporary canvas
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = textRect.width;
    tempCanvas.height = textRect.height;

    // Apply text styling
    const fontWeight = computedStyle.fontWeight;
    const fontFamily = computedStyle.fontFamily;
    const lineHeight = fontSize * 1.3; // Line height multiplier

    tempCtx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    tempCtx.fillStyle = "#ffffff";
    tempCtx.textAlign = "center";
    tempCtx.textBaseline = "middle";

    // Split text by <br> tags and draw each line
    const lines = text.replace(/<br>/g, "\n").split("\n");
    const totalHeight = lines.length * lineHeight;
    const startY = (tempCanvas.height - totalHeight) / 2 + lineHeight / 2;

    lines.forEach((line, index) => {
      const y = startY + index * lineHeight;
      tempCtx.fillText(line.trim(), tempCanvas.width / 2, y);
    });

    // Get pixel data
    const imageData = tempCtx.getImageData(
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );
    const data = imageData.data;

    // Calculate positions relative to canvas, not viewport
    const offsetX = textRect.left - canvasRect.left;
    const offsetY = textRect.top - canvasRect.top;

    // Create particles from pixels
    for (
      let y = 0;
      y < tempCanvas.height;
      y += configRef.current.particleDensity
    ) {
      for (
        let x = 0;
        x < tempCanvas.width;
        x += configRef.current.particleDensity
      ) {
        const index = (y * tempCanvas.width + x) * 4;
        const alpha = data[index + 3];

        if (alpha > 100) {
          const canvasX = offsetX + x;
          const canvasY = offsetY + y;

          particles.push(
            new Particle(canvasX, canvasY, "#ffffff", particleSize)
          );
        }
      }
    }

    return particles;
  };

  // Animation cycle
  const startSandAnimation = (phraseIndex) => {
    const phrase = phrases[phraseIndex];
    if (!textRef.current) return;

    // Update text content with HTML (br tags)
    textRef.current.innerHTML = phrase;
    textRef.current.style.opacity = "0";

    // Show subtitle
    if (subtitleRef.current) {
      subtitleRef.current.style.opacity = "1";
    }

    // Create new particles
    particlesRef.current = createParticles(phrase);

    let startTime = performance.now();
    let phase = "forming";

    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx) return;

      // Update phase based on elapsed time
      if (
        elapsed >
        configRef.current.formationDelay +
          configRef.current.holdDuration +
          configRef.current.fallingDuration
      ) {
        // Cycle complete, start next phrase
        const nextIndex = (phraseIndex + 1) % phrases.length;
        setCurrentPhraseIndex(nextIndex);
        setTimeout(
          () => startSandAnimation(nextIndex),
          configRef.current.nextPhraseDelay
        );
        return;
      } else if (
        elapsed >
        configRef.current.formationDelay + configRef.current.holdDuration
      ) {
        phase = "falling";
      } else if (elapsed > configRef.current.formationDelay) {
        phase = "holding";
      } else {
        phase = "forming";
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update(timestamp, phase, canvas);
        particle.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Setup canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const heroSection = canvas.parentElement;
      if (heroSection) {
        canvas.width = heroSection.clientWidth;
        canvas.height = heroSection.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Start animation after delay
    const timer = setTimeout(() => {
      startSandAnimation(0);
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(timer);
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
        <div className="logo-container">
          <span className="logo-text">Open Fiber</span>
        </div>

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

          <span
            className="bar"
            style={{
              left: `${barPosition.left}px`,
              width: `${barPosition.width}px`,
            }}
          ></span>
        </nav>

        <div className="profile-container">
          <div className="profile-icon" onClick={toggleDropdown}>
            <FaRegCircleUser className="icon" />
          </div>

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

      <div className="hero-section">
        <div className="hero-content">
          <div className="text-container">
            <h1 className="animated-title" ref={textRef}></h1>
            <p className="animated-subtitle" ref={subtitleRef}>
              {subtitle}
            </p>
          </div>
        </div>
        <canvas ref={canvasRef} className="sand-canvas"></canvas>
      </div>
    </>
  );
};

export default Home_Header;
