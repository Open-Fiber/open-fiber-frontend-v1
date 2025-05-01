import React from "react";
import "./nosotros.css";
import fotoRedondo from "./fotoRedondo.png";
import fotoRectangulo from "./fotoRectangulo.png";
import mision from "./mision.png";
import vision from "./vision.png";

const Nosotros = () => {
    // Datos de los miembros del equipo
    const equipo = [
        { id: 1, nombre: "Nombre Miembro 1", foto: fotoRectangulo },
        { id: 2, nombre: "Nombre Miembro 2", foto: fotoRectangulo },
        { id: 3, nombre: "Nombre Miembro 3", foto: fotoRectangulo },
        { id: 4, nombre: "Nombre Miembro 4", foto: fotoRectangulo },
        { id: 5, nombre: "Nombre Miembro 5", foto: fotoRectangulo },
    ];

    return (
        <section className="nosotros-container">
            <section id="historia" className="seccion">
                <h2>¿Quienes somos?</h2>
                <p>
                    OPEN FIBER es una comunidad global que une saberes ancestrales y tecnologías abiertas para transformar botellas plásticas en fibras reutilizables. Nacimos con la convicción de que el conocimiento debe compartirse y que las soluciones sostenibles pueden surgir desde cualquier rincón del mundo.
                    Inspirados por la cultura guaraní isoseña y su profunda conexión con la vida, tejemos una red de colaboración entre makers, Fab Labs, diseñadores, investigadoras y comunidades que buscan una nueva forma de crear, reciclar y cuidar el planeta.
                    Desarrollamos y compartimos herramientas de código abierto, como Arakuaa, una máquina accesible y fácil de construir que permite generar fibras textiles a partir de botellas PET, integrando prácticas ancestrales con tecnología moderna.
                    Creemos en el poder de la colaboración, en la creatividad colectiva y en el valor de lo hecho con conciencia. Somos un puente entre tradición e innovación, entre la tierra y la tecnología, entre la historia y el futuro.

                </p>
            </section>

            <section id="vision" className="mitad-seccion">
                <img src={vision} alt="Ilustración de vision" className="ilustracion" />
                <div className="contenedor-titulo-descripcion">
                    <h2>visión</h2>
                    <p>
                        Crear una comunidad global de innovación colaborativa que impulse el desarrollo, la mejora y la expansión de tecnologías sostenibles de reciclaje de botellas PET en fibras reutilizables. Promovemos soluciones abiertas y accesibles que permitan transformar residuos plásticos en recursos útiles, conectando saberes ancestrales con herramientas de fabricación digital.
                    </p>
                </div>
            </section>

            <section id="mision" className="mitad-seccion">
                <div className="contenedor-titulo-descripcion">
                    <h2>misión</h2>
                    <p>
                        Convertirnos en la red global líder en tecnología de reciclaje de botellas PET, donde comunidades, Fab Labs y makers de todo el mundo puedan compartir investigaciones, mejoras y aplicaciones, creando un ecosistema dinámico de conocimiento abierto que impacte positivamente en el medio ambiente, la moda y la cultura.
                    </p>
                </div>
                <img src={mision} alt="Ilustración de mision" className="ilustracion" />
            </section>

            <section id="objetivo" className="seccion">
                <h2>objetivo</h2>
                <p>
                    Consolidar una comunidad internacional de colaboración abierta dedicada al desarrollo, mejora continua y difusión de tecnologías de reciclaje de botellas PET. Facilitamos el acceso a herramientas de código abierto para transformar residuos en fibras sostenibles, promoviendo la investigación compartida y el compromiso ambiental en la industria textil.
                </p>
            </section>

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

            <section id="colaboraciones" className="seccion galeria">
                <h2>Galería</h2>
                <div className="fotos">
                    <img src={fotoRedondo} alt="Foto 1" className="foto" />
                    <img src={fotoRedondo} alt="Foto 2" className="foto" />
                    <img src={fotoRedondo} alt="Foto 3" className="foto" />
                    <img src={fotoRedondo} alt="Foto 4" className="foto" />
                    <img src={fotoRedondo} alt="Foto 5" className="foto" />
                    <img src={fotoRedondo} alt="Foto 6" className="foto" />
                </div>
            </section>

        </section>
    );
};

export default Nosotros;