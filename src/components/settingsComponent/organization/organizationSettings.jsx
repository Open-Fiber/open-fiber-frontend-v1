import  { useState, useMemo } from 'react';
import { IoArrowBack, IoSearch, IoAdd, IoTrash, IoPencil, IoBusiness, IoCheckmarkCircle, IoLocation, IoMail } from 'react-icons/io5';
import './organizationSettings.css';

// Datos simulados de organizaciones
const mockOrganizations = [
  {
    id: 1,
    nombre: 'Fab Lab Santa Cruz',
    descripcion: 'Fab Lab oficial de la unifranz en Santa Cruz',
    direccion: 'Unifranz - Santa Cruz',
    pais: 'Bolivia',
    telefono: '3843789723',
    pagina_url: 'https://fablabscz.org',
    logo_url: 'https://img1.wsimg.com/isteam/ip/3bd70cf6-3119-4a2e-bc7d-fceec99209a1/LogoTest.png/:/rs=w:311,h:150,cg:true,m/cr=w:311,h:150/qt=q:95',
    cuentaId: '1ba354dd-3eef-46a5-8d31-d90bb5f8a3ae'
  },
  {
    id: 2,
    nombre: 'TechCorp Solutions',
    descripcion: 'Empresa líder en soluciones tecnológicas y desarrollo de software',
    direccion: 'Av. Tecnológica 123, Ciudad Tech',
    pais: 'México',
    telefono: '+52-555-0123',
    pagina_url: 'https://techcorp.com',
    logo_url: null,
    cuentaId: '2ba354dd-3eef-46a5-8d31-d90bb5f8a3ae'
  },
  {
    id: 3,
    nombre: 'Global Marketing Inc',
    descripcion: 'Agencia de marketing digital y publicidad internacional',
    direccion: 'Plaza Comercial 456, Metro City',
    pais: 'Colombia',
    telefono: '+57-555-0456',
    pagina_url: 'https://globalmarketing.com',
    logo_url: null,
    cuentaId: '3ba354dd-3eef-46a5-8d31-d90bb5f8a3ae'
  },
  {
    id: 4,
    nombre: 'EduLearn Academy',
    descripcion: 'Institución educativa especializada en cursos online y capacitación profesional',
    direccion: 'Campus Universitario 789, Ciudad Académica',
    pais: 'Perú',
    telefono: '+51-555-0789',
    pagina_url: 'https://edulearn.edu',
    logo_url: null,
    cuentaId: '4ba354dd-3eef-46a5-8d31-d90bb5f8a3ae'
  },
  {
    id: 5,
    nombre: 'HealthCare Plus',
    descripcion: 'Clínica médica integral con servicios de salud especializados',
    direccion: 'Centro Médico 101, Ciudad Salud',
    pais: 'Chile',
    telefono: '+56-555-1010',
    pagina_url: 'https://healthcareplus.med',
    logo_url: null,
    cuentaId: '5ba354dd-3eef-46a5-8d31-d90bb5f8a3ae'
  },
  {
    id: 6,
    nombre: 'StartupHub',
    descripcion: 'Incubadora de startups y espacio de coworking para emprendedores',
    direccion: 'Innovation District 200, Startup City',
    pais: 'Argentina',
    telefono: '+54-555-1234',
    pagina_url: 'https://startuphub.co',
    logo_url: null,
    cuentaId: '6ba354dd-3eef-46a5-8d31-d90bb5f8a3ae'
  }
];

