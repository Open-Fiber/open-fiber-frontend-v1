import React, { useState } from 'react';
import { IoArrowBack, IoCheckmark, IoSaveOutline } from 'react-icons/io5';
import './countrySettings.css';

const CountrySettings = ({ country: currentCountry, setCountry, onBack, showConfirmation }) => {
    const handleCountrySelect = (loc) => {
    if (loc.code.toUpperCase() !== currentCountry) {
      showConfirmation(`Are you sure you want to set your country to ${loc.name}?`, () => {
        setCountry(loc.code.toUpperCase());
      });
    }
  };

  const countries = [
    { code: 'bo', name: 'Bolivia' },
    { code: 'us', name: 'United States' },
    { code: 'br', name: 'Brazil' },
    { code: 'es', name: 'Spain' },
    { code: 'fr', name: 'France' },
    { code: 'de', name: 'Germany' },
    { code: 'it', name: 'Italy' },
    { code: 'pt', name: 'Portugal' },
    { code: 'ru', name: 'Russia' },
    { code: 'jp', name: 'Japan' },
    { code: 'kr', name: 'South Korea' },
    { code: 'cn', name: 'China' },
    { code: 'mx', name: 'Mexico' },
    { code: 'ca', name: 'Canada' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'ar', name: 'Argentina' },
    { code: 'au', name: 'Australia' },
    { code: 'nz', name: 'New Zealand' },
    { code: 'in', name: 'India' },
    { code: 'pk', name: 'Pakistan' },
    { code: 'ir', name: 'Iran'}
  ];

  return (
    <div className="country-settings">
      <div className="country-header">
        <button
          onClick={onBack}
          className="back-button"
        >
          <IoArrowBack className="back-icon" />
        </button>
        <div>
          <h2 className="title">Country Settings</h2>
          <p className="subtitle">Choose your country</p>
        </div>
      </div>

      <div className="countries-list">
        {countries.map((loc) => (
          <button
            key={loc.code}
            onClick={() => handleCountrySelect(loc)}
            className={`country-option ${currentCountry === loc.code.toUpperCase() ? 'active' : ''}`}
          >
            <img
              src={`https://flagcdn.com/w80/${loc.code}.png`}
              alt={`${loc.name} flag`}
              className="flag-icon"
            />
            <span className="country-name">{loc.name}</span>
            {currentCountry === loc.code.toUpperCase() && (
              <div className="active-indicator">
                <IoCheckmark className="check-icon" />
              </div>
            )}
          </button>
        ))}
      </div>


    </div>
  );
};

export default CountrySettings;