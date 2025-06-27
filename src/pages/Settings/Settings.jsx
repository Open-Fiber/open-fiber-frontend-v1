import React, { useState } from 'react';
import { IoSettings, IoGlobe, IoColorPaletteOutline, IoLockClosed, IoPerson, IoChevronForward, IoFlag } from 'react-icons/io5';
import './Settings.css';
import LanguageSettings from '../../components/settingsComponent/language/languageSettings';
import ThemeSettings from '../../components/settingsComponent/theme/themeSettings';
import PasswordSettings from '../../components/settingsComponent/password/passwordSettings';
import UsernameSettings from '../../components/settingsComponent/username/usernameSettings';
import ConfirmationDialog from '../../components/settingsComponent/ConfirmationDialog/ConfirmationDialog';
import CountrySettings from '../../components/settingsComponent/country/countrySettings';

const Settings = () => {
  // Placeholder for user data. In a real app, this would come from an auth context or API.
  const [user, setUser] = useState({ name: 'John Doe', profileImageUrl: null });

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  };
  const [activeSection, setActiveSection] = useState('overview');
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('US');
  const [dialog, setDialog] = useState({ isOpen: false, message: '', onConfirm: () => {} });

  const showConfirmationDialog = (message, onConfirm) => {
    setDialog({ isOpen: true, message, onConfirm });
  };

  const handleConfirm = () => {
    dialog.onConfirm();
    setDialog({ isOpen: false, message: '', onConfirm: () => {} });
  };

  const handleCancel = () => {
    setDialog({ isOpen: false, message: '', onConfirm: () => {} });
  };

  const settingsItems = [
     {
       id: 'username',
       title: 'Nombre de usuario',
       description: 'Cambia tu nombre de usuario',
       icon: IoPerson,
       color: 'from-green-500 to-teal-600'
     },
     {
       id: 'password',
       title: 'Contraseña',
       description: 'Cambia tu contraseña',
       icon: IoLockClosed,
       color: 'from-red-500 to-orange-600'
     },
    {
      id: 'language',
      title: 'Lenguaje',
      description: 'Cambia tu lenguaje',
      icon: IoGlobe,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'pais',
      title: 'Pais',
      description: 'Cambia tu pais',
      icon: IoFlag,
      color: 'from-blue-500 to-purple-600'
    }
    
  ];
/*
   ,{
      id: 'theme',
      title: 'Theme',
      description: 'Customize your visual experience',
      icon: IoColorPaletteOutline,
      color: 'from-purple-500 to-pink-600'
    },
*/
  const renderContent = () => {
    switch (activeSection) {
            case 'language':
        return <LanguageSettings language={language} setLanguage={setLanguage} onBack={() => setActiveSection('overview')} showConfirmation={showConfirmationDialog} />;
            case 'theme':
        return <ThemeSettings theme={theme} setTheme={setTheme} onBack={() => setActiveSection('overview')} showConfirmation={showConfirmationDialog} />;
      case 'password':
        return <PasswordSettings onBack={() => setActiveSection('overview')} />;
      case 'username':
        return <UsernameSettings onBack={() => setActiveSection('overview')} showConfirmation={showConfirmationDialog} />;
      case 'pais':
        return <CountrySettings country={country} setCountry={setCountry} onBack={() => setActiveSection('overview')} showConfirmation={showConfirmationDialog} />;
      default:
        return (
          <div className="settings-overview">
                        <div className="settings-header">
              <div className="avatar-placeholder">
                {user.profileImageUrl ? (
                  <img src={user.profileImageUrl} alt="Profile" className="avatar-image" />
                ) : (
                  <span className="avatar-initials">{getInitials(user.name)}</span>
                )}
              </div>
              <h1 className="settings-title">{user.name}</h1>
              <p className="settings-subtitle">Manage your account and preferences</p>
            </div>

            <div className="settings-grid">
              {settingsItems.map((item) => {
                const IconComponent = item.icon;
                // Map the color prop to the appropriate gradient class
                let gradientClass = '';
                if (item.color.includes('blue-500')) gradientClass = 'bg-gradient-blue';
                else if (item.color.includes('purple-500')) gradientClass = 'bg-gradient-purple';
                else if (item.color.includes('red-500')) gradientClass = 'bg-gradient-red';
                else if (item.color.includes('green-500')) gradientClass = 'bg-gradient-green';

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="settings-item"
                  >
                    <div className="settings-item-content">
                      <div className="settings-item-main">
                        <div className={`settings-item-icon ${gradientClass}`}>
                          <IconComponent />
                        </div>
                        <div className="settings-item-text">
                          <h3 className="settings-item-title">
                            {item.title}
                          </h3>
                          <p className="settings-item-description">{item.description}</p>
                        </div>
                      </div>
                      <IoChevronForward className="settings-item-arrow" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="settings-container">
      <ConfirmationDialog 
        isOpen={dialog.isOpen} 
        message={dialog.message} 
        onConfirm={handleConfirm} 
        onCancel={handleCancel} 
      />
      <div className="background-elements">
        <div className="background-circle top-right"></div>
        <div className="background-circle bottom-left"></div>
      </div>

      <div className="settings-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;