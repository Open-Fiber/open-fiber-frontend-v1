import React, { useState, useMemo } from 'react';
import { IoArrowBack, IoSearch, IoCheckmarkCircle, IoChevronDown } from 'react-icons/io5';
import { countries as allCountries } from './countries';
import './countrySettings.css';

const INITIAL_LOAD_COUNT = 24;

const CountrySettings = ({ country, setCountry, onBack, showConfirmation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

  const handleCountrySelect = (code, name) => {
    if (code.toUpperCase() !== country) {
      showConfirmation(`Are you sure you want to set your country to ${name}?`, () => {
        setCountry(code.toUpperCase());
      });
    }
  };

  const filteredCountries = useMemo(() => {
    const results = allCountries.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Reset visible count when search term changes
    setVisibleCount(INITIAL_LOAD_COUNT);
    return results;
  }, [searchTerm]);

  const countriesToShow = useMemo(() => {
    return filteredCountries.slice(0, visibleCount);
  }, [filteredCountries, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + INITIAL_LOAD_COUNT);
  };

  return (
    <div className="country-settings">
      <div className="country-header">
        <button onClick={onBack} className="back-button">
          <IoArrowBack />
        </button>
        <div className="header-text">
          <h2>Pais</h2>
          <p>Seleccione su pais de residencia</p>
        </div>
      </div>

      <div className="search-bar-container">
        <IoSearch className="search-icon" />
        <input
          type="text"
          placeholder="Encuentra tu Pais"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="country-grid-container">
        {countriesToShow.map((loc) => (
          <div
            key={loc.code}
            className={`country-card ${country === loc.code.toUpperCase() ? 'active' : ''}`}
            onClick={() => handleCountrySelect(loc.code, loc.name)}
          >
            <div className="country-icon-container">
              <img
                src={`https://flagcdn.com/w40/${loc.code.toLowerCase()}.png`}
                alt={`${loc.name} flag`}
                className="country-flag-icon"
              />
            </div>
            <span className="country-name">{loc.name}</span>
            {country === loc.code.toUpperCase() && (
              <IoCheckmarkCircle className="checkmark-icon" />
            )}
          </div>
        ))}
        {filteredCountries.length === 0 && searchTerm && (
          <p className="no-results">No countries found.</p>
        )}
      </div>

      {visibleCount < filteredCountries.length && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-button">
            <span>Ver más</span>
            <IoChevronDown />
          </button>
        </div>
      )}
    </div>
  );
};

export default CountrySettings;