import { useState, useEffect, useRef, useMemo } from "react";
import { animate, stagger } from "animejs";
import { FaFilter, FaSearch, FaSortAmountDown } from "react-icons/fa";
import Card_Machine from "../../components/cards/card_machine/Card_Machine";
import { cardData } from "../../utils/mock/construyeMock";
import "../../styles/pages/construye/construye.css";
import CreateMachineModal from "../../components/modals/CreateMachineModal";

const Construye = () => {
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: "all",
    category: "all",
    origin: "all",
    sortBy: "votes",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const heroRef = useRef(null);
  const controlsRef = useRef(null);
  const cardsRef = useRef([]);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Filter and sort data with memoization for performance
  const filteredData = useMemo(() => {
    return cardData
      .filter((item) => {
        if (
          filters.difficulty !== "all" &&
          item.difficulty !== filters.difficulty
        )
          return false;
        if (filters.category !== "all" && item.category !== filters.category)
          return false;
        if (filters.origin !== "all" && item.pais !== filters.origin)
          return false;
        if (
          searchTerm &&
          !item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "votes":
            return b.likes - a.likes;
          case "recent":
            return b.createdAt - a.createdAt;
          case "oldest":
            return a.createdAt - b.createdAt;
          default:
            return 0;
        }
      });
  }, [filters, searchTerm]);

  // Animation effects
  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const hero = heroRef.current;
    const controls = controlsRef.current;

    // Set initial states
    animate([title, hero, controls], {
      opacity: 0,
      translateY: 20,
      duration: 0,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Entrance animations
            animate(title, {
              opacity: 1,
              translateY: 0,
              duration: 600,
              ease: "outExpo",
            });

            animate(hero, {
              opacity: 1,
              translateY: 0,
              duration: 700,
              delay: 150,
              ease: "outBack",
            });

            animate(controls, {
              opacity: 1,
              translateY: 0,
              duration: 600,
              delay: 300,
              ease: "outCirc",
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (container) observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, []);

  // Cards animation when data changes
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      animate(cardsRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.95, 1],
        duration: 600,
        delay: stagger(50, { from: "center" }),
        ease: "outBack",
      });
    }
  }, [filters, searchTerm]);

  return (
    <div ref={containerRef} className="construye-container">
      <CreateMachineModal show={showModal} onClose={() => setShowModal(false)} />
      {/* Background Elements */}
      <div className="construye-background">
        <div className="floating-elements">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`floating-element element-${i}`}></div>
          ))}
        </div>
      </div>

      {/* Header Section 
       <div className="construye-header">
        <h1 ref={titleRef} className="construye-title">
          Colabora, <span className="highlight">Crea</span>, Transforma
        </h1>
        <p className="construye-subtitle">
          Descubre máquinas y aplicaciones creadas por la comunidad global de
          makers
        </p>
      </div>*/}

      {/* Hero Image 
      <div ref={heroRef} className="hero-image-section">
        <div className="hero-image-container">
          <img
            src="public/page/cover/construye/construye1.png"
            alt="Colaboración creativa"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h3>Innovación Colaborativa</h3>
            <p>Máquinas de código abierto para un futuro sostenible</p>
          </div>
        </div>
      </div>*/}

      {/* Title and Filters */}
      <div ref={controlsRef} className="construye-controls">
        <div className="section-title-construye">
          <h2>Máquinas Hackeadas</h2>
          <button className="btn-create-machine-construye" onClick={() => setShowModal(true)}>Crear maquina</button>
        </div>

        {/* Search and Filters */}
        <div className="filters-section">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <FaFilter className="filter-icon" />
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="filter-select"
              >
                <option value="all">Todas las categorías</option>
                <option value="Electronica">Electrónica</option>
                <option value="Mecanica">Mecánica</option>
                <option value="Estetica">Estética</option>
              </select>
            </div>

            <div className="filter-group">
              <select
                value={filters.difficulty}
                onChange={(e) =>
                  handleFilterChange("difficulty", e.target.value)
                }
                className="filter-select"
              >
                <option value="all">Todas las dificultades</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>

            <div className="filter-group">
              <select
                value={filters.origin}
                onChange={(e) => handleFilterChange("origin", e.target.value)}
                className="filter-select"
              >
                <option value="all">Todos los países</option>
                <option value="BO">Bolivia</option>
                <option value="AR">Argentina</option>
                <option value="PE">Perú</option>
                <option value="CL">Chile</option>
                <option value="CO">Colombia</option>
              </select>
            </div>

            <div className="filter-group">
              <FaSortAmountDown className="filter-icon" />
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="filter-select"
              >
                <option value="votes">Más Votados</option>
                <option value="recent">Más Recientes</option>
                <option value="oldest">Más Antiguos</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="cards-grid">
        {filteredData.map((item) => (
          <div key={item.id} ref={addToCardsRef} className="card-wrapper">
            <Card_Machine {...item} />
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="no-results">
          <div className="no-results-content">
            <span className="no-results-icon">🔍</span>
            <h3>No se encontraron resultados</h3>
            <p>Intenta ajustar los filtros o términos de búsqueda</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Construye;
