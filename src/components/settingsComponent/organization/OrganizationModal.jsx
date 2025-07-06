/* eslint-disable react/prop-types */
import { IoClose, IoLocation, IoCall, IoGlobe, IoBusiness, IoCalendar } from 'react-icons/io5';
import './OrganizationModal.css';

const OrganizationModal = ({ organization, isOpen, onClose }) => {
  if (!isOpen || !organization) return null;

  const getInitials = (nombre) => {
    if (!nombre) return '';
    const words = nombre.split(' ');
    return words.map(word => word[0]).join('').toUpperCase().slice(0, 3);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-organization-info">
            <div className="modal-logo-container">
              {organization.logo_url ? (
                <img src={organization.logo_url} alt={organization.nombre} className="modal-logo" />
              ) : (
                <div className="modal-logo-placeholder">
                  <span className="modal-logo-initials">{getInitials(organization.nombre)}</span>
                </div>
              )}
            </div>
            <div className="modal-title-section">
              <h2 className="modal-title">{organization.nombre}</h2>
              <p className="modal-subtitle">{organization.descripcion}</p>
            </div>
          </div>
          <button className="modal-close-button" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-column-left">
            <div className="modal-section">
              <h3 className="section-title">
                <IoLocation className="section-icon" />
                Información de Contacto
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">
                    <IoCall className="info-icon" />
                    Teléfono
                  </span>
                  <span className="info-value">{organization.telefono || 'No disponible'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">
                    <IoLocation className="info-icon" />
                    Dirección
                  </span>
                  <span className="info-value">{organization.direccion || 'No disponible'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">
                    <IoLocation className="info-icon" />
                    País
                  </span>
                  <span className="info-value">{organization.pais || 'No disponible'}</span>
                </div>
                {organization.pagina_url && (
                  <div className="info-item">
                    <span className="info-label">
                      <IoGlobe className="info-icon" />
                      Sitio Web
                    </span>
                    <a 
                      href={organization.pagina_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="info-link"
                    >
                      {organization.pagina_url}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-column-right">
            <div className="modal-section">
              <h3 className="section-title">
                <IoBusiness className="section-icon" />
                Información de la Cuenta
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">
                    <IoBusiness className="info-icon" />
                    ID de Cuenta
                  </span>
                  <span className="info-value account-id">{organization.cuentaId}</span>
                </div>
                {organization.createdAt && (
                  <div className="info-item">
                    <span className="info-label">
                      <IoCalendar className="info-icon" />
                      Fecha de Registro
                    </span>
                    <span className="info-value">{formatDate(organization.createdAt)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-section">
              <h3 className="section-title">Descripción</h3>
              <p className="description-text">{organization.descripcion || 'No hay descripción disponible'}</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-button secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationModal;
