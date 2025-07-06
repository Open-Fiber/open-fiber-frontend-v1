import React, { useRef } from 'react';
import CourseCard from './CourseCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CourseCarousel = ({ title, courses, onSeeAll }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollLeft -= 600;
    } else {
      current.scrollLeft += 600;
    }
  };

  return (
    <section className="course-section-page">
      <h2>{title}</h2>
      <div className="carousel-container-course">
        <button className="arrow-btn-course left" onClick={() => scroll('left')}><FaChevronLeft /></button>
        <div className="carousel-track-course" ref={scrollRef}>
          {courses.map((course, index) => <CourseCard key={course.id} course={course} index={index} />)}
          {courses.length > 0 && (
            <div className="see-all-card-course" onClick={onSeeAll}>
              <p>Ver todos los cursos de este nivel</p>
              <FaChevronRight className="arrow-icon-course"/>
            </div>
          )}
        </div>
        <button className="arrow-btn-course right" onClick={() => scroll('right')}><FaChevronRight /></button>
      </div>
    </section>
  );
};

export default CourseCarousel;
