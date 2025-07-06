import React, { useState, useEffect } from 'react';
import Filters from '../../components/aprende/Filters';
import CourseCarousel from '../../components/aprende/CourseCarousel';
import CourseGrid from '../../components/aprende/CourseGrid';
import AprendeFoto1 from '../../assets/machine/machine1.jpeg';
import AprendeFoto2 from '../../assets/machine/machine2.jpeg';
import AprendeFoto3 from '../../assets/machine/machine3.jpeg';
import AprendeFoto4 from '../../assets/machine/machine4.jpeg';
import AprendeFoto5 from '../../assets/machine/machine5.jpeg';
import AprendeFoto6 from '../../assets/machine/machine6.jpeg';
import AprendeFoto7 from '../../assets/machine/machine7.jpeg';
import AprendeFoto8 from '../../assets/machine/machine8.jpeg';
import '../../styles/pages/aprende/aprende.css';

const Aprende = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLevel, setFilterLevel] = useState('Todos');
    const [view, setView] = useState('carousels'); // 'carousels' o 'grid'
    const [gridCourses, setGridCourses] = useState([]);
    const [gridTitle, setGridTitle] = useState('');

    const mockCourses = [
        {
          id: "1",
          titulo: "Curso de Inglés Básico A1 para Principiantes",
          descripcion: "Aprende las bases del inglés desde cero.",
          duracion: "10h",
          nivel: "Inicial",
          creadorId: "Gina Pedraza",
          miniatura: AprendeFoto1,
          fotoPerfil: "https://i.imgur.com/3Z3eY7G.png"
        },
        {
          id: "2",
          titulo: "Curso de Habilidades Blandas para el Desarrollo Profesional",
          descripcion: "Desarrolla tus habilidades de comunicación y liderazgo.",
          duracion: "8h",
          nivel: "Inicial",
          creadorId: "Profe de Habilidades Blandas",
          miniatura:    AprendeFoto2,
          fotoPerfil: "https://i.imgur.com/rO9eA8v.png"
        },
        {
          id: "3",
          titulo: "Curso de Bases de Datos con SQL",
          descripcion: "Domina las bases de datos relacionales con SQL.",
          duracion: "15h",
          nivel: "Medio",
          creadorId: "Carolina Castañeda",
          miniatura: AprendeFoto3,
          fotoPerfil: "https://i.imgur.com/SFrT8bi.png"
        },
        {
          id: "4",
          titulo: "Curso Gratis de Programación Básica",
          descripcion: "Tu primer paso en el mundo de la programación.",
          duracion: "5h",
          nivel: "Inicial",
          creadorId: "Jhon Carvajal",
          miniatura: AprendeFoto4,
          fotoPerfil: "https://i.imgur.com/9E7B2jH.png"
        },
        {
          id: "5",
          titulo: "Curso de React.js desde Cero",
          descripcion: "Aprende a crear aplicaciones web modernas con React.",
          duracion: "20h",
          nivel: "Avanzado",
          creadorId: "Diego De Granda",
          miniatura: AprendeFoto5,
          fotoPerfil: "https://i.imgur.com/JvjZ2qM.png"
        },
        {
          id: "6",
          titulo: "Curso de Estadística Descriptiva",
          descripcion: "Analiza e interpreta datos con estadística.",
          duracion: "12h",
          nivel: "Medio",
          creadorId: "Antonio Hall",
          miniatura: AprendeFoto6,
          fotoPerfil: "https://i.imgur.com/sT8a2xY.png"
        },
        {
          id: "7",
          titulo: "API-first: Desarrollo de APIs",
          descripcion: "Aprende a diseñar y construir APIs robustas.",
          duracion: "18h",
          nivel: "Avanzado",
          creadorId: "Marco Luchi",
          miniatura: AprendeFoto7,
          fotoPerfil: "https://i.imgur.com/k4f7g8B.png"
        },
        {
          id: "8",
          titulo: "Curso de Marketing Digital",
          descripcion: "Estrategias para crecer en el mundo digital.",
          duracion: "14h",
          nivel: "Inicial",
          creadorId: "Vilma Nuñez",
          miniatura: AprendeFoto8,
          fotoPerfil: "https://i.imgur.com/6XwY9Z2.png"
        },
        {
          id: "9",
          titulo: "Curso de Finanzas Personales",
          descripcion: "Aprende a gestionar tu dinero y a invertirlo.",
          duracion: "10h",
          nivel: "Inicial",
          creadorId: "Sofia Vergara",
          miniatura: AprendeFoto1,
          fotoPerfil: "https://i.imgur.com/3Z3eY7G.png"
        },
        {
          id: "10",
          titulo: "Introducción a la Inteligencia Artificial",
          descripcion: "Descubre los fundamentos de la IA y el Machine Learning.",
          duracion: "22h",
          nivel: "Avanzado",
          creadorId: "Andrew Ng",
          miniatura: AprendeFoto2,
          fotoPerfil: "https://i.imgur.com/rO9eA8v.png"
        },
        {
          id: "11",
          titulo: "Curso de Adobe Photoshop para Principiantes",
          descripcion: "Domina las herramientas básicas de Photoshop.",
          duracion: "12h",
          nivel: "Inicial",
          creadorId: "Carlos Puentes",
          miniatura: AprendeFoto3,
          fotoPerfil: "https://i.imgur.com/SFrT8bi.png"
        },
        {
          id: "12",
          titulo: "Curso de Node.js y Express",
          descripcion: "Crea servidores y APIs con el entorno de Node.js.",
          duracion: "16h",
          nivel: "Medio",
          creadorId: "Laura Rodriguez",
          miniatura: AprendeFoto4,
          fotoPerfil: "https://i.imgur.com/9E7B2jH.png"
        },
        {
          id: "13",
          titulo: "Curso de Ciberseguridad Defensiva",
          descripcion: "Aprende a proteger sistemas y redes de ataques.",
          duracion: "25h",
          nivel: "Avanzado",
          creadorId: "Kevin Mitnick",
          miniatura: AprendeFoto5,
          fotoPerfil: "https://i.imgur.com/JvjZ2qM.png"
        },
        {
          id: "14",
          titulo: "Curso de Guitarra para Principiantes",
          descripcion: "Aprende tus primeros acordes y canciones.",
          duracion: "8h",
          nivel: "Inicial",
          creadorId: "Paco de Lucía",
          miniatura: AprendeFoto6,
          fotoPerfil: "https://i.imgur.com/sT8a2xY.png"
        },
        {
          id: "15",
          titulo: "Curso de Gestión de Proyectos con Metodologías Ágiles",
          descripcion: "Lidera proyectos de forma eficiente con Scrum y Kanban.",
          duracion: "18h",
          nivel: "Medio",
          creadorId: "Jeff Sutherland",
          miniatura: AprendeFoto7,
          fotoPerfil: "https://i.imgur.com/k4f7g8B.png"
        },
        {
          id: "16",
          titulo: "Curso de Blockchain y Criptomonedas",
          descripcion: "Entiende la tecnología detrás del Bitcoin.",
          duracion: "20h",
          nivel: "Avanzado",
          creadorId: "Vitalik Buterin",
          miniatura: AprendeFoto8,
          fotoPerfil: "https://i.imgur.com/6XwY9Z2.png"
        }
      ];

    useEffect(() => {
        setCourses(mockCourses);
    }, []);

    // Manejar el cambio de vista a la cuadrícula
    const handleSeeAll = (level) => {
        const coursesToShow = mockCourses.filter(c => c.nivel === level);
        setGridTitle(`Cursos Nivel ${level}`);
        setGridCourses(coursesToShow);
        setView('grid');
        window.scrollTo(0, 0); // Scroll al inicio de la página
    };

    // Manejar el cambio de filtro desde el componente Filters
    const handleFilterChange = (level) => {
        setFilterLevel(level);
        if (level === 'Todos') {
            setView('carousels');
        } else {
            const coursesToShow = mockCourses.filter(c => c.nivel === level);
            setGridTitle(`Cursos Nivel ${level}`);
            setGridCourses(coursesToShow);
            setView('grid');
            window.scrollTo(0, 0);
        }
    };

    const coursesFilteredBySearch = courses.filter(course => {
        return course.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const initialCourses = coursesFilteredBySearch.filter(c => c.nivel === 'Inicial');
    const mediumCourses = coursesFilteredBySearch.filter(c => c.nivel === 'Medio');
    const advancedCourses = coursesFilteredBySearch.filter(c => c.nivel === 'Avanzado');

    return (
        <main className="aprende-page">
            <header className="aprende-header">
                <h1>Cursos</h1>
                <p>Explora nuestra biblioteca de cursos y lleva tus habilidades al siguiente nivel.</p>
            </header>
            <Filters 
                setSearchTerm={setSearchTerm} 
                setFilterLevel={handleFilterChange} 
                currentLevel={filterLevel} 
            />

            {view === 'carousels' ? (
                <>
                    <CourseCarousel title="Cursos Nivel Inicial" courses={initialCourses} onSeeAll={() => handleSeeAll('Inicial')} />
                    <CourseCarousel title="Cursos Nivel Medio" courses={mediumCourses} onSeeAll={() => handleSeeAll('Medio')} />
                    <CourseCarousel title="Cursos Nivel Avanzado" courses={advancedCourses} onSeeAll={() => handleSeeAll('Avanzado')} />
                    
                    <section className="course-section-page">
                        <h2>Todos los Cursos</h2>
                        <CourseGrid courses={coursesFilteredBySearch} />
                    </section>
                </>
            ) : (
                <section className="course-section-page">
                    <div className="grid-header-course">
                        <h2>{gridTitle}</h2>
                        <button onClick={() => handleFilterChange('Todos')} className="back-button-course">←  Volver a todos los cursos</button>
                    </div>
                    <CourseGrid courses={gridCourses.filter(course => course.titulo.toLowerCase().includes(searchTerm.toLowerCase()))} />
                </section>
            )}
        </main>
    );
};

export default Aprende;
