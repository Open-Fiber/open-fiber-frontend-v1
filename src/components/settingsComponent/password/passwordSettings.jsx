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
    const requirements = {
      'Al menos 8 caracteres': password.length >= 8,
      'Una letra mayúscula': /[A-Z]/.test(password),
      'Una letra minúscula': /[a-z]/.test(password),
      'Un número': /\d/.test(password),
      'Un carácter especial': /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    return Object.entries(requirements)
      .filter(([_, isValid]) => !isValid)
      .map(([requirement]) => requirement);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = [];
    const passwordErrors = validatePassword(formData.newPassword);
    
    if (passwordErrors.length > 0) {
      validationErrors.push(...passwordErrors);
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      validationErrors.push('Las contraseñas no coinciden');
    }
    
    if (!formData.currentPassword) {
      validationErrors.push('La contraseña actual es requerida');
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
          <h2 className="title">Contraseña</h2>
          <p className="subtitle">Actualiza tus credenciales de seguridad</p>
        </div>
      </div>

      {success && (
        <div className="success-message">
          <IoCheckmarkCircle className="success-icon" />
          <span className="success-text">Contraseña actualizada exitosamente!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-section">
          <div className="form-group">
            <label className="form-label">
              Contraseña actual
            </label>
            <div className="input-container">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="form-input"
                placeholder="Introduce tu contraseña actual"
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
              Nueva Contraseña
            </label>
            <div className="input-container">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="form-input"
                placeholder="Introduce tu nueva contraseña"
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
              Confirmar Nueva Contraseña
            </label>
            <div className="input-container">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="form-input"
                placeholder="Confirma tu nueva contraseña"
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
            <h3 className="requirements-title">Requisitos de Contraseña</h3>
            <ul className="requirement-list">
              {[
                'Al menos 8 caracteres',
                'Una letra mayúscula',
                'Una letra minúscula',
                'Un número',
                'Un carácter especial'
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
          Actualizar Contraseña
        </button>
      </form>
    </div>
  );
};

export default PasswordSettings;