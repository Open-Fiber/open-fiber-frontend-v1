import { useState, useMemo } from 'react';
import { IoArrowBack, IoSearch, IoAdd, IoTrash, IoPencil, IoShield, IoCheckmarkCircle, IoClose } from 'react-icons/io5';
import './roleSettings.css';

// Datos simulados de roles adaptados al nuevo formato JSON
const mockRoles = [
  {
    id: 1,
    nombre: 'Super Administrador',
    permisos: [
      '3b7a0100-ce04-41b0-84e6-36c237430188',
      '8b5a0501-fe04-41b0-84e6-36c237430188',
      '9c6b0612-df05-42c1-95f7-47d348541299',
      '1d2e0723-ef06-43d2-a6g8-58e459652300'
    ]
  },
  {
    id: 2,
    nombre: 'Administrador',
    permisos: [
      '3b7a0100-ce04-41b0-84e6-36c237430188',
      '8b5a0501-fe04-41b0-84e6-36c237430188'
    ]
  },
  {
    id: 3,
    nombre: 'Editor',
    permisos: [
      '8b5a0501-fe04-41b0-84e6-36c237430188',
      '9c6b0612-df05-42c1-95f7-47d348541299'
    ]
  },
  {
    id: 4,
    nombre: 'Moderador',
    permisos: [
      '9c6b0612-df05-42c1-95f7-47d348541299'
    ]
  },
  {
    id: 5,
    nombre: 'Usuario',
    permisos: [
      '1d2e0723-ef06-43d2-a6g8-58e459652300'
    ]
  }
];

// Datos simulados de permisos disponibles (para mostrar nombres legibles)
const mockPermisos = {
  '3b7a0100-ce04-41b0-84e6-36c237430188': 'Gestión de Usuarios',
  '8b5a0501-fe04-41b0-84e6-36c237430188': 'Gestión de Contenido',
  '9c6b0612-df05-42c1-95f7-47d348541299': 'Moderación',
  '1d2e0723-ef06-43d2-a6g8-58e459652300': 'Lectura',
  '2e3f0834-fg07-44e3-b7h9-69f560763411': 'Administración',
  '3f4g0945-gh08-45f4-c8i0-70g671874522': 'Reportes'
};

// eslint-disable-next-line react/prop-types
const RoleSettings = ({ onBack, showConfirmation }) => {
  const [roles, setRoles] = useState(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'create', 'edit'
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    permisos: []
  });

  const openModal = (type, role = null) => {
    setModalType(type);
    setSelectedRole(role);
    setFormData(role || {
      nombre: '',
      permisos: []
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRole(null);
    setFormData({
      nombre: '',
      permisos: []
    });
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePermissionToggle = (permisoId) => {
    setFormData(prev => ({
      ...prev,
      permisos: prev.permisos.includes(permisoId)
        ? prev.permisos.filter(p => p !== permisoId)
        : [...prev.permisos, permisoId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      showSuccess('El nombre del rol es requerido');
      return;
    }

    if (modalType === 'create') {
      const newRole = {
        ...formData,
        id: Date.now()
      };
      setRoles(prev => [...prev, newRole]);
      showSuccess(`Rol "${formData.nombre}" creado exitosamente`);
    } else if (modalType === 'edit') {
      setRoles(prev => prev.map(r => r.id === selectedRole.id ? { ...r, ...formData } : r));
      showSuccess(`Rol "${formData.nombre}" actualizado exitosamente`);
    }
    closeModal();
  };

  const handleDelete = (roleId, roleName) => {
    showConfirmation(
      `¿Estás seguro de que quieres eliminar el rol "${roleName}"?`,
      () => {
        setRoles(roles.filter(role => role.id !== roleId));
        showSuccess(`Rol "${roleName}" eliminado exitosamente`);
      }
    );
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  const filteredRoles = useMemo(() => {
    if (!searchTerm) {
      return roles;
    }
    return roles.filter(role =>
      role.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, roles]);

  const getPermissionName = (permisoId) => {
    return mockPermisos[permisoId] || `Permiso ${permisoId.slice(0, 8)}...`;
  };

  const RoleFormModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content role-form-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{modalType === 'create' ? 'Crear Nuevo Rol' : 'Editar Rol'}</h3>
          <button onClick={closeModal} className="close-button">
            <IoClose />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="role-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Rol *</label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={(e) => handleFormChange('nombre', e.target.value)}
              placeholder="Ingrese el nombre del rol"
              required
            />
          </div>

          <div className="form-group">
            <label>Permisos</label>
            <div className="permissions-grid">
              {Object.entries(mockPermisos).map(([id, name]) => (
                <label key={id} className="permission-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.permisos.includes(id)}
                    onChange={() => handlePermissionToggle(id)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="permission-name">{name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={closeModal} className="cancel-button">
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              {modalType === 'create' ? 'Crear Rol' : 'Actualizar Rol'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="role-settings">
      <div className="role-header">
        <button onClick={onBack} className="back-button">
          <IoArrowBack />
        </button>
        <div className="header-text">
          <h2>Gestión de Roles</h2>
          <p>Administra los roles y permisos del sistema</p>
        </div>
      </div>

      {success && (
        <div className="success-message">
          <IoCheckmarkCircle className="success-icon" />
          <span className="success-text">{success}</span>
        </div>
      )}

      <div className="role-controls">
        <div className="search-container">
          <IoSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar roles..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={() => openModal('create')} className="create-button">
          <IoAdd className="create-icon" />
          <span>Crear Rol</span>
        </button>
      </div>

      <div className="roles-container">
        {filteredRoles.length > 0 ? (
          <div className="roles-grid">
            {filteredRoles.map((role) => (
              <div key={role.id} className="role-card">
                <div className="role-card-header">
                  <div className="role-icon-container">
                    <IoShield className="role-icon" />
                  </div>
                  <div className="role-info">
                    <h3 className="role-name">{role.nombre}</h3>
                    <p className="role-description">
                      {role.permisos.length} permiso{role.permisos.length !== 1 ? 's' : ''} asignado{role.permisos.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="role-permissions">
                  <h4>Permisos:</h4>
                  <div className="permissions-list">
                    {role.permisos.length > 0 ? (
                      role.permisos.map((permisoId, index) => (
                        <span key={index} className="permission-tag">
                          {getPermissionName(permisoId)}
                        </span>
                      ))
                    ) : (
                      <span className="no-permissions">Sin permisos asignados</span>
                    )}
                  </div>
                </div>

                <div className="role-actions">
                  <button
                    onClick={() => openModal('edit', role)}
                    className="action-button edit-button"
                    title="Editar rol"
                  >
                    <IoPencil />
                  </button>
                  <button
                    onClick={() => handleDelete(role.id, role.nombre)}
                    className="action-button delete-button"
                    title="Eliminar rol"
                  >
                    <IoTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <IoShield className="no-results-icon" />
            <p>No se encontraron roles</p>
            {searchTerm && (
              <p className="no-results-suggestion">
                Intenta buscar con otros términos o{' '}
                <button onClick={() => setSearchTerm('')} className="clear-search">
                  ver todos los roles
                </button>
              </p>
            )}
          </div>
        )}
      </div>

      {showModal && <RoleFormModal />}
    </div>
  );
};

export default RoleSettings;
