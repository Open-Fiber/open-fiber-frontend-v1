import { useState, useEffect } from 'react';
import { IoClose, IoBusiness, IoLocation, IoCall, IoGlobe, IoSave, IoAdd } from 'react-icons/io5';
import './OrganizationForm.css';

// eslint-disable-next-line react/prop-types
const OrganizationForm = ({ organization, isOpen, onClose, onSave, isEditing = false }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    direccion: '',
    pais: '',
    telefono: '',
    pagina_url: '',
    logo_url: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (isEditing && organization) {
        setFormData({
          nombre: organization.nombre || '',
          descripcion: organization.descripcion || '',
          direccion: organization.direccion || '',
          pais: organization.pais || '',
          telefono: organization.telefono || '',
          pagina_url: organization.pagina_url || '',
          logo_url: organization.logo_url || ''
        });
      } else {
        // Reset form for create mode
        setFormData({
          nombre: '',
          descripcion: '',
          direccion: '',
          pais: '',
          telefono: '',
          pagina_url: '',
          logo_url: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, isEditing, organization]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    }

    if (!formData.pais.trim()) {
      newErrors.pais = 'El país es requerido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    if (formData.pagina_url && !isValidUrl(formData.pagina_url)) {
      newErrors.pagina_url = 'Ingresa una URL válida';
    }

    if (formData.logo_url && !isValidUrl(formData.logo_url)) {
      newErrors.logo_url = 'Ingresa una URL válida para el logo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const organizationData = {
        ...formData,
        ...(isEditing && organization ? { id: organization.id, cuentaId: organization.cuentaId } : {})
      };
      
      await onSave(organizationData);
      onClose();
    } catch (error) {
      console.error('Error saving organization:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="form-overlay" onClick={handleClose}>
      <div className="form-content" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <div className="form-title-section">
            <h2 className="form-title">
              {isEditing ? (
                <>
                  <IoBusiness className="form-title-icon" />
                  Editar Organización
                </>
              ) : (
                <>
                  <IoAdd className="form-title-icon" />
                  Crear Nueva Organización
                </>
              )}
            </h2>
            <p className="form-subtitle">
              {isEditing 
                ? 'Modifica los datos de la organización' 
                : 'Completa los datos para registrar una nueva organización'
              }
            </p>
          </div>
          <button 
            className="form-close-button" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="organization-form">
          <div className="form-body">
            <div className="form-section">
              <h3 className="section-title">
                <IoBusiness className="section-icon" />
                Información Básica
              </h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nombre" className="form-label">
                    Nombre de la Organización *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={`form-input ${errors.nombre ? 'error' : ''}`}
                    placeholder="Ej: Fab Lab Santa Cruz"
                    disabled={isSubmitting}
                  />
                  {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción *
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    className={`form-textarea ${errors.descripcion ? 'error' : ''}`}
                    placeholder="Describe brevemente la organización..."
                    rows="2"
                    disabled={isSubmitting}
                  />
                  {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">
                <IoLocation className="section-icon" />
                Información de Contacto
              </h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="direccion" className="form-label">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className={`form-input ${errors.direccion ? 'error' : ''}`}
                    placeholder="Ej: Unifranz - Santa Cruz"
                    disabled={isSubmitting}
                  />
                  {errors.direccion && <span className="error-message">{errors.direccion}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="pais" className="form-label">
                    País *
                  </label>
                  <input
                    type="text"
                    id="pais"
                    name="pais"
                    value={formData.pais}
                    onChange={handleInputChange}
                    className={`form-input ${errors.pais ? 'error' : ''}`}
                    placeholder="Ej: Bolivia"
                    disabled={isSubmitting}
                  />
                  {errors.pais && <span className="error-message">{errors.pais}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="telefono" className="form-label">
                    <IoCall className="label-icon" />
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className={`form-input ${errors.telefono ? 'error' : ''}`}
                    placeholder="Ej: 3843789723"
                    disabled={isSubmitting}
                  />
                  {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="pagina_url" className="form-label">
                    <IoGlobe className="label-icon" />
                    Sitio Web
                  </label>
                  <input
                    type="url"
                    id="pagina_url"
                    name="pagina_url"
                    value={formData.pagina_url}
                    onChange={handleInputChange}
                    className={`form-input ${errors.pagina_url ? 'error' : ''}`}
                    placeholder="https://ejemplo.com"
                    disabled={isSubmitting}
                  />
                  {errors.pagina_url && <span className="error-message">{errors.pagina_url}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="logo_url" className="form-label">
                    URL del Logo
                  </label>
                  <input
                    type="url"
                    id="logo_url"
                    name="logo_url"
                    value={formData.logo_url}
                    onChange={handleInputChange}
                    className={`form-input ${errors.logo_url ? 'error' : ''}`}
                    placeholder="https://ejemplo.com/logo.png"
                    disabled={isSubmitting}
                  />
                  {errors.logo_url && <span className="error-message">{errors.logo_url}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button 
              type="button" 
              className="form-button secondary" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="form-button primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Guardando...'
              ) : (
                <>
                  <IoSave className="button-icon" />
                  {isEditing ? 'Actualizar' : 'Crear Organización'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationForm;
