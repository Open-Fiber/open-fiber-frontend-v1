import React, { useState, useEffect, useCallback } from 'react';
import CourseCard from './CourseCard';
import '../../styles/components/aprende/courseGrid.css';

const CourseGrid = ({ courses }) => {
    const [visibleCourses, setVisibleCourses] = useState([]);
    const [page, setPage] = useState(1);
    const coursesPerPage = 8;

    const loadMoreCourses = useCallback(() => {
        const newPage = page + 1;
        const newCourses = courses.slice(0, newPage * coursesPerPage);
        setVisibleCourses(newCourses);
        setPage(newPage);
    }, [page, courses, coursesPerPage]);

    useEffect(() => {
        // Carga inicial
        setVisibleCourses(courses.slice(0, coursesPerPage));
        setPage(1);
    }, [courses, coursesPerPage]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                loadMoreCourses();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreCourses]);

    return (
        <div className="course-grid-container">
            {visibleCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
            ))}
        </div>
    );
};

export default CourseGrid;
