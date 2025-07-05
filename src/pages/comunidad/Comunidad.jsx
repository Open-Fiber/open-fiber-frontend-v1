import React, { useEffect, useState, useRef } from 'react';
import Card_Machine from '../../components/cards/card_machine/Card_Machine';
import '../../styles/pages/comunidad/comunidad.css';
import { FaCalendarAlt } from 'react-icons/fa';

const heroImages = [
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1770&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1770&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1770&q=80',
];

const organizaciones = [
    { id: 1, nombre: 'MakerSpace Global', logo: 'https://img.freepik.com/vector-premium/plantilla-logotipo-laboratorio-ideas_7109-6.jpg', slogan: 'Innovando juntos a nivel mundial.' },
    { id: 2, nombre: 'TecnoComunidad Latam', logo: 'https://img.freepik.com/vector-gratis/plantilla-logotipo-tecnologia-degradada_23-2149200690.jpg', slogan: 'Conectando tecnólogos en Latinoamérica.' },
    { id: 3, nombre: 'Open Hardware Argentina', logo: 'https://static.vecteezy.com/system/resources/thumbnails/004/822/241/small/circle-logo-template-download-free-vector.jpg', slogan: 'Hardware libre para una Argentina creativa.' },
    { id: 4, nombre: 'Club de Robótica Chile', logo: 'https://c8.alamy.com/compes/2b1y9jt/plantilla-de-logotipo-de-robot-para-su-empresa-2b1y9jt.jpg', slogan: 'El futuro de la robótica está aquí.' },
    { id: 5, nombre: 'Innovadores Perú', logo: 'https://cdn.dribbble.com/users/1161517/screenshots/14299893/media/51531a863a7a653a16223b52233b26a6.jpg?compress=1&resize=400x300', slogan: 'Fomentando la cultura de innovación en Perú.' },
    { id: 6, nombre: 'Colombia Maker Hub', logo: 'https://cdn.dribbble.com/users/106577/screenshots/1435339/media/37f887f5df511d38a1691a54b6a80f4a.png?compress=1&resize=400x300', slogan: 'El punto de encuentro para los creadores.' },
];

const eventos = [
    { id: 1, titulo: 'Hackatón de Sostenibilidad', fecha: '15 AGO, 2024', desc: 'Un evento para crear soluciones tecnológicas a problemas ambientales.' },
    { id: 2, titulo: 'Taller de Introducción a la Impresión 3D', fecha: '25 AGO, 2024', desc: 'Aprende desde cero a manejar una impresora 3D.' },
    { id: 3, titulo: 'Feria de Innovación Abierta', fecha: '05 SEP, 2024', desc: 'Presenta tu proyecto y conecta con la comunidad de innovadores.' },
    { id: 4, titulo: 'Charla: El Futuro del Open Source', fecha: '18 SEP, 2024', desc: 'Expertos de la industria discuten sobre el impacto del software libre.' },
    { id: 5, titulo: 'Competencia de Robótica', fecha: '01 OCT, 2024', desc: 'Demuestra tus habilidades y compite por grandes premios.' },
];

const Comunidad = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const pageRef = useRef(null);

  // Efecto del carrusel de la sección Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Efecto para las animaciones de scroll con CSS
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const sections = pageRef.current.querySelectorAll('.animate-section');
    sections.forEach(section => observer.observe(section));

    // Animación inicial del Hero
    const heroContent = pageRef.current.querySelector('.hero-contenido');
    if (heroContent) {
        setTimeout(() => heroContent.classList.add('is-visible'), 100);
    }

    return () => {
        if (pageRef.current) {
            const sections = pageRef.current.querySelectorAll('.animate-section');
            sections.forEach(section => observer.unobserve(section));
        }
    };
  }, []);

  return (
    <main className="pagina-comunidad" ref={pageRef}>
      {/* 1. Sección Hero (Carrusel) */}
      <section className="seccion-hero-comunidad">
        <div className="hero-slider-comunidad">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`hero-fondo-comunidad ${index === currentImage ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>
        <div className="hero-overlay-comunidad"></div>
        <div className="hero-contenido-comunidad">
          <h1>Únete a la Comunidad Open Fiber</h1>
          <p>Conecta, colabora y crea con cientos de makers, innovadores y entusiastas de la tecnología de todo el mundo.</p>
        </div>
      </section>

      {/* 4. Sección Directorio de Comunidades */}
      <section className="seccion-directorio-comunidad">
        <h2 className="titulo-seccion-comunidad">Directorio de Comunidades</h2>
        <div className="contenedor-organizaciones-comunidad animate-section">
          {organizaciones.map(org => (
            <div key={org.id} className="organizacion-card-comunidad">
              <div className="card-background-glow-comunidad"></div>
              <img src={org.logo} alt={`Logo de ${org.nombre}`} className="organizacion-logo-comunidad"/>
              <div className="organizacion-info-comunidad">
                <h4>{org.nombre}</h4>
                <p>{org.slogan}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Sección de Eventos y Anuncios */}
      <section className="seccion-eventos-comunidad">
        <h2 className="titulo-seccion-comunidad">Eventos y Anuncios</h2>
        <div className="contenedor-eventos-comunidad animate-section">
          {eventos.map(evento => (
            <div key={evento.id} className="evento-card-comunidad">
              <div className="evento-fecha-comunidad">
                <FaCalendarAlt />
                <span>{evento.fecha}</span>
              </div>
              <div className="evento-info-comunidad">
                <h4>{evento.titulo}</h4>
                <p>{evento.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default Comunidad;
