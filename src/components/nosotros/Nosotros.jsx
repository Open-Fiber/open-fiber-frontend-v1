import fotoRectangulo from "./fotoRectangulo.png";
import mision from "./mision.png";
import vision from "./vision.png";
import ImageTextSection from "../home/ImageTextSection";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { FaCalendarAlt, FaUsers, FaProjectDiagram, FaLightbulb } from "react-icons/fa";
import "./nosotros.css";

const Nosotros = () => {
    const galleryRef = useRef(null);
    const galleryTitleRef = useRef(null);
    const galleryCardsRef = useRef([]);
    const [hoveredCard, setHoveredCard] = useState(null);

    // Structured content data following Home.jsx pattern
    const sectionsContent = [
        {
            title: "¿Quiénes somos?",
            text: "OPEN FIBER es una comunidad global que une saberes ancestrales y tecnologías abiertas para transformar botellas plásticas en fibras reutilizables. Nacimos con la convicción de que el conocimiento debe compartirse y que las soluciones sostenibles pueden surgir desde cualquier rincón del mundo. Inspirados por la cultura guaraní isoseña y su profunda conexión con la vida, tejemos una red de colaboración entre makers, Fab Labs, diseñadores, investigadoras y comunidades que buscan una nueva forma de crear, reciclar y cuidar el planeta.",
            imageUrl: "https://www.portalverde.com.bo/wp-content/uploads/2024/08/unifranz-fablab-1024x597.jpg",
        },
        {
            title: "Visión",
            text: "Crear una comunidad global de innovación colaborativa que impulse el desarrollo, la mejora y la expansión de tecnologías sostenibles de reciclaje de botellas PET en fibras reutilizables. Promovemos soluciones abiertas y accesibles que permitan transformar residuos plásticos en recursos útiles, conectando saberes ancestrales con herramientas de fabricación digital.",
            imageUrl: vision,
        },
        {
            title: "Misión",
            text: "Convertirnos en la red global líder en tecnología de reciclaje de botellas PET, donde comunidades, Fab Labs y makers de todo el mundo puedan compartir investigaciones, mejoras y aplicaciones, creando un ecosistema dinámico de conocimiento abierto que impacte positivamente en el medio ambiente, la moda y la cultura.",
            imageUrl: mision,
        },
        {
            title: "Objetivo",
            text: "Consolidar una comunidad internacional de colaboración abierta dedicada al desarrollo, mejora continua y difusión de tecnologías de reciclaje de botellas PET. Facilitamos el acceso a herramientas de código abierto para transformar residuos en fibras sostenibles, promoviendo la investigación compartida y el compromiso ambiental en la industria textil.",
            imageUrl: "https://unifranz.edu.bo/wp-content/uploads/2024/08/FAB-LAB-ANIVERSARIO-blog.jpg",
        },
    ];

    // Team data structure
    const equipo = [
        { id: 1, nombre: "Nombre Miembro 1", foto: fotoRectangulo },
        { id: 2, nombre: "Nombre Miembro 2", foto: fotoRectangulo },
        { id: 3, nombre: "Nombre Miembro 3", foto: fotoRectangulo },
        { id: 4, nombre: "Nombre Miembro 4", foto: fotoRectangulo },
        { id: 5, nombre: "Nombre Miembro 5", foto: fotoRectangulo },
    ];

    // Gallery data structure with FabLab Unifranz Bolivia events
    const galeriaEventos = [
        {
            id: 1,
            title: "Workshop Arduino",
            subtitle: "Tecnología Abierta",
            description: "Taller de introducción a Arduino y prototipado rápido para estudiantes de ingeniería",
            imageUrl: "https://www.portalverde.com.bo/wp-content/uploads/2024/08/unifranz-fablab-1024x597.jpg",
            icon: FaProjectDiagram,
            date: "2024",
            participants: "50+ estudiantes"
        },
        {
            id: 2,
            title: "Hackathon",
            subtitle: "Innovación Verde",
            description: "Competencia de 48 horas desarrollando soluciones tecnológicas para problemas ambientales",
            imageUrl: "https://unifranz.edu.bo/wp-content/uploads/2024/08/FAB-LAB-ANIVERSARIO-blog.jpg",
            icon: FaLightbulb,
            date: "2024",
            participants: "100+ innovadores"
        },
        {
            id: 3,
            title: "Impresión 3D",
            subtitle: "Fabricación Digital",
            description: "Curso intensivo de diseño 3D y fabricación digital para la comunidad universitaria",
            imageUrl: "https://eldeber.com.bo/sites/default/efsfiles/2024-09/unifranz_171079980_1140x520.jpg",
            icon: FaProjectDiagram,
            date: "2024",
            participants: "75+ makers"
        },
        {
            id: 4,
            title: "Encuentro Makers",
            subtitle: "Comunidad Colaborativa",
            description: "Reunión mensual de la comunidad maker boliviana para compartir proyectos y conocimientos",
            imageUrl: "https://www.portalverde.com.bo/wp-content/uploads/2024/08/unifranz-fablab-1024x597.jpg",
            icon: FaUsers,
            date: "2024",
            participants: "200+ makers"
        },
        {
            id: 5,
            title: "Conferencia Tech",
            subtitle: "Futuro Digital",
            description: "Conferencia anual sobre las últimas tendencias en tecnología y fabricación digital",
            imageUrl: "https://unifranz.edu.bo/wp-content/uploads/2024/08/FAB-LAB-ANIVERSARIO-blog.jpg",
            icon: FaCalendarAlt,
            date: "2024",
            participants: "300+ asistentes"
        },
        {
            id: 6,
            title: "Open Day",
            subtitle: "Puertas Abiertas",
            description: "Jornada de puertas abiertas para mostrar los proyectos y capacidades del FabLab",
            imageUrl: "https://eldeber.com.bo/sites/default/efsfiles/2024-09/unifranz_171079980_1140x520.jpg",
            icon: FaUsers,
            date: "2024",
            participants: "150+ visitantes"
        }
    ];

    const addToGalleryCardsRef = (el) => {
        if (el && !galleryCardsRef.current.includes(el)) {
            galleryCardsRef.current.push(el);
        }
    };

    useEffect(() => {
        const gallery = galleryRef.current;
        const title = galleryTitleRef.current;
        const cards = galleryCardsRef.current;

        if (!gallery || !title || cards.length === 0) return;

        // Set initial states
        animate(title, {
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
                        // Title animation
                        animate(title, {
                            opacity: 1,
                            translateY: 0,
                            duration: 800,
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

        observer.observe(gallery);

        return () => {
            observer.unobserve(gallery);
        };
    }, []);

    const handleCardHover = (cardId) => {
        setHoveredCard(cardId);
    };

    const handleCardLeave = () => {
        setHoveredCard(null);
    };

    return (
        <div className="nosotros-container">
            {/* Main content sections using ImageTextSection component like Home */}
            {sectionsContent.map((section, index) => (
                <ImageTextSection
                    key={index}
                    imageUrl={section.imageUrl}
                    title={section.title}
                    text={section.text}
                    imageOnLeft={index % 2 === 0}
                    index={index}
                />
            ))}

            {/* Team section */}
            <section className="equipo-container">
                <h2 className="titulo-equipo">Equipo</h2>
                <div className="galeria-equipo">
                    {equipo.map((miembro) => (
                        <div key={miembro.id} className="miembro">
                            <img src={miembro.foto} alt={miembro.nombre} className="foto-miembro" />
                            <p className="nombre-miembro">{miembro.nombre}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Gallery section with CategoryGrid style */}
            <section ref={galleryRef} className="gallery-grid-section">
                {/* Background Elements */}
                <div className="gallery-background">
                    <div className="floating-elements">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className={`floating-element element-${i}`}></div>
                        ))}
                    </div>
                </div>

                <div className="gallery-container">
                    {/* Section Header */}
                    <div className="gallery-header">
                        <h2 ref={galleryTitleRef} className="gallery-main-title">
                            Galery
                        </h2>
                        <p className="gallery-subtitle">
                            Descubre los eventos y actividades que realizamos en nuestra comunidad maker
                        </p>
                    </div>

                    {/* Events Grid */}
                    <div className="gallery-grid">
                        {galeriaEventos.map((evento, index) => {
                            const IconComponent = evento.icon;

                            return (
                                <div
                                    key={evento.id}
                                    ref={addToGalleryCardsRef}
                                    className={`gallery-card ${
                                        hoveredCard === evento.id ? "hovered" : ""
                                    }`}
                                    onMouseEnter={() => handleCardHover(evento.id)}
                                    onMouseLeave={handleCardLeave}
                                    style={{ "--delay": `${index * 150}ms` }}
                                >
                                    {/* Card Background Image */}
                                    <div className="card-background">
                                        <img src={evento.imageUrl} alt={evento.title} />
                                        <div className="card-overlay"></div>
                                    </div>

                                    {/* Floating Icon */}
                                    <div className="floating-icon">
                                        <IconComponent />
                                    </div>

                                    {/* Card Content */}
                                    <div className="card-content">
                                        <div className="card-header">
                                            <h3 className="card-title">{evento.title}</h3>
                                            <span className="card-subtitle">{evento.subtitle}</span>
                                        </div>

                                        <div className="card-details">
                                            <p className="card-description">{evento.description}</p>
                                            <div className="card-stats">
                                                <span className="stat">📅 {evento.date}</span>
                                                <span className="stat">👥 {evento.participants}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Effects */}
                                    <div className="card-effects">
                                        <div className="shimmer-effect"></div>
                                        <div className="glow-effect"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Nosotros;