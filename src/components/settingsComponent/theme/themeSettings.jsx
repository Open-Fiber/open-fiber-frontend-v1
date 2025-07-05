import React from 'react';
import { IoArrowBackOutline, IoSunny, IoMoon, IoColorPaletteOutline } from 'react-icons/io5';
import './themeSettings.css';

const themeSettings = ({ theme, setTheme, onBack, showConfirmation }) => {
    const handleThemeSelect = (themeOption) => {
    if (themeOption.id !== theme) {
      showConfirmation(`Are you sure you want to switch to ${themeOption.name}?`, () => {
        setTheme(themeOption.id);
      });
    }
  };

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Clean and bright interface',
      icon: IoSunny,
      preview: 'bg-gradient-to-br from-white to-gray-100'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes',
      icon: IoMoon,
      preview: 'bg-gradient-to-br from-gray-800 to-gray-900'
    }
  ];

  return (
    <div className="theme-settings">
      <div className="theme-header">
        <button
          onClick={onBack}
          className="back-button"
        >
          <IoArrowBackOutline className="back-icon" />
        </button>
        <div>
          <h2 className="title">Theme Settings</h2>
          <p className="subtitle">Customize your visual experience</p>
        </div>
      </div>

      <div className="themes-grid">
        {themes.map((themeOption) => {
          const IconComponent = themeOption.icon;
          return (
            <button
              key={themeOption.id}
              onClick={() => handleThemeSelect(themeOption)}
              className={`theme-option ${theme === themeOption.id ? 'active' : ''}`}
            >
              <div className="theme-content">
                <div className={`theme-preview ${themeOption.preview.includes('from-white') ? 'light-preview' : 'dark-preview'}`}>
                  <IconComponent className="theme-icon" />
                </div>
                <div className="theme-info">
                  <h3 className="theme-name">{themeOption.name}</h3>
                  <p className="theme-description">
                    {themeOption.description}
                  </p>
                </div>
              </div>
              {theme === themeOption.id && (
                <div className="active-indicator">
                  <div className="active-dot"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>


    </div>
  );
};

export default themeSettings;