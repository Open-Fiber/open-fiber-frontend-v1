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
      setError('Username must be at least 3 characters');
      setIsAvailable(false);
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores');
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
        setError('Username is already taken');
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
      showConfirmation(`Are you sure you want to change your username to "${newUsername}"?`, () => {
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
          <h2 className="title">Username Settings</h2>
          <p className="subtitle">Change your display name</p>
        </div>
      </div>

      {success && (
        <div className="success-message">
          <IoCheckmarkCircle className="success-icon" />
          <span className="success-text">Username updated successfully!</span>
        </div>
      )}

      <div className="current-username-card">
        <div className="avatar-container">
          <div className="avatar">
            <IoPerson className="avatar-icon" />
          </div>
          <div>
            <h3 className="current-username">Current Username</h3>
            <p className="username-handle">@{currentUsername}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="username-form">
        <div className="form-group">
          <label className="form-label">
            New Username
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
              placeholder="Enter a new username"
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
              <span>Username is available!</span>
            </div>
          )}
          
          {isAvailable === false && (
            <div className="unavailable">
              <IoAlertCircle className="availability-icon" />
              <span>{error || 'Username is not available'}</span>
            </div>
          )}
          
          <div className="mt-4 text-sm text-[#64748b]">
            <p>Your username must be unique and can only contain:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Letters (a-z, A-Z)</li>
              <li>Numbers (0-9)</li>
              <li>Underscores (_)</li>
              <li>Minimum 3 characters</li>
            </ul>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isAvailable || !newUsername || isChecking}
          className="submit-button"
        >
          Update Username
        </button>
      </form>
    </div>
  );
};

export default UsernameSettings;