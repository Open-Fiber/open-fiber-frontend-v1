import React, { useState } from 'react';
import { IoArrowBack, IoPerson, IoCheckmarkCircle, IoAlertCircle, IoReload } from 'react-icons/io5';
import './usernameSettings.css';

const UsernameSettings = ({ onBack, showConfirmation }) => {
  const [currentUsername, setCurrentUsername] = useState('johndoe');
  const [newUsername, setNewUsername] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const checkUsernameAvailability = async (username) => {
    if (username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres');
      setIsAvailable(false);
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('El nombre de usuario puede contener solo letras, números y guiones bajos');
      setIsAvailable(false);
      return;
    }

    setIsChecking(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      const unavailableUsernames = ['admin', 'user', 'test', 'demo'];
      const available = !unavailableUsernames.includes(username.toLowerCase());
      setIsAvailable(available);
      setIsChecking(false);
      if (!available) {
        setError('El nombre de usuario ya está en uso');
      }
    }, 1000);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setNewUsername(value);
    setIsAvailable(null);
    setError('');
    
    if (value && value !== currentUsername) {
      checkUsernameAvailability(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAvailable && newUsername) {
      showConfirmation(`¿Estás seguro de que quieres cambiar tu nombre de usuario a "${newUsername}"?`, () => {
        setCurrentUsername(newUsername);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setNewUsername('');
          setIsAvailable(null);
        }, 3000);
      });
    }
  };

  return (
    <div className="username-settings">
      <div className="username-header">
        <button
          onClick={onBack}
          className="back-button"
        >
          <IoArrowBack className="back-icon" />
        </button>
        <div>
          <h2 className="title">Usuario</h2>
          <p className="subtitle">Cambia tu nombre de usuario</p>
        </div>
      </div>

      {success && (
        <div className="success-message">
          <IoCheckmarkCircle className="success-icon" />
          <span className="success-text">Nombre de usuario actualizado exitosamente!</span>
        </div>
      )}

      <div className="current-username-card">
        <div className="avatar-container">
          <div className="avatar">
            <IoPerson className="avatar-icon" />
          </div>
          <div>
            <h3 className="current-username">Nombre de usuario actual</h3>
            <p className="username-handle">@{currentUsername}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="username-form">
        <div className="form-group">
          <label className="form-label">
            Nuevo nombre de usuario
          </label>
          <div className="input-container">
            <input
              type="text"
              value={newUsername}
              onChange={handleUsernameChange}
              className={`form-input ${
                isAvailable === true
                  ? 'border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                  : isAvailable === false
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : ''
              }`}
              placeholder="Introduce un nuevo nombre de usuario"
            />
            {isChecking && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <IoReload className="loading-icon" />
              </div>
            )}
          </div>
          
          {isAvailable === true && (
            <div className="available">
              <IoCheckmarkCircle className="availability-icon" />
              <span>Nombre de usuario disponible!</span>
            </div>
          )}
          
          {isAvailable === false && (
            <div className="unavailable">
              <IoAlertCircle className="availability-icon" />
              <span>{error || 'Nombre de usuario no disponible'}</span>
            </div>
          )}
          
          <div className="mt-4 text-sm text-[#64748b]">
            <p>El nombre de usuario debe ser único y puede contener solo:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Letras (a-z, A-Z)</li>
              <li>Números (0-9)</li>
              <li>Guiones bajos (_)</li>
              <li>Mínimo 3 caracteres</li>
            </ul>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isAvailable || !newUsername || isChecking}
          className="submit-button"
        >
          Actualizar nombre de usuario
        </button>
      </form>
    </div>
  );
};

export default UsernameSettings;