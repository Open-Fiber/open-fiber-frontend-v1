import React from 'react';

const CourseCard = ({ course, index }) => {
  const style = {
    animationDelay: `${index * 100}ms`,
    animationFillMode: 'forwards' // Asegura que el estado final de la animación persista
  };

  return (
    <div className="course-card-page" style={style}>
      <div className="card-thumbnail-course">
        <img src={course.miniatura} alt={course.titulo} />
        {course.nuevo && <span className="new-badge-course">NUEVO</span>}
        <div className="card-level-course">
          <span>{course.nivel}</span>
        </div>
      </div>
      <div className="card-content-course">
        <img src={course.fotoPerfil} alt={course.creadorId} className="creator-photo-course" />
        <div className="card-info-course">
          <h3>{course.titulo}</h3>
          <p>Por {course.creadorId}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
