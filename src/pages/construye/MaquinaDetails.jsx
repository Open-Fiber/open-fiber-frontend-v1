import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { animate, stagger } from "animejs";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaWeight,
  FaRulerVertical,
  FaCogs,
  FaClock,
  FaHeart,
  FaShare,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaThumbsUp,
  FaComment,
} from "react-icons/fa";
import Card_Machine from "../../components/cards/card_machine/Card_Machine";
import machine1 from "../../assets/machine/machine1.jpeg";
import machine2 from "../../assets/machine/machine2.jpeg";
import machine3 from "../../assets/machine/machine3.jpeg";
import { IoCheckmarkCircle, IoSend } from "react-icons/io5";
import CreateHackedMachineModal from '../../components/modals/CreateHackedMachineModal';
import "../../styles/pages/construye/maquinadetails.css";

const MaquinaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("detalles");
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(247);

  const [showModal, setShowModal] = useState(false);

  // Refs for animations
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);
  const sectionsRef = useRef([]);

  // Mock data - in real app this would come from API
  const machineData = {
    id: id,
    nombre: "Arakuaa - Extrusora de Filamento PET",
    descripcion:
      "Máquina revolucionaria que transforma botellas PET en filamento 3D de alta calidad. Diseñada con tecnología abierta y principios de economía circular.",
    proposito:
      "Transformar residuos plásticos en material útil para impresión 3D",
    fechaCreacion: "2024-02-15",
    creador: {
      nombre: "Ana María Gonzales",
      pais: "BO",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b72b4a3d?w=150&h=150&fit=crop&crop=face",
    },
    especificaciones: {
      peso: "12.5 kg",
      altura: "85 cm",
      componentes: 47,
      potencia: "220V - 50Hz",
      capacidad: "2-3 kg/hora",
    },
    construccion: {
      tiempoEstimado: "15-20 horas",
      dificultad: "Intermedio",
      pasos: [
        {
          titulo: "Preparación del bastidor",
          descripcion: "Cortar y ensamblar la estructura principal de aluminio",
          imagen:
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
          tiempo: "3 horas",
        },
        {
          titulo: "Instalación del motor",
          descripcion:
            "Montar el motor paso a paso y configurar la transmisión",
          imagen:
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
          tiempo: "2 horas",
        },
        {
          titulo: "Sistema de calefacción",
          descripcion: "Instalar resistencias y sensores de temperatura",
          imagen:
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
          tiempo: "4 horas",
        },
        {
          titulo: "Calibración final",
          descripcion:
            "Ajustar parámetros y realizar pruebas de funcionamiento",
          imagen:
            "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&h=300&fit=crop",
          tiempo: "2 horas",
        },
      ],
    },
    aplicaciones: [
      {
        id: 1,
        nombre: "Filamento para impresión 3D",
        descripcion:
          "Producción de filamento PLA a partir de botellas PET recicladas",
        creador: "Ana María Gonzales",
        tipo: "Principal",
      },
      {
        id: 2,
        nombre: "Fibras para textiles",
        descripcion: "Creación de fibras para la industria textil sostenible",
        creador: "Carlos Rodriguez",
        tipo: "Alternativa",
      },
      {
        id: 3,
        nombre: "Material para moldes",
        descripcion: "Producción de material termoplástico para moldeado",
        creador: "María Torres",
        tipo: "Experimental",
      },
    ],
    imagenes: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585435557343-3b092031d4c1?w=800&h=600&fit=crop",
    ],
    /* Hackeados */
    hackeados : [
      {
        id: 1,
        nombre: "PET Bottle Shredder v2.1",
        descripcion:
          "Máquina trituradora de botellas PET para reciclaje automatizado con control por Arduino",
        pais: "BO",
        likes: 127,
        difficulty: "Intermedio",
        category: "Mecanica",
        createdAt: new Date(2024, 10, 15),
        image: machine1,
        tags: ["PET", "Reciclaje", "Automatización", "Arduino"],
        author: "Carlos Mendoza",
      },
      {
        id: 2,
        nombre: "Extrusora de Filamento 3D",
        descripcion:
          "Sistema de extrusión para fabricar filamento 3D reciclado con sensores y control PID",
        pais: "AR",
        likes: 89,
        difficulty: "Avanzado",
        category: "Electronica",
        createdAt: new Date(2024, 9, 3),
        image: machine2,
        tags: ["3D Print", "Extrusión", "PID", "Sensores"],
        author: "María González",
      },
      {
        id: 3,
        nombre: "Prensa Hidráulica para Ladrillos Ecológicos",
        descripcion:
          "Prensa hidráulica manual para fabricar ladrillos ecológicos usando materiales sostenibles",
        pais: "PE",
        likes: 156,
        difficulty: "Principiante",
        category: "Mecanica",
        createdAt: new Date(2024, 8, 22),
        image: machine3,
        tags: ["Construcción", "Ecológico", "Hidráulica", "DIY"],
        author: "Jorge Ramirez",
      },
      {
        id: 4,
        nombre: "PET Bottle Shredder v2.1",
        descripcion:
          "Máquina trituradora de botellas PET para reciclaje automatizado con control por Arduino",
        pais: "BO",
        likes: 127,
        difficulty: "Intermedio",
        category: "Mecanica",
        createdAt: new Date(2024, 10, 15),
        image: machine1,
        tags: ["PET", "Reciclaje", "Automatización", "Arduino"],
        author: "Carlos Mendoza",
      },
      {
        id: 5,
        nombre: "Extrusora de Filamento 3D",
        descripcion:
          "Sistema de extrusión para fabricar filamento 3D reciclado con sensores y control PID",
        pais: "AR",
        likes: 89,
        difficulty: "Avanzado",
        category: "Electronica",
        createdAt: new Date(2024, 9, 3),
        image: machine2,
        tags: ["3D Print", "Extrusión", "PID", "Sensores"],
        author: "María González",
      },
      {
        id: 6,
        nombre: "Prensa Hidráulica para Ladrillos Ecológicos",
        descripcion:
          "Prensa hidráulica manual para fabricar ladrillos ecológicos usando materiales sostenibles",
        pais: "PE",
        likes: 156,
        difficulty: "Principiante",
        category: "Mecanica",
        createdAt: new Date(2024, 8, 22),
        image: machine3,
        tags: ["Construcción", "Ecológico", "Hidráulica", "DIY"],
        author: "Jorge Ramirez",
      },
    ],
  };

  const addToSectionsRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };
  const cardsRef = useRef([]);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const carousel = carouselRef.current;
    const sections = sectionsRef.current;

    // Set initial states
    animate([header, carousel], {
      opacity: 0,
      translateY: 40,
      duration: 0,
    });

    animate(sections, {
      opacity: 0,
      translateY: 30,
      duration: 0,
    });

    // Entrance animations
    setTimeout(() => {
      animate(header, {
        opacity: 1,
        translateY: 0,
        duration: 800,
        ease: "outExpo",
      });

      animate(carousel, {
        opacity: 1,
        translateY: 0,
        duration: 800,
        delay: 200,
        ease: "outBack",
      });

      animate(sections, {
        opacity: 1,
        translateY: 0,
        duration: 600,
        delay: stagger(100, { start: 400 }),
        ease: "outCirc",
      });
    }, 100);
  }, []);

  const handleImageNavigation = (direction) => {
    if (direction === "next") {
      setActiveImageIndex((prev) =>
        prev === machineData.imagenes.length - 1 ? 0 : prev + 1
      );
    } else {
      setActiveImageIndex((prev) =>
        prev === 0 ? machineData.imagenes.length - 1 : prev - 1
      );
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };


  const renderSection = () => {
    switch (activeSection) {
      case "detalles":
        return (
          <div className="machine-details-details-content">
            {/* Professional Stats Bar */}
            <div className="machine-details-professional-stats">
              <div className="machine-details-stats-container">
                <div className="machine-details-stat-professional">
                  <div className="machine-details-stat-meta">
                    <FaCalendarAlt />
                    <span className="machine-details-stat-category">
                      Lanzamiento
                    </span>
                  </div>
                  <div className="machine-details-stat-data">
                    {new Date(machineData.fechaCreacion).toLocaleDateString(
                      "es-ES",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>

                <div className="machine-details-stat-divider"></div>

                <div className="machine-details-stat-professional">
                  <div className="machine-details-stat-meta">
                    <FaHeart />
                    <span className="machine-details-stat-category">
                      Popularidad
                    </span>
                  </div>
                  <div className="machine-details-stat-data">{likeCount}</div>
                </div>

                <div className="machine-details-stat-divider"></div>

                <div className="machine-details-stat-professional">
                  <div className="machine-details-stat-meta">
                    <FaDownload />
                    <span className="machine-details-stat-category">
                      Descargas
                    </span>
                  </div>
                  <div className="machine-details-stat-data">1,247</div>
                </div>

                <div className="machine-details-stat-divider"></div>

                <div className="machine-details-stat-professional machine-details-featured-stat">
                  <div className="machine-details-stat-meta">
                    <FaCogs />
                    <span className="machine-details-stat-category">
                      Complejidad
                    </span>
                  </div>
                  <div className="machine-details-stat-data">
                    {machineData.construccion.dificultad}
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="machine-details-specifications-table">
              <div className="machine-details-table-header">
                <h3>Especificaciones Técnicas</h3>
                <div className="machine-details-table-subtitle">
                  Características físicas y operativas del sistema
                </div>
              </div>

              <div className="machine-details-specs-table-container">
                <div className="machine-details-specs-table">
                  <div className="machine-details-table-section">
                    <div className="machine-details-section-header">
                      <span className="machine-details-section-title">
                        Dimensiones Físicas
                      </span>
                    </div>
                    <div className="machine-details-table-row">
                      <div className="machine-details-table-cell-label">
                        <FaWeight />
                        <span>Peso Total</span>
                      </div>
                      <div className="machine-details-table-cell-value">
                        {machineData.especificaciones.peso}
                      </div>
                    </div>
                    <div className="machine-details-table-row">
                      <div className="machine-details-table-cell-label">
                        <FaRulerVertical />
                        <span>Altura</span>
                      </div>
                      <div className="machine-details-table-cell-value">
                        {machineData.especificaciones.altura}
                      </div>
                    </div>
                    <div className="machine-details-table-row">
                      <div className="machine-details-table-cell-label">
                        <FaCogs />
                        <span>Componentes</span>
                      </div>
                      <div className="machine-details-table-cell-value">
                        {machineData.especificaciones.componentes} piezas
                      </div>
                    </div>
                  </div>

                  <div className="machine-details-table-section">
                    <div className="machine-details-section-header">
                      <span className="machine-details-section-title">
                        Rendimiento Operativo
                      </span>
                    </div>
                    <div className="machine-details-table-row">
                      <div className="machine-details-table-cell-label">
                        <span className="machine-details-table-icon">⚡</span>
                        <span>Alimentación</span>
                      </div>
                      <div className="machine-details-table-cell-value">
                        {machineData.especificaciones.potencia}
                      </div>
                    </div>
                    <div className="machine-details-table-row">
                      <div className="machine-details-table-cell-label">
                        <span className="machine-details-table-icon">📊</span>
                        <span>Capacidad</span>
                      </div>
                      <div className="machine-details-table-cell-value">
                        {machineData.especificaciones.capacidad}
                      </div>
                    </div>
                    <div className="machine-details-table-row">
                      <div className="machine-details-table-cell-label">
                        <FaClock />
                        <span>Tiempo Construcción</span>
                      </div>
                      <div className="machine-details-table-cell-value">
                        {machineData.construccion.tiempoEstimado}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Overview */}
            <div className="machine-details-project-overview">
              <div className="machine-details-overview-content">
                <div className="machine-details-overview-text">
                  <h3>Descripción del Proyecto</h3>
                  <p className="machine-details-overview-description">
                    {machineData.descripcion}
                  </p>
                </div>

                <div className="machine-details-overview-metrics">
                  <div className="machine-details-metric-card">
                    <div className="machine-details-metric-header">
                      <span className="machine-details-metric-label">
                        Eficiencia de Reciclaje
                      </span>
                    </div>
                    <div className="machine-details-metric-value">85%</div>
                    <div className="machine-details-metric-description">
                      Reducción de residuos
                    </div>
                  </div>

                  <div className="machine-details-metric-card">
                    <div className="machine-details-metric-header">
                      <span className="machine-details-metric-label">
                        Precisión de Extrusión
                      </span>
                    </div>
                    <div className="machine-details-metric-value">±0.02mm</div>
                    <div className="machine-details-metric-description">
                      Tolerancia dimensional
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features Grid */}
            <div className="machine-details-features-professional">
              <div className="machine-details-features-header">
                <h3>Características Principales</h3>
              </div>

              <div className="machine-details-features-grid">
                <div className="machine-details-feature-professional">
                  <div className="machine-details-feature-header">
                    <div className="machine-details-feature-icon-pro">🎯</div>
                    <h4>Objetivo Principal</h4>
                  </div>
                  <p>{machineData.proposito}</p>
                  <div className="machine-details-feature-tags">
                    <span className="machine-details-feature-tag">
                      Sostenibilidad
                    </span>
                    <span className="machine-details-feature-tag">
                      Reciclaje
                    </span>
                  </div>
                </div>

                <div className="machine-details-feature-professional">
                  <div className="machine-details-feature-header">
                    <div className="machine-details-feature-icon-pro">🌱</div>
                    <h4>Impacto Ambiental</h4>
                  </div>
                  <p>
                    Transforma residuos plásticos PET en filamento 3D de alta
                    calidad, reduciendo significativamente la huella ambiental.
                  </p>
                  <div className="machine-details-feature-tags">
                    <span className="machine-details-feature-tag">
                      Economía Circular
                    </span>
                    <span className="machine-details-feature-tag">
                      Zero Waste
                    </span>
                  </div>
                </div>

                <div className="machine-details-feature-professional">
                  <div className="machine-details-feature-header">
                    <div className="machine-details-feature-icon-pro">⚡</div>
                    <h4>Tecnología Abierta</h4>
                  </div>
                  <p>
                    Diseño open-source que democratiza el acceso a tecnología de
                    extrusión profesional para la comunidad maker.
                  </p>
                  <div className="machine-details-feature-tags">
                    <span className="machine-details-feature-tag">
                      Open Source
                    </span>
                    <span className="machine-details-feature-tag">
                      Community
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="machine-details-technical-details">
              <div className="machine-details-technical-grid-pro">
                <div className="machine-details-tech-panel">
                  <div className="machine-details-tech-panel-header">
                    <h4>Materiales Compatibles</h4>
                    <span className="machine-details-panel-badge">3 Tipos</span>
                  </div>
                  <div className="machine-details-tech-panel-content">
                    <div className="machine-details-material-list">
                      <div className="machine-details-material-item machine-details-primary-material">
                        <span className="machine-details-material-code">
                          PET
                        </span>
                        <span className="machine-details-material-name">
                          Polietileno Tereftalato
                        </span>
                        <span className="machine-details-material-status">
                          Óptimo
                        </span>
                      </div>
                      <div className="machine-details-material-item">
                        <span className="machine-details-material-code">
                          HDPE
                        </span>
                        <span className="machine-details-material-name">
                          Polietileno de Alta Densidad
                        </span>
                        <span className="machine-details-material-status">
                          Compatible
                        </span>
                      </div>
                      <div className="machine-details-material-item">
                        <span className="machine-details-material-code">
                          PP
                        </span>
                        <span className="machine-details-material-name">
                          Polipropileno
                        </span>
                        <span className="machine-details-material-status">
                          Experimental
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="machine-details-tech-panel">
                  <div className="machine-details-tech-panel-header">
                    <h4>Sistema de Control</h4>
                    <span className="machine-details-panel-badge">
                      Avanzado
                    </span>
                  </div>
                  <div className="machine-details-tech-panel-content">
                    <div className="machine-details-control-list">
                      <div className="machine-details-control-feature">
                        <span className="machine-details-control-indicator machine-details-active"></span>
                        <span className="machine-details-control-name">
                          Control PID de Temperatura
                        </span>
                      </div>
                      <div className="machine-details-control-feature">
                        <span className="machine-details-control-indicator machine-details-active"></span>
                        <span className="machine-details-control-name">
                          Monitoreo en Tiempo Real
                        </span>
                      </div>
                      <div className="machine-details-control-feature">
                        <span className="machine-details-control-indicator machine-details-active"></span>
                        <span className="machine-details-control-name">
                          Interfaz LCD Táctil
                        </span>
                      </div>
                      <div className="machine-details-control-feature">
                        <span className="machine-details-control-indicator machine-details-active"></span>
                        <span className="machine-details-control-name">
                          Sistema de Seguridad
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "construccion":
        return (
          <div className="machine-details-construction-content">
            {/* Construction Hero */}
            <div className="machine-details-construction-hero">
              <div className="machine-details-construction-hero-content">
                <div className="machine-details-construction-hero-text">
                  <h3>Guía de Construcción</h3>
                  <p>
                    Sigue este proceso paso a paso para construir tu propia
                    extrusora de filamento PET
                  </p>
                </div>

                <div className="machine-details-construction-stats">
                  <div className="machine-details-construction-stat">
                    <div className="machine-details-construction-stat-icon">
                      <FaClock />
                    </div>
                    <div className="machine-details-construction-stat-info">
                      <span className="machine-details-construction-stat-value">
                        {machineData.construccion.tiempoEstimado}
                      </span>
                      <span className="machine-details-construction-stat-label">
                        Tiempo Total
                      </span>
                    </div>
                  </div>

                  <div className="machine-details-construction-stat">
                    <div className="machine-details-construction-stat-icon">
                      <FaCogs />
                    </div>
                    <div className="machine-details-construction-stat-info">
                      <span className="machine-details-construction-stat-value">
                        {machineData.construccion.pasos.length}
                      </span>
                      <span className="machine-details-construction-stat-label">
                        Etapas
                      </span>
                    </div>
                  </div>

                  <div className="machine-details-construction-stat machine-details-featured">
                    <div className="machine-details-construction-stat-icon">
                      <FaUser />
                    </div>
                    <div className="machine-details-construction-stat-info">
                      <span className="machine-details-construction-stat-value">
                        {machineData.construccion.dificultad}
                      </span>
                      <span className="machine-details-construction-stat-label">
                        Nivel
                      </span>
                    </div>
                    <div className="machine-details-difficulty-accent"></div>
                  </div>
                </div>
              </div>

              <div className="machine-details-progress-overview">
                <div className="machine-details-progress-header">
                  <span>Progreso Estimado</span>
                </div>
                <div className="machine-details-progress-steps">
                  {machineData.construccion.pasos.map((_, index) => (
                    <div key={index} className="machine-details-progress-step">
                      <div className="machine-details-progress-step-dot"></div>
                      <span className="machine-details-progress-step-label">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Timeline */}
            <div className="machine-details-timeline-enhanced">
              <div className="machine-details-timeline-header">
                <h3>Proceso de Construcción</h3>
                <div className="machine-details-timeline-subtitle">
                  Cronograma detallado con recursos y herramientas
                </div>
              </div>

              <div className="machine-details-timeline-flow">
                {machineData.construccion.pasos.map((paso, index) => (
                  <div
                    key={index}
                    className="machine-details-timeline-step-enhanced"
                  >
                    <div className="machine-details-timeline-step-indicator">
                      <div className="machine-details-step-number-enhanced">
                        <span>{index + 1}</span>
                        <div className="machine-details-step-number-glow"></div>
                      </div>
                      {index < machineData.construccion.pasos.length - 1 && (
                        <div className="machine-details-timeline-connector-enhanced"></div>
                      )}
                    </div>

                    <div className="machine-details-timeline-step-card">
                      <div className="machine-details-step-card-header">
                        <div className="machine-details-step-title-section">
                          <h4>{paso.titulo}</h4>
                          <div className="machine-details-step-meta">
                            <div className="machine-details-step-duration-enhanced">
                              <FaClock />
                              <span>{paso.tiempo}</span>
                            </div>
                            <div className="machine-details-step-complexity">
                              <span className="machine-details-complexity-dot"></span>
                              <span>Intermedio</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="machine-details-step-card-body">
                        <div className="machine-details-step-visual-section">
                          <div className="machine-details-step-image-enhanced">
                            <img src={paso.imagen} alt={paso.titulo} />
                            <div className="machine-details-step-image-overlay">
                              <FaPlay />
                              <span>Ver Tutorial</span>
                            </div>
                          </div>
                        </div>

                        <div className="machine-details-step-info-section">
                          <div className="machine-details-step-description-enhanced">
                            <p>{paso.descripcion}</p>
                          </div>

                          <div className="machine-details-step-tools-enhanced">
                            <h5>🔧 Herramientas Requeridas</h5>
                            <div className="machine-details-tools-grid">
                              <div className="machine-details-tool-item">
                                <div className="machine-details-tool-icon">
                                  ⚡
                                </div>
                                <span>Soldadora</span>
                              </div>
                              <div className="machine-details-tool-item">
                                <div className="machine-details-tool-icon">
                                  🔩
                                </div>
                                <span>Taladro</span>
                              </div>
                              <div className="machine-details-tool-item">
                                <div className="machine-details-tool-icon">
                                  📐
                                </div>
                                <span>Lima</span>
                              </div>
                            </div>
                          </div>

                          <div className="machine-details-step-tips">
                            <div className="machine-details-tip-icon">💡</div>
                            <div className="machine-details-tip-content">
                              <strong>Consejo:</strong> Revisa dos veces las
                              medidas antes de hacer cortes permanentes.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Resources Section */}
            <div className="machine-details-resources-enhanced">
              <div className="machine-details-resources-header">
                <h3>Recursos de Construcción</h3>
                <p>Todo lo que necesitas para comenzar tu proyecto</p>
              </div>

              <div className="machine-details-resources-grid">
                <div className="machine-details-resource-card machine-details-primary-resource">
                  <div className="machine-details-resource-icon">
                    <div className="machine-details-resource-icon-inner">
                      📋
                    </div>
                    <div className="machine-details-resource-icon-glow"></div>
                  </div>
                  <div className="machine-details-resource-content">
                    <h4>Planos Técnicos</h4>
                    <p>
                      Diagramas CAD detallados con medidas precisas y
                      especificaciones completas
                    </p>
                    <div className="machine-details-resource-meta">
                      <span className="machine-details-resource-format">
                        PDF
                      </span>
                      <span className="machine-details-resource-size">
                        2.4 MB
                      </span>
                    </div>
                  </div>
                  <button className="machine-details-resource-download-btn">
                    <FaDownload />
                    <span>Descargar</span>
                  </button>
                </div>

                <div className="machine-details-resource-card">
                  <div className="machine-details-resource-icon">
                    <div className="machine-details-resource-icon-inner">
                      📊
                    </div>
                    <div className="machine-details-resource-icon-glow"></div>
                  </div>
                  <div className="machine-details-resource-content">
                    <h4>Lista de Materiales</h4>
                    <p>
                      BOM completa con precios actualizados y proveedores
                      recomendados
                    </p>
                    <div className="machine-details-resource-meta">
                      <span className="machine-details-resource-format">
                        XLSX
                      </span>
                      <span className="machine-details-resource-size">
                        156 KB
                      </span>
                    </div>
                  </div>
                  <button className="machine-details-resource-download-btn">
                    <FaDownload />
                    <span>Descargar</span>
                  </button>
                </div>

                <div className="machine-details-resource-card">
                  <div className="machine-details-resource-icon">
                    <div className="machine-details-resource-icon-inner">
                      🎥
                    </div>
                    <div className="machine-details-resource-icon-glow"></div>
                  </div>
                  <div className="machine-details-resource-content">
                    <h4>Video Tutoriales</h4>
                    <p>
                      Serie completa de videos paso a paso para cada etapa del
                      proceso
                    </p>
                    <div className="machine-details-resource-meta">
                      <span className="machine-details-resource-format">
                        4K
                      </span>
                      <span className="machine-details-resource-size">
                        45 min
                      </span>
                    </div>
                  </div>
                  <button className="machine-details-resource-download-btn">
                    <FaPlay />
                    <span>Ver Ahora</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "aplicaciones":
        return (
          <div className="machine-details-applications-content">
            <div className="machine-details-applications-header">
              <h3>Casos de Uso Documentados</h3>
              <p>Aplicaciones prácticas desarrolladas por la comunidad</p>
            </div>

            <div className="machine-details-applications-grid">
              {machineData.aplicaciones.map((aplicacion, index) => (
                <div
                  key={aplicacion.id}
                  className="machine-details-application-card-pro"
                >
                  <div className="machine-details-application-header">
                    <div className="machine-details-app-number">
                      #{index + 1}
                    </div>
                    <div
                      className={`machine-details-app-type machine-details-${aplicacion.tipo.toLowerCase()}`}
                    >
                      {aplicacion.tipo}
                    </div>
                  </div>

                  <div className="machine-details-application-content">
                    <h4>{aplicacion.nombre}</h4>
                    <p>{aplicacion.descripcion}</p>

                    <div className="machine-details-application-creator">
                      <div className="machine-details-creator-avatar">
                        <FaUser />
                      </div>
                      <div className="machine-details-creator-info">
                        <span className="machine-details-creator-name">
                          {aplicacion.creador}
                        </span>
                        <span className="machine-details-creator-role">
                          Desarrollador
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="machine-details-application-actions">
                    <button className="machine-details-app-action-btn">
                      Ver Detalles
                    </button>
                    <button className="machine-details-app-action-btn machine-details-secondary">
                      Implementar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggest New Application */}
            <div className="machine-details-suggest-application">
              <h3>¿Tienes una nueva aplicación?</h3>
              <p>Comparte tu implementación con la comunidad</p>
              <button className="machine-details-suggest-btn">
                <IoSend />
                Proponer Aplicación
              </button>
            </div>
          </div>
        );

      case "hackeados":
        return (
          <div className="machine-details-comments-content">
            <div className="machine-details-hacker-header">
              <h2>Maquinas hackeadas</h2>
              <p>Todas las maquinas hackeadas creada por la comunidad de open fiber, crea más maquinas hackeadas para compartir con la comunidad</p>
            </div>
            {machineData.hackeados.length > 0 ? (
                <div className="cards-grid">
                    {machineData.hackeados.map((item) => (
                        <div key={item.id} ref={addToCardsRef} className="">
                            <Card_Machine {...item} />
                        </div>
                    ))}
                </div> 
              ) : (
                <div>no hay maquinas hackeadas :c</div>
              )}
          </div>
        ); 

      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="machine-details-maquina-details">
      <CreateHackedMachineModal show={showModal} onClose={() => setShowModal(false)} />
      {/* Background Elements */}
      <div className="machine-details-details-background">
        <div className="machine-details-floating-elements">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`machine-details-floating-element machine-details-element-${i}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div ref={headerRef} className="machine-details-details-header">
        <div className="container-telails-header-machine">
        <button
          onClick={() => navigate(-1)}
          className="machine-details-back-button"
        >
          <FaArrowLeft />
          <span>Volver</span>
        </button>

        <button className="btn-create-machine-construye-machine" onClick={() => setShowModal(true)}>Crear Maquina hackeada</button>
        </div>

        <div className="machine-details-machine-header-info">
          <div className="machine-details-machine-title-section">
            <h1>{machineData.nombre}</h1>
            <div className="machine-details-creator-info">
              <img
                src={machineData.creador.avatar}
                alt={machineData.creador.nombre}
              />
              <div>
                <span className="machine-details-creator-name">
                  {machineData.creador.nombre}
                </span>
                <span className="machine-details-creator-country">
                  {machineData.creador.pais}
                </span>
              </div>
            </div>
          </div>

          <div className="machine-details-machine-actions">
            <button
              className={`machine-details-action-btn machine-details-like-btn ${
                isLiked ? "machine-details-liked" : ""
              }`}
              onClick={handleLike}
            >
              <FaHeart />
              <span>{likeCount}</span>
            </button>
            <button className="machine-details-action-btn machine-details-share-btn">
              <FaShare />
              <span>Compartir</span>
            </button>
            <button className="machine-details-action-btn machine-details-download-btn">
              <FaDownload />
              <span>Descargar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <div ref={carouselRef} className="machine-details-image-carousel">
        <div className="machine-details-carousel-container">
          <button
            className="machine-details-carousel-nav machine-details-prev"
            onClick={() => handleImageNavigation("prev")}
          >
            <FaChevronLeft />
          </button>

          <div className="machine-details-carousel-main">
            <img
              src={machineData.imagenes[activeImageIndex]}
              alt={`${machineData.nombre} - ${activeImageIndex + 1}`}
              className="machine-details-main-image"
            />
          </div>

          <button
            className="machine-details-carousel-nav machine-details-next"
            onClick={() => handleImageNavigation("next")}
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="machine-details-carousel-thumbnails">
          {machineData.imagenes.map((imagen, index) => (
            <button
              key={index}
              className={`machine-details-thumbnail ${
                index === activeImageIndex ? "machine-details-active" : ""
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img src={imagen} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        className="machine-details-section-navigation"
        ref={addToSectionsRef}
      >
        <div className="machine-details-nav-tabs">
          {[
            {
              id: "detalles",
              label: "Especificaciones Técnicas",
              icon: FaCogs,
              description: "Detalles completos de la máquina",
            },
            {
              id: "construccion",
              label: "Guía de Construcción",
              icon: FaPlay,
              description: "Proceso paso a paso",
            },
            {
              id: "aplicaciones",
              label: "Casos de Uso",
              icon: IoCheckmarkCircle,
              description: "Aplicaciones prácticas",
            },
            {
              id: "hackeados",
              label: "hackeados",
              icon: FaComment,
              description: `${machineData.hackeados.length} Maquinas hackeadas`,
            },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`machine-details-nav-tab ${
                  activeSection === tab.id ? "machine-details-active" : ""
                }`}
                onClick={() => setActiveSection(tab.id)}
              >
                <div className="machine-details-tab-icon">
                  <IconComponent />
                </div>
                <div className="machine-details-tab-content">
                  <span className="machine-details-tab-label">{tab.label}</span>
                  <span className="machine-details-tab-description">
                    {tab.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Sections */}
      <div className="machine-details-content-sections" ref={addToSectionsRef}>
        <div className="machine-details-section-header">
          <h2>
            {activeSection === "detalles"
              ? "Especificaciones Técnicas"
              : activeSection === "construccion"
              ? "Guía de Construcción"
              : activeSection === "aplicaciones"
              ? "Casos de Uso"
              : "Hackeados"}
          </h2>
        </div>
        {renderSection()}
      </div>
    </div>
  );
};

export default MaquinaDetails;
