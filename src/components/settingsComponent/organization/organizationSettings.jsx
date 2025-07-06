import  { useState, useMemo } from 'react';
import { IoArrowBack, IoSearch, IoAdd, IoTrash, IoPencil, IoBusiness, IoCheckmarkCircle, IoLocation, IoPeople, IoMail } from 'react-icons/io5';
import './organizationSettings.css';

// Datos simulados de organizaciones
const mockOrganizations = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    displayName: 'TechCorp Solutions S.A.',
    description: 'Empresa líder en soluciones tecnológicas y desarrollo de software',
    type: 'Empresa',
    industry: 'Tecnología',
    logo: null,
    website: 'https://techcorp.com',
    email: 'info@techcorp.com',
    phone: '+1-555-0123',
    address: {
      street: 'Av. Tecnológica 123',
      city: 'Ciudad Tech',
      state: 'Estado Digital',
      country: 'País Virtual',
      zipCode: '12345'
    },
    employees: 250,
    departments: ['TI', 'Desarrollo', 'Marketing', 'Ventas'],
    status: 'activa',
    createdAt: '2024-01-15T10:00:00Z',
    subscription: 'Enterprise'
  },
  {
    id: 2,
    name: 'Global Marketing Inc',
    displayName: 'Global Marketing Inc.',
    description: 'Agencia de marketing digital y publicidad internacional',
    type: 'Agencia',
    industry: 'Marketing',
    logo: null,
    website: 'https://globalmarketing.com',
    email: 'contact@globalmarketing.com',
    phone: '+1-555-0456',
    address: {
      street: 'Plaza Comercial 456',
      city: 'Metro City',
      state: 'Estado Central',
      country: 'País Global',
      zipCode: '67890'
    },
    employees: 125,
    departments: ['Creatividad', 'Estrategia', 'Cuentas', 'Producción'],
    status: 'activa',
    createdAt: '2024-02-01T14:30:00Z',
    subscription: 'Professional'
  },
  {
    id: 3,
    name: 'EduLearn Academy',
    displayName: 'Academia EduLearn',
    description: 'Institución educativa especializada en cursos online y capacitación profesional',
    type: 'Educativa',
    industry: 'Educación',
    logo: null,
    website: 'https://edulearn.edu',
    email: 'admisiones@edulearn.edu',
    phone: '+1-555-0789',
    address: {
      street: 'Campus Universitario 789',
      city: 'Ciudad Académica',
      state: 'Estado Educativo',
      country: 'País Académico',
      zipCode: '11111'
    },
    employees: 85,
    departments: ['Académico', 'Administración', 'TI', 'Estudiantes'],
    status: 'activa',
    createdAt: '2024-01-20T09:15:00Z',
    subscription: 'Standard'
  },
  {
    id: 4,
    name: 'HealthCare Plus',
    displayName: 'HealthCare Plus Clinic',
    description: 'Clínica médica integral con servicios de salud especializados',
    type: 'Clínica',
    industry: 'Salud',
    logo: null,
    website: 'https://healthcareplus.med',
    email: 'info@healthcareplus.med',
    phone: '+1-555-1010',
    address: {
      street: 'Centro Médico 101',
      city: 'Ciudad Salud',
      state: 'Estado Médico',
      country: 'País Saludable',
      zipCode: '22222'
    },
    employees: 150,
    departments: ['Medicina General', 'Especialidades', 'Enfermería', 'Administración'],
    status: 'activa',
    createdAt: '2024-02-10T11:45:00Z',
    subscription: 'Professional'
  },
  {
    id: 5,
    name: 'StartupHub',
    displayName: 'StartupHub Incubadora',
    description: 'Incubadora de startups y espacio de coworking para emprendedores',
    type: 'Incubadora',
    industry: 'Emprendimiento',
    logo: null,
    website: 'https://startuphub.co',
    email: 'hello@startuphub.co',
    phone: '+1-555-1234',
    address: {
      street: 'Innovation District 200',
      city: 'Startup City',
      state: 'Estado Innovador',
      country: 'País Emprendedor',
      zipCode: '33333'
    },
    employees: 45,
    departments: ['Incubación', 'Mentoría', 'Eventos', 'Comunidad'],
    status: 'activa',
    createdAt: '2024-03-01T16:20:00Z',
    subscription: 'Standard'
  },
  {
    id: 6,
    name: 'Legacy Corp',
    displayName: 'Legacy Corporation',
    description: 'Corporación tradicional en proceso de transformación digital',
    type: 'Corporación',
    industry: 'Manufactura',
    logo: null,
    website: 'https://legacycorp.com',
    email: 'contact@legacycorp.com',
    phone: '+1-555-5678',
    address: {
      street: 'Industrial Park 500',
      city: 'Manufacturing City',
      state: 'Estado Industrial',
      country: 'País Manufacturero',
      zipCode: '44444'
    },
    employees: 500,
    departments: ['Producción', 'Calidad', 'Logística', 'TI'],
    status: 'inactiva',
    createdAt: '2023-12-15T08:30:00Z',
    subscription: 'Basic'
  }
];

const types = ['Todos', 'Empresa', 'Agencia', 'Educativa', 'Clínica', 'Incubadora', 'Corporación'];
const industries = ['Todos', 'Tecnología', 'Marketing', 'Educación', 'Salud', 'Emprendimiento', 'Manufactura'];
const statuses = ['Todos', 'activa', 'inactiva', 'suspendida'];
const subscriptions = ['Todos', 'Basic', 'Standard', 'Professional', 'Enterprise'];

