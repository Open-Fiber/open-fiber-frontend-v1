import React from 'react';
import { IoArrowBack, IoGlobe, IoCheckmark } from 'react-icons/io5';
import './languageSettings.css';

const LanguageSettings = ({ language, setLanguage, onBack, showConfirmation }) => {
    const handleLanguageSelect = (lang) => {
    if (lang.code !== language) {
      showConfirmation(`Are you sure you want to change the language to ${lang.name}?`, () => {
        setLanguage(lang.code);
      });
    }
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  return (
    <div className="language-settings">
      <div className="language-header">
        <button
          onClick={onBack}
          className="back-button"
        >
          <IoArrowBack className="back-icon" />
        </button>
        <div>
          <h2 className="title">Idioma</h2>
          <p className="subtitle">Elige tu idioma preferido</p>
        </div>
      </div>

      <div className="languages-list">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang)}
            className={`language-option ${language === lang.code ? 'active' : ''}`}
          >
            <div className="language-content">
              <div className="language-info">
                <span className="flag">{lang.flag}</span>
                <span className="language-name">{lang.name}</span>
              </div>
              {language === lang.code && (
                <div className="active-indicator">
                  <IoCheckmark className="check-icon" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

    </div>
  );
};

export default LanguageSettings;