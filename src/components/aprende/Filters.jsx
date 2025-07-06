import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Filters = ({ setSearchTerm, setFilterLevel, currentLevel }) => {
  const levels = ['Todos', 'Inicial', 'Medio', 'Avanzado'];

  return (
    <div className="filters-container-course">
      <div className="search-bar-course">
        <FaSearch className="search-icon-course" />
        <input 
          type="text" 
          placeholder="Busca cursos por nombre..." 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="level-filters-course">
        {levels.map(level => (
          <button 
            key={level}
            className={`filter-btn-course ${currentLevel === level ? 'active' : ''}`}
            onClick={() => setFilterLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