const OrganizationSettings = ({ onBack, showConfirmation }) => {
  const [organizations, setOrganizations] = useState(mockOrganizations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedIndustry, setSelectedIndustry] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedSubscription, setSelectedSubscription] = useState('Todos');
  const [success, setSuccess] = useState('');

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    return words.map(word => word[0]).join('').toUpperCase().slice(0, 3);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleDelete = (orgId, orgName) => {
    const org = organizations.find(o => o.id === orgId);
    if (org.employees > 0) {
      showConfirmation(
        `La organización "${orgName}" tiene ${org.employees} empleado(s). ¿Estás seguro de que quieres eliminarla? Esta acción no se puede deshacer.`,
        () => {
          setOrganizations(organizations.filter(organization => organization.id !== orgId));
          showSuccess(`Organización "${orgName}" eliminada exitosamente`);
        }
      );
    } else {
      showConfirmation(
        `¿Estás seguro de que quieres eliminar la organización "${orgName}"? Esta acción no se puede deshacer.`,
        () => {
          setOrganizations(organizations.filter(organization => organization.id !== orgId));
          showSuccess(`Organización "${orgName}" eliminada exitosamente`);
        }
      );
    }
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
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'Todos') {
      filtered = filtered.filter(org => org.type === selectedType);
    }

    if (selectedIndustry !== 'Todos') {
      filtered = filtered.filter(org => org.industry === selectedIndustry);
    }

    if (selectedStatus !== 'Todos') {
      filtered = filtered.filter(org => org.status === selectedStatus);
    }

    if (selectedSubscription !== 'Todos') {
      filtered = filtered.filter(org => org.subscription === selectedSubscription);
    }

    return filtered;
  }, [searchTerm, selectedType, selectedIndustry, selectedStatus, selectedSubscription, organizations]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      'activa': 'status-active',
      'inactiva': 'status-inactive',
      'suspendida': 'status-suspended'
    };
    return statusClasses[status] || 'status-default';
  };

  const getSubscriptionColor = (subscription) => {
    const subscriptionColors = {
      'Basic': 'subscription-basic',
      'Standard': 'subscription-standard',
      'Professional': 'subscription-professional',
      'Enterprise': 'subscription-enterprise'
    };
    return subscriptionColors[subscription] || 'subscription-default';
  };

  const getTypeColor = (type) => {
    const typeColors = {
      'Empresa': 'type-empresa',
      'Agencia': 'type-agencia',
      'Educativa': 'type-educativa',
      'Clínica': 'type-clinica',
      'Incubadora': 'type-incubadora',
      'Corporación': 'type-corporacion'
    };
    return typeColors[type] || 'type-default';
  };

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
          
          <div className="filters-container">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="filter-select"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'Todos' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            
            <select
              value={selectedSubscription}
              onChange={(e) => setSelectedSubscription(e.target.value)}
              className="filter-select"
            >
              {subscriptions.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
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
                    {org.logo ? (
                      <img src={org.logo} alt={org.name} className="organization-logo" />
                    ) : (
                      <div className="organization-logo-placeholder">
                        <span className="logo-initials">{getInitials(org.name)}</span>
                      </div>
                    )}
                  </div>
                  <div className="organization-info">
                    <h3 className="organization-name">{org.displayName}</h3>
                    <p className="organization-description">{org.description}</p>
                    <div className="organization-contact">
                      <span className="contact-item">
                        <IoMail className="contact-icon" />
                        {org.email}
                      </span>
                      <span className="contact-item">
                        <IoLocation className="contact-icon" />
                        {org.address.city}, {org.address.country}
                      </span>
                    </div>
                  </div>
                  <div className={`organization-status ${getStatusBadge(org.status)}`}>
                    {org.status}
                  </div>
                </div>
                
                <div className="organization-details">
                  <div className="organization-meta">
                    <span className="meta-label">Tipo:</span>
                    <span className={`type-badge ${getTypeColor(org.type)}`}>
                      {org.type}
                    </span>
                  </div>
                  <div className="organization-meta">
                    <span className="meta-label">Industria:</span>
                    <span className="meta-value">{org.industry}</span>
                  </div>
                  <div className="organization-meta">
                    <span className="meta-label">Suscripción:</span>
                    <span className={`subscription-badge ${getSubscriptionColor(org.subscription)}`}>
                      {org.subscription}
                    </span>
                  </div>
                </div>

                <div className="organization-stats">
                  <div className="stat-item">
                    <IoPeople className="stat-icon" />
                    <div className="stat-text">
                      <span className="stat-value">{org.employees}</span>
                      <span className="stat-label">Empleados</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <IoBusiness className="stat-icon" />
                    <div className="stat-text">
                      <span className="stat-value">{org.departments.length}</span>
                      <span className="stat-label">Departamentos</span>
                    </div>
                  </div>
                </div>

                <div className="organization-departments">
                  <h4>Departamentos:</h4>
                  <div className="departments-list">
                    {org.departments.slice(0, 3).map((dept, index) => (
                      <span key={index} className="department-tag">
                        {dept}
                      </span>
                    ))}
                    {org.departments.length > 3 && (
                      <span className="department-more">
                        +{org.departments.length - 3} más
                      </span>
                    )}
                  </div>
                </div>

                <div className="organization-footer">
                  <div className="creation-date">
                    <span className="date-label">Registrada:</span>
                    <span className="date-value">{formatDate(org.createdAt)}</span>
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
                      onClick={() => handleDelete(org.id, org.displayName)}
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
            {(searchTerm || selectedType !== 'Todos' || selectedIndustry !== 'Todos' || selectedStatus !== 'Todos' || selectedSubscription !== 'Todos') && (
              <p className="no-results-suggestion">
                Intenta ajustar los filtros o{' '}
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('Todos');
                    setSelectedIndustry('Todos');
                    setSelectedStatus('Todos');
                    setSelectedSubscription('Todos');
                  }} 
                  className="clear-filters"
                >
                  limpiar filtros
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