// eslint-disable-next-line react/prop-types
const OrganizationSettings = ({ onBack, showConfirmation }) => {
  const [organizations, setOrganizations] = useState(mockOrganizations);
  const [searchTerm, setSearchTerm] = useState('');
  const [success, setSuccess] = useState('');

  const getInitials = (nombre) => {
    if (!nombre) return '';
    const words = nombre.split(' ');
    return words.map(word => word[0]).join('').toUpperCase().slice(0, 3);
  };

  const handleDelete = (orgId, orgNombre) => {
    showConfirmation(
      `¿Estás seguro de que quieres eliminar la organización "${orgNombre}"? Esta acción no se puede deshacer.`,
      () => {
        setOrganizations(organizations.filter(organization => organization.id !== orgId));
        showSuccess(`Organización "${orgNombre}" eliminada exitosamente`);
      }
    );
  };

  const handleEdit = (orgId) => {
    showSuccess(`Editando organización con ID: ${orgId}`);
  };

  const handleCreate = () => {
    showSuccess('Abriendo formulario de creación de organización');
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  const filteredOrganizations = useMemo(() => {
    let filtered = organizations;

    if (searchTerm) {
      filtered = filtered.filter(org =>
        org.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.pais.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, organizations]);

  return (
    <div className="organization-settings">
      <div className="organization-header">
        <button onClick={onBack} className="back-button">
          <IoArrowBack />
        </button>
        <div className="header-text">
          <h2>Gestión de Organizaciones</h2>
          <p>Administra las organizaciones registradas en el sistema</p>
        </div>
      </div>

      {success && (
        <div className="success-message">
          <IoCheckmarkCircle className="success-icon" />
          <span className="success-text">{success}</span>
        </div>
      )}

      <div className="organization-controls">
        <div className="search-filter-container">
          <div className="search-container">
            <IoSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar organizaciones..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <button onClick={handleCreate} className="create-button">
          <IoAdd className="create-icon" />
          <span>Crear Organización</span>
        </button>
      </div>

      <div className="organizations-container">
        {filteredOrganizations.length > 0 ? (
          <div className="organizations-grid">
            {filteredOrganizations.map((org) => (
              <div key={org.id} className="organization-card">
                <div className="organization-card-header">
                  <div className="organization-logo-container">
                    {org.logo_url ? (
                      <img src={org.logo_url} alt={org.nombre} className="organization-logo" />
                    ) : (
                      <div className="organization-logo-placeholder">
                        <span className="logo-initials">{getInitials(org.nombre)}</span>
                      </div>
                    )}
                  </div>
                  <div className="organization-info">
                    <h3 className="organization-name">{org.nombre}</h3>
                    <p className="organization-description">{org.descripcion}</p>
                    <div className="organization-contact">
                      <span className="contact-item">
                        <IoMail className="contact-icon" />
                        {org.telefono}
                      </span>
                      <span className="contact-item">
                        <IoLocation className="contact-icon" />
                        {org.direccion}, {org.pais}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="organization-details">
                  <div className="organization-meta">
                    <span className="meta-label">País:</span>
                    <span className="meta-value">{org.pais}</span>
                  </div>
                  <div className="organization-meta">
                    <span className="meta-label">Teléfono:</span>
                    <span className="meta-value">{org.telefono}</span>
                  </div>
                  {org.pagina_url && (
                    <div className="organization-meta">
                      <span className="meta-label">Sitio web:</span>
                      <a href={org.pagina_url} target="_blank" rel="noopener noreferrer" className="meta-link">
                        {org.pagina_url}
                      </a>
                    </div>
                  )}
                </div>

                <div className="organization-footer">
                  <div className="account-id">
                    <span className="date-label">ID de cuenta:</span>
                    <span className="date-value">{org.cuentaId}</span>
                  </div>
                  
                  <div className="organization-actions">
                    <button
                      onClick={() => handleEdit(org.id)}
                      className="action-button edit-button"
                      title="Editar organización"
                    >
                      <IoPencil />
                    </button>
                    <button
                      onClick={() => handleDelete(org.id, org.nombre)}
                      className="action-button delete-button"
                      title="Eliminar organización"
                    >
                      <IoTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <IoBusiness className="no-results-icon" />
            <p>No se encontraron organizaciones</p>
            {searchTerm && (
              <p className="no-results-suggestion">
                Intenta ajustar la búsqueda o{' '}
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="clear-filters"
                >
                  limpiar búsqueda
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationSettings;
