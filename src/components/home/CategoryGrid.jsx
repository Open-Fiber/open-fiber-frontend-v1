import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { animate, stagger } from "animejs";
import {
  FaHistory,
  FaTools,
  FaGraduationCap,
  FaCode,
  FaArrowRight,
  FaPlay,
} from "react-icons/fa";
import "./styles/categorygrid.css";

const CategoryGrid = () => {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  const [hoveredCard, setHoveredCard] = useState(null);

  //  categories with more detailed information
  const categories = [
    {
      id: 1,
      title: "Historia",
      subtitle: "Nuestros Orígenes",
      description:
        "Descubre cómo nació Open Fiber y la historia detrás de nuestra misión sostenible",
      imageUrl:
        "src/assets/people/people5.jpg",
      icon: FaHistory,
      route: "/nosotros",
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 2,
      title: "Construye",
      subtitle: "Crea Soluciones",
      description:
        "Explora proyectos de la comunidad y contribuye con tus propias innovaciones",
      imageUrl:
        "src/assets/machine/machine7.jpg",
      icon: FaTools,
      route: "/construye",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
    },
    {
      id: 3,
      title: "Aprende",
      subtitle: "Conocimiento Abierto",
      description:
        "Accede a cursos, tutoriales y recursos para dominar las tecnologías sostenibles",
      imageUrl:
        "src/assets/people/people2.jpg",
      icon: FaGraduationCap,
      route: "/aprende",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10",
    },
    {
      id: 4,
      title: "Hackea",
      subtitle: "Innovación Digital",
      description:
        "Únete a la comunidad de desarrolladores creando el futuro de la sostenibilidad",
      imageUrl:
        "src/assets/machine/machine4.jpg",
      icon: FaCode,
      route: "/comunidad",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-500/10",
    },
  ];

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const grid = gridRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current;

    // Set initial states
    animate([title, subtitle], {
      opacity: 0,
      translateY: 40,
      duration: 0,
    });

    animate(cards, {
      opacity: 0,
      translateY: 60,
      scale: 0.9,
      duration: 0,
    });

    // Create intersection observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Title animations
            animate(title, {
              opacity: 1,
              translateY: 0,
              duration: 800,
              ease: "outExpo",
            });

            animate(subtitle, {
              opacity: 1,
              translateY: 0,
              duration: 800,
              delay: 200,
              ease: "outExpo",
            });

            // Cards entrance animation
            animate(cards, {
              opacity: 1,
              translateY: 0,
              scale: 1,
              duration: 1000,
              delay: stagger(150, { from: "center" }),
              ease: "outBack",
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (grid) {
      observer.observe(grid);
    }

    return () => {
      if (grid) {
        observer.unobserve(grid);
      }
    };
  }, []);

  const handleCardClick = (route) => {
    navigate(route);
  };

  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section ref={gridRef} className="category-grid-section">
      {/* Background Elements */}
      <div className="category-background">
        <div className="floating-elements">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`floating-element element-${i}`}></div>
          ))}
        </div>
      </div>

      <div className="category-container">
        {/* Section Header */}
        <div className="category-header">
          <h2 ref={titleRef} className="category-main-title">
            Explora Nuestro Ecosistema
          </h2>
          <p ref={subtitleRef} className="category-subtitle">
            Descubre las diferentes formas de contribuir a un futuro más
            sostenible
          </p>
        </div>

        {/*  Grid */}
        <div className="category-grid">
          {categories.map((category, index) => {
            const IconComponent = category.icon;

            return (
              <div
                key={category.id}
                ref={addToCardsRef}
                className={`category-card ${
                  hoveredCard === category.id ? "hovered" : ""
                }`}
                onClick={() => handleCardClick(category.route)}
                onMouseEnter={() => handleCardHover(category.id)}
                onMouseLeave={handleCardLeave}
                style={{ "--delay": `${index * 150}ms` }}
              >
                {/* Card Background Image */}
                <div className="card-background">
                  <img src={category.imageUrl} alt={category.title} />
                  <div className="card-overlay"></div>
                </div>

                {/* Floating Icon */}
                <div className={`floating-icon ${category.bgColor}`}>
                  <IconComponent />
                </div>

                {/* Card Content with Slide-up Interaction */}
                <div className="card-content">
                  {/* Always visible title */}
                  <div className="card-header">
                    <h3 className="card-title">{category.title}</h3>
                    <span className="card-subtitle">{category.subtitle}</span>
                  </div>

                  {/* Hidden content that slides up on hover */}
                  <div className="card-details">
                    <p className="card-description">{category.description}</p>

                    <div className="card-action">
                      <span className="action-text">Explorar</span>
                      <div className="action-icon">
                        <FaArrowRight />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effects */}
                <div className="card-effects">
                  <div className="shimmer-effect"></div>
                  <div className="glow-effect"></div>
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
          })}
        </div>

        {/* Call to Action */}
        <div className="category-cta">
          <p>¿Listo para comenzar tu viaje sostenible?</p>
          <button
            className="cta-button-category"
            onClick={() => navigate("/construye")}
          >
            <FaPlay className="cta-icon" />
            <span>Comenzar Ahora</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
