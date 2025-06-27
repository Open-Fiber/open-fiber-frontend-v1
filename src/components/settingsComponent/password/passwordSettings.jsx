import React, { useState } from 'react';
import { IoArrowBack, IoLockClosed, IoEye, IoEyeOff, IoCheckmarkCircle, IoAlertCircle } from 'react-icons/io5';
import './passwordSettings.css';

const PasswordSettings = ({ onBack }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/(?=.*[a-z])/.test(password)) errors.push('One lowercase letter');
    if (!/(?=.*[A-Z])/.test(password)) errors.push('One uppercase letter');
    if (!/(?=.*\d)/.test(password)) errors.push('One number');
    if (!/(?=.*[!@#$%^&*])/.test(password)) errors.push('One special character');
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validatePassword(formData.newPassword);
    
    if (formData.newPassword !== formData.confirmPassword) {
      validationErrors.push('Passwords do not match');
    }
    
    if (!formData.currentPassword) {
      validationErrors.push('Current password is required');
    }

    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }, 3000);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="password-settings">
      <div className="password-header">
        <button
          onClick={onBack}
          className="back-button"
        >
          <IoArrowBack className="back-icon" />
        </button>
        <div>
          <h2 className="title">Password Settings</h2>
          <p className="subtitle">Update your security credentials</p>
        </div>
      </div>

      {success && (
        <div className="success-message">
          <IoCheckmarkCircle className="success-icon" />
          <span className="success-text">Password updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-section">
          <div className="form-group">
            <label className="form-label">
              Current Password
            </label>
            <div className="input-container">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="form-input"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="toggle-password"
              >
                {showPasswords.current ? 
                  <IoEyeOff className="toggle-icon" /> : 
                  <IoEye className="toggle-icon" />
                }
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              New Password
            </label>
            <div className="input-container">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="form-input"
                placeholder="Create a new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="toggle-password"
              >
                {showPasswords.new ? 
                  <IoEyeOff className="toggle-icon" /> : 
                  <IoEye className="toggle-icon" />
                }
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Confirm New Password
            </label>
            <div className="input-container">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="form-input"
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="toggle-password"
              >
                {showPasswords.confirm ? 
                  <IoEyeOff className="toggle-icon" /> : 
                  <IoEye className="toggle-icon" />
                }
              </button>
            </div>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="requirements">
            <h3 className="requirements-title">Password Requirements</h3>
            <ul className="requirement-list">
              {[
                'At least 8 characters',
                'One uppercase letter',
                'One lowercase letter',
                'One number',
                'One special character'
              ].map((req) => {
                const isValid = !validatePassword(formData.newPassword).includes(req);
                return (
                  <li key={req} className="requirement-item">
                    {isValid ? (
                      <IoCheckmarkCircle className="requirement-icon valid" />
                    ) : (
                      <IoAlertCircle className="requirement-icon" />
                    )}
                    <span className={isValid ? 'valid' : ''}>
                      {req}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="submit-button"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default PasswordSettings;