import fotoRectangulo from "./fotoRectangulo.png";
import mision from "./mision.png";
import vision from "./vision.png";
import ImageTextSection from "../home/ImageTextSection";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { 
    FaUsers, 
    FaProjectDiagram, 
    FaLightbulb, 
    FaRecycle,
    FaGlobe,
    FaCogs,
    FaRocket,
    FaLeaf
} from "react-icons/fa";
import "./nosotros.css";

const Nosotros = () => {
    const galleryRef = useRef(null);
    const galleryTitleRef = useRef(null);
    const galleryCardsRef = useRef([]);
    const teamRef = useRef(null);
    const teamTitleRef = useRef(null);
    const teamCardsRef = useRef([]);
    const statsRef = useRef(null);
    const statsCardsRef = useRef([]);
    const sectionsRef = useRef([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredTeamCard, setHoveredTeamCard] = useState(null);
    
    // States to track animation states
    const [statsAnimated, setStatsAnimated] = useState(false);
    const [teamAnimated, setTeamAnimated] = useState(false);
    const [galleryAnimated, setGalleryAnimated] = useState(false);
    const [sectionsAnimated, setSectionsAnimated] = useState([false, false, false, false]);

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

    // Statistics section data
    const estadisticas = [
        {
            id: 1,
            number: "500+",
            label: "Botellas Recicladas",
            description: "Transformadas en fibras sostenibles",
            icon: FaRecycle,
            color: "#4949e9"
        },
        {
            id: 2,
            number: "15+",
            label: "Países Conectados",
            description: "En nuestra red global",
            icon: FaGlobe,
            color: "#abc3ff"
        },
        {
            id: 3,
            number: "200+",
            label: "Makers Activos",
            description: "Contribuyendo al proyecto",
            icon: FaUsers,
            color: "#dcf342"
        },
        {
            id: 4,
            number: "50+",
            label: "Proyectos Abiertos",
            description: "Disponibles para la comunidad",
            icon: FaProjectDiagram,
            color: "#4949e9"
        }
    ];

    // Team data structure with roles and skills
    const equipo = [
        { 
            id: 1, 
            nombre: "María González", 
            foto: fotoRectangulo,
            role: "Directora de Innovación",
            skills: ["Sostenibilidad", "Liderazgo"],
            description: "Especialista en tecnologías verdes"
        },
        { 
            id: 2, 
            nombre: "Carlos Mendoza", 
            foto: fotoRectangulo,
            role: "Ingeniero de Fabricación",
            skills: ["Arduino", "3D Printing"],
            description: "Experto en prototipado rápido"
        },
        { 
            id: 3, 
            nombre: "Ana Rodríguez", 
            foto: fotoRectangulo,
            role: "Diseñadora UX/UI",
            skills: ["Design Thinking", "Research"],
            description: "Centrada en experiencia del usuario"
        },
        { 
            id: 4, 
            nombre: "Luis Vargas", 
            foto: fotoRectangulo,
            role: "Desarrollador Full Stack",
            skills: ["React", "Node.js"],
            description: "Desarrollador de plataformas digitales"
        },
        { 
            id: 5, 
            nombre: "Sofia Chen", 
            foto: fotoRectangulo,
            role: "Especialista en Materiales",
            skills: ["Química", "Innovación"],
            description: "Investigadora en nuevos materiales"
        }
    ];

    // Gallery data structure with FabLab Unifranz Bolivia events
    const galeriaEventos = [
        {
            id: 1,
            title: "Workshop Arduino",
            subtitle: "Tecnología Abierta",
            description: "Taller intensivo de introducción a Arduino y prototipado rápido para estudiantes de ingeniería y makers",
            imageUrl: "https://www.portalverde.com.bo/wp-content/uploads/2024/08/unifranz-fablab-1024x597.jpg",
            icon: FaProjectDiagram,
            date: "Marzo 2024",
            participants: "50+ estudiantes",
            type: "workshop"
        },
        {
            id: 2,
            title: "Hackathon Sostenible",
            subtitle: "Innovación Verde",
            description: "Competencia de 48 horas desarrollando soluciones tecnológicas innovadoras para problemas ambientales globales",
            imageUrl: "https://unifranz.edu.bo/wp-content/uploads/2024/08/FAB-LAB-ANIVERSARIO-blog.jpg",
            icon: FaLightbulb,
            date: "Abril 2024",
            participants: "100+ innovadores",
            type: "competition"
        },
        {
            id: 3,
            title: "Masterclass 3D",
            subtitle: "Fabricación Digital",
            description: "Curso intensivo de diseño 3D avanzado y técnicas de fabricación digital para la comunidad universitaria",
            imageUrl: "https://eldeber.com.bo/sites/default/efsfiles/2024-09/unifranz_171079980_1140x520.jpg",
            icon: FaCogs,
            date: "Mayo 2024",
            participants: "75+ makers",
            type: "course"
        },
        {
            id: 4,
            title: "Encuentro Makers",
            subtitle: "Comunidad Colaborativa",
            description: "Reunión mensual de la comunidad maker boliviana para compartir proyectos, conocimientos y experiencias",
            imageUrl: "https://www.portalverde.com.bo/wp-content/uploads/2024/08/unifranz-fablab-1024x597.jpg",
            icon: FaUsers,
            date: "Todos los meses",
            participants: "200+ makers",
            type: "meetup"
        },
        {
            id: 5,
            title: "Tech Conference",
            subtitle: "Futuro Digital",
            description: "Conferencia anual sobre las últimas tendencias en tecnología sostenible y fabricación digital del futuro",
            imageUrl: "https://unifranz.edu.bo/wp-content/uploads/2024/08/FAB-LAB-ANIVERSARIO-blog.jpg",
            icon: FaRocket,
            date: "Junio 2024",
            participants: "300+ asistentes",
            type: "conference"
        },
        {
            id: 6,
            title: "Green Innovation Day",
            subtitle: "Sostenibilidad",
            description: "Jornada dedicada a mostrar proyectos sostenibles y las capacidades del FabLab en tecnología verde",
            imageUrl: "https://eldeber.com.bo/sites/default/efsfiles/2024-09/unifranz_171079980_1140x520.jpg",
            icon: FaLeaf,
            date: "Julio 2024",
            participants: "150+ visitantes",
            type: "showcase"
        }
    ];

    // Animation helper functions
    const addToGalleryCardsRef = (el) => {
        if (el && !galleryCardsRef.current.includes(el)) {
            galleryCardsRef.current.push(el);
        }
    };

    const addToTeamCardsRef = (el) => {
        if (el && !teamCardsRef.current.includes(el)) {
            teamCardsRef.current.push(el);
        }
    };

    const addToStatsCardsRef = (el) => {
        if (el && !statsCardsRef.current.includes(el)) {
            statsCardsRef.current.push(el);
        }
    };

    const addToSectionsRef = (el, index) => {
        if (el && sectionsRef.current[index] !== el) {
            sectionsRef.current[index] = el;
        }
    };

    // Animation effects - improved bidirectional
    useEffect(() => {
        // Statistics animation - bidirectional
        const stats = statsRef.current;
        const statCards = statsCardsRef.current;

        if (stats && statCards.length > 0) {
            const statsObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // Animate in
                            animate(statCards, {
                                opacity: [0, 1],
                                translateY: [50, 0],
                                scale: [0.8, 1],
                                duration: 750, // Reduced from 1000ms
                                delay: stagger(150), // Reduced from 200ms
                                ease: "outBack",
                            });
                            setStatsAnimated(true);
                        } else {
                            // Animate out smoothly
                            animate(statCards, {
                                opacity: [1, 0],
                                translateY: [0, entry.boundingClientRect.top < 0 ? -30 : 30],
                                scale: [1, 0.9],
                                duration: 450, // Reduced from 600ms
                                delay: stagger(75), // Reduced from 100ms
                                ease: "outQuart",
                                complete: () => setStatsAnimated(false)
                            });
                        }
                    });
                },
                { 
                    threshold: 0.2,
                    rootMargin: '-50px 0px -50px 0px'
                }
            );
            statsObserver.observe(stats);

            return () => statsObserver.disconnect();
        }
    }, [statsAnimated]);

    useEffect(() => {
        // Team animation - bidirectional
        const team = teamRef.current;
        const teamTitle = teamTitleRef.current;
        const teamCards = teamCardsRef.current;

        if (team && teamTitle && teamCards.length > 0) {
            const teamObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // Animate in
                            animate(teamTitle, {
                                opacity: [0, 1],
                                translateY: [40, 0],
                                duration: 600, // Reduced from 800ms
                                ease: "outExpo",
                            });

                            animate(teamCards, {
                                opacity: [0, 1],
                                translateY: [60, 0],
                                scale: [0.9, 1],
                                duration: 750, // Reduced from 1000ms
                                delay: stagger(112), // Reduced from 150ms
                                ease: "outBack",
                            });
                            setTeamAnimated(true);
                        } else {
                            // Animate out smoothly
                            animate([teamTitle, ...teamCards], {
                                opacity: [1, 0],
                                translateY: [0, entry.boundingClientRect.top < 0 ? -30 : 30],
                                scale: [1, 0.9],
                                duration: 450, // Reduced from 600ms
                                delay: stagger(60), // Reduced from 80ms
                                ease: "outQuart",
                                complete: () => setTeamAnimated(false)
                            });
                        }
                    });
                },
                { 
                    threshold: 0.2,
                    rootMargin: '-50px 0px -50px 0px'
                }
            );
            teamObserver.observe(team);

            return () => teamObserver.disconnect();
        }
    }, [teamAnimated]);

    useEffect(() => {
        // Gallery animation - bidirectional
        const gallery = galleryRef.current;
        const galleryTitle = galleryTitleRef.current;
        const galleryCards = galleryCardsRef.current;

        if (gallery && galleryTitle && galleryCards.length > 0) {
            const galleryObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // Animate in
                            animate(galleryTitle, {
                                opacity: [0, 1],
                                translateY: [40, 0],
                                duration: 600, // Reduced from 800ms
                                ease: "outExpo",
                            });

                            animate(galleryCards, {
                                opacity: [0, 1],
                                translateY: [60, 0],
                                scale: [0.9, 1],
                                duration: 750, // Reduced from 1000ms
                                delay: stagger(112, { from: "center" }), // Reduced from 150ms
                                ease: "outBack",
                            });
                            setGalleryAnimated(true);
                        } else {
                            // Animate out smoothly
                            animate([galleryTitle, ...galleryCards], {
                                opacity: [1, 0],
                                translateY: [0, entry.boundingClientRect.top < 0 ? -30 : 30],
                                scale: [1, 0.9],
                                duration: 450, // Reduced from 600ms
                                delay: stagger(60), // Reduced from 80ms
                                ease: "outQuart",
                                complete: () => setGalleryAnimated(false)
                            });
                        }
                    });
                },
                { 
                    threshold: 0.2,
                    rootMargin: '-50px 0px -50px 0px'
                }
            );
            galleryObserver.observe(gallery);

            return () => galleryObserver.disconnect();
        }
    }, [galleryAnimated]);

    useEffect(() => {
        // Main sections animation - bidirectional
        sectionsRef.current.forEach((section, index) => {
            if (section) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            const currentSectionAnimated = sectionsAnimated[index];
                            
                            if (entry.isIntersecting && !currentSectionAnimated) {
                                // Animate in
                                animate(section, {
                                    opacity: [0, 1],
                                    translateY: [60, 0],
                                    scale: [0.95, 1],
                                    duration: 900, // Reduced from 1200ms
                                    delay: index * 75, // Reduced from 100ms
                                    ease: "outExpo",
                                });
                                
                                const newSectionsAnimated = [...sectionsAnimated];
                                newSectionsAnimated[index] = true;
                                setSectionsAnimated(newSectionsAnimated);
                            } else if (!entry.isIntersecting && currentSectionAnimated) {
                                // Animate out smoothly
                                animate(section, {
                                    opacity: [1, 0],
                                    translateY: [0, entry.boundingClientRect.top < 0 ? -40 : 40],
                                    scale: [1, 0.95],
                                    duration: 525, // Reduced from 700ms
                                    ease: "outQuart",
                                    complete: () => {
                                        const newSectionsAnimated = [...sectionsAnimated];
                                        newSectionsAnimated[index] = false;
                                        setSectionsAnimated(newSectionsAnimated);
                                    }
                                });
                            }
                        });
                    },
                    { 
                        threshold: 0.3,
                        rootMargin: '-80px 0px -80px 0px'
                    }
                );
                observer.observe(section);
                
                return () => observer.disconnect();
            }
        });
    }, [sectionsAnimated]);

    const handleCardHover = (cardId) => {
        setHoveredCard(cardId);
    };

    const handleCardLeave = () => {
        setHoveredCard(null);
    };

    const handleTeamCardHover = (cardId) => {
        setHoveredTeamCard(cardId);
    };

    const handleTeamCardLeave = () => {
        setHoveredTeamCard(null);
    };

    return (
        <div className="nosotros-container">
            {/* Main content sections using ImageTextSection component like Home */}
            {sectionsContent.map((section, index) => (
                <div
                    key={index}
                    ref={(el) => addToSectionsRef(el, index)}
                    className="animated-section"
                >
                    <ImageTextSection
                        imageUrl={section.imageUrl}
                        title={section.title}
                        text={section.text}
                        imageOnLeft={index % 2 === 0}
                        index={index}
                    />
                </div>
            ))}

            {/* Statistics section */}
            <section ref={statsRef} className="stats-section">
                <div className="stats-container">
                    <div className="stats-header">
                        <h2 className="stats-title">Nuestro Impacto</h2>
                        <p className="stats-subtitle">Cifras que reflejan nuestro compromiso con la sostenibilidad</p>
                    </div>
                    <div className="stats-grid">
                        {estadisticas.map((stat) => {
                            const IconComponent = stat.icon;
                            return (
                                <div
                                    key={stat.id}
                                    ref={addToStatsCardsRef}
                                    className="stat-card"
                                    style={{ "--stat-color": stat.color }}
                                >
                                    <div className="stat-icon">
                                        <IconComponent />
                                    </div>
                                    <div className="stat-content">
                                        <h3 className="stat-number">{stat.number}</h3>
                                        <h4 className="stat-label">{stat.label}</h4>
                                        <p className="stat-description">{stat.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team section with enhanced design */}
            <section ref={teamRef} className="team-section">
                <div className="team-background">
                    <div className="floating-elements">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`floating-element element-${i}`}></div>
                        ))}
                    </div>
                </div>
                
                <div className="team-container">
                    <div className="team-header">
                        <h2 ref={teamTitleRef} className="team-title">Nuestro Equipo</h2>
                        <p className="team-subtitle">Conoce a las personas que hacen posible Open Fiber</p>
                    </div>
                    <div className="team-grid">
                        {equipo.map((miembro) => (
                            <div
                                key={miembro.id}
                                ref={addToTeamCardsRef}
                                className={`team-card ${hoveredTeamCard === miembro.id ? "hovered" : ""}`}
                                onMouseEnter={() => handleTeamCardHover(miembro.id)}
                                onMouseLeave={handleTeamCardLeave}
                            >
                                <div className="team-card-inner">
                                    <div className="team-avatar">
                                        <img src={miembro.foto} alt={miembro.nombre} />
                                        <div className="avatar-overlay"></div>
                                    </div>
                                    <div className="team-info">
                                        <h3 className="member-name">{miembro.nombre}</h3>
                                        <p className="member-role">{miembro.role}</p>
                                        <p className="member-description">{miembro.description}</p>
                                        <div className="member-skills">
                                            {miembro.skills.map((skill, idx) => (
                                                <span key={idx} className="skill-tag">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery section with enhanced CategoryGrid style */}
            <section ref={galleryRef} className="gallery-section">
                <div className="gallery-background">
                    <div className="floating-elements">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className={`floating-element element-${i}`}></div>
                        ))}
                    </div>
                </div>

                <div className="gallery-container">
                    <div className="gallery-header">
                        <h2 ref={galleryTitleRef} className="gallery-title">
                            Eventos y Actividades
                        </h2>
                        <p className="gallery-subtitle">
                            Descubre los eventos y actividades que realizamos en nuestra comunidad maker
                        </p>
                    </div>

                    <div className="gallery-grid">
                        {galeriaEventos.map((evento, index) => {
                            const IconComponent = evento.icon;

                            return (
                                <div
                                    key={evento.id}
                                    ref={addToGalleryCardsRef}
                                    className={`gallery-card ${hoveredCard === evento.id ? "hovered" : ""} ${evento.type}`}
                                    onMouseEnter={() => handleCardHover(evento.id)}
                                    onMouseLeave={handleCardLeave}
                                    style={{ "--delay": `${index * 150}ms` }}
                                >
                                    <div className="card-background">
                                        <img src={evento.imageUrl} alt={evento.title} />
                                        <div className="card-overlay"></div>
                                    </div>

                                    <div className="floating-icon">
                                        <IconComponent />
                                    </div>

                                    <div className="card-content">
                                        <div className="card-header">
                                            <span className="event-type">{evento.type}</span>
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