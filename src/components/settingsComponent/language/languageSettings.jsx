import React from 'react';
import { useState, useMemo } from 'react';
import { IoArrowBack, IoSearch, IoCheckmark } from 'react-icons/io5';
import { languages as allLanguages } from './languages';
import './languageSettings.css';

const LanguageSettings = ({ language, setLanguage, onBack, showConfirmation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleLanguageSelect = (code, name) => {
    if (code !== language) {
      showConfirmation(`Are you sure you want to change the language to ${name}?`, () => {
        setLanguage(code);
      });
    }
  };

  const languageList = useMemo(() => {
    return Object.entries(allLanguages).map(([code, { name, nativeName }]) => ({
      code,
      name,
      nativeName,
    }));
  }, []);

  const filteredLanguages = useMemo(() => {
    if (!searchTerm) {
      return languageList;
    }
    return languageList.filter(
      (lang) =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, languageList]);

  return (
    <div className="language-settings">
      <div className="language-header">
        <button onClick={onBack} className="back-button">
          <IoArrowBack />
        </button>
        <div className="header-text">
            <h2>Language</h2>
            <p>Choose your preferred language</p>
        </div>
      </div>

      <div className="search-bar-container">
        <IoSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for a language..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="language-list">
        {filteredLanguages.length > 0 ? (
          filteredLanguages.map(({ code, name, nativeName }) => (
            <li
              key={code}
              className={`language-item ${language === code ? 'active' : ''}`}
              onClick={() => handleLanguageSelect(code, name)}
            >
              <div className="language-info">
                <span className="language-name">{name}</span>
                <span className="language-native-name">{nativeName}</span>
              </div>
              {language === code && <IoCheckmark className="checkmark-icon" />}
            </li>
          ))
        ) : (
          <li className="no-results">No languages found.</li>
        )}
      </ul>
    </div>
  );
};

export default LanguageSettings;