import React, { useEffect, useState, useRef } from 'react';
import Card_Machine from '../../components/cards/card_machine/Card_Machine';
import '../../styles/pages/comunidad/comunidad.css';
import { FaCalendarAlt } from 'react-icons/fa';

// --- DATOS DE LA PÁGINA ---

const heroImages = [
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1770&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1770&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1770&q=80',
];

const featureCards = [
    {
        titulo: "+100 Makers",
        subtitulo: "Una comunidad vibrante y en crecimiento.",
        img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1770&q=80"
    },
    {
        titulo: "+200 Máquinas Hackeadas",
        subtitulo: "Proyectos innovadores y de código abierto.",
        img: "https://images.unsplash.com/photo-1617863139409-d54b0a48dc63?auto=format&fit=crop&w=1770&q=80"
    },
    {
        titulo: "+ Cientos de Usuarios",
        subtitulo: "Conectados en la plataforma Open Fiber.",
        img: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=1770&q=80"
    }
];

const maquinasHackeadas = [
  {
    id: 1,
    image: 'https://i.blogs.es/e7951d/gh-1-/1366_2000.jpeg',
    nombre: 'Impresora 3D de Resina',
    descripcion: 'Máquina que utiliza resina líquida y luz UV para crear objetos 3D con alta precisión.',
    pais: 'ES',
    likes: 152,
    difficulty: 'Avanzado',
    category: 'Electronica',
    createdAt: new Date('2024-05-20'),
    tags: ['DIY', 'Resina', 'Alta Precisión'],
    author: 'ComunidadMaker',
  },
  {
    id: 2,
    image: 'https://www.cnc-step.es/wp-content/uploads/2018/08/mm-1000-cnc-fraesmaschine-bausatz-1.jpg',
    nombre: 'CNC Router Casero',
    descripcion: 'Router CNC construido con perfiles de aluminio y un motor de alta velocidad para tallar madera y plástico.',
    pais: 'MX',
    likes: 230,
    difficulty: 'Intermedio',
    category: 'Mecanica',
    createdAt: new Date('2024-03-10'),
    tags: ['CNC', 'Madera', 'Open Source'],
    author: 'InnovaTech',
  },
  {
    id: 3,
    image: 'https://i.ytimg.com/vi/Uuek4gB_2_o/maxresdefault.jpg',
    nombre: 'Brazo Robótico Programable',
    descripcion: 'Brazo robótico de 4 ejes controlado por Arduino, capaz de realizar tareas de pick and place.',
    pais: 'CO',
    likes: 189,
    difficulty: 'Principiante',
    category: 'Estetica',
    createdAt: new Date('2024-06-01'),
    tags: ['Arduino', 'Robótica', 'Educación'],
    author: 'RoboticaParaTodos',
  },
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

// --- COMPONENTE PRINCIPAL ---

const Comunidad = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const pageRef = useRef(null);

  // Efecto para el carrusel de la sección Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % heroImages.length);
    }, 5000); // Cambia de imagen cada 5 segundos
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
    <div className="pagina-comunidad" ref={pageRef}>
      {/* 1. Sección Hero (Carrusel) */}
      <section className="seccion-hero">
        <div className="hero-slider">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`hero-fondo ${index === currentImage ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-contenido">
          <h1>Únete a la Comunidad Open Fiber</h1>
          <p>Conecta, colabora y crea con cientos de makers, innovadores y entusiastas de la tecnología de todo el mundo.</p>
        </div>
      </section>

      {/* 2. Sección de Features (antes Estadísticas) */}
      <section className="seccion-features animate-section">
        {featureCards.map((card, index) => (
            <div key={index} className="feature-card">
                <img src={card.img} alt={card.titulo} className="feature-card-bg"/>
                <div className="feature-card-overlay"></div>
                <div className="feature-card-content">
                    <h3>{card.titulo}</h3>
                    <p>{card.subtitulo}</p>
                </div>
            </div>
        ))}
      </section>

      {/* 3. Sección de Mejores Máquinas Hackeadas */}
      <section className="seccion-maquinas">
        <h2 className="titulo-seccion">Mejores Máquinas Hackeadas</h2>
        <div className="contenedor-maquinas animate-section">
          {maquinasHackeadas.map((maquina) => (
            <Card_Machine key={maquina.id} {...maquina} />
          ))}
        </div>
      </section>

      {/* 4. Sección Directorio de Comunidades */}
      <section className="seccion-directorio">
        <h2 className="titulo-seccion">Directorio de Comunidades</h2>
        <div className="contenedor-organizaciones animate-section">
          {organizaciones.map(org => (
            <div key={org.id} className="organizacion-card">
              <div className="card-background-glow"></div>
              <img src={org.logo} alt={`Logo de ${org.nombre}`} className="organizacion-logo"/>
              <div className="organizacion-info">
                <h4>{org.nombre}</h4>
                <p>{org.slogan}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Sección de Eventos y Anuncios */}
      <section className="seccion-eventos">
        <h2 className="titulo-seccion">Eventos y Anuncios</h2>
        <div className="contenedor-eventos animate-section">
          {eventos.map(evento => (
            <div key={evento.id} className="evento-card">
              <div className="evento-fecha">
                <FaCalendarAlt />
                <span>{evento.fecha}</span>
              </div>
              <div className="evento-info">
                <h4>{evento.titulo}</h4>
                <p>{evento.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Comunidad;
