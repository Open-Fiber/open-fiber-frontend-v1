import { useState, useMemo } from 'react';
import { IoArrowBack, IoSearch, IoAdd, IoTrash, IoPencil, IoShield, IoCheckmarkCircle } from 'react-icons/io5';
import './roleSettings.css';

// Datos simulados de roles
const mockRoles = [
  {
    id: 1,
    name: 'Super Administrador',
    description: 'Acceso completo al sistema',
    permissions: ['crear', 'leer', 'actualizar', 'eliminar'],
    users: 2,
    createdAt: '2024-01-15',
    status: 'activo'
  },
  {
    id: 2,
    name: 'Administrador',
    description: 'Gestión de usuarios y configuraciones',
    permissions: ['crear', 'leer', 'actualizar'],
    users: 5,
    createdAt: '2024-02-10',
    status: 'activo'
  },
  {
    id: 3,
    name: 'Editor',
    description: 'Puede crear y editar contenido',
    permissions: ['crear', 'leer', 'actualizar'],
    users: 12,
    createdAt: '2024-02-20',
    status: 'activo'
  },
  {
    id: 4,
    name: 'Moderador',
    description: 'Supervisión y moderación de contenido',
    permissions: ['leer', 'actualizar'],
    users: 8,
    createdAt: '2024-03-01',
    status: 'activo'
  },
  {
    id: 5,
    name: 'Usuario',
    description: 'Acceso básico del sistema',
    permissions: ['leer'],
    users: 156,
    createdAt: '2024-01-01',
    status: 'activo'
  },
  {
    id: 6,
    name: 'Invitado',
    description: 'Acceso limitado temporal',
    permissions: ['leer'],
    users: 23,
    createdAt: '2024-03-15',
    status: 'inactivo'
  }
];

const RoleSettings = ({ onBack, showConfirmation }) => {
  const [roles, setRoles] = useState(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [success, setSuccess] = useState('');

  const handleDelete = (roleId, roleName) => {
    const role = roles.find(r => r.id === roleId);
    if (role.users > 0) {
      showConfirmation(
        `No se puede eliminar el rol "${roleName}" porque tiene ${role.users} usuario(s) asignado(s). ¿Desea continuar?`,
        () => {
          setRoles(roles.filter(role => role.id !== roleId));
          showSuccess(`Rol "${roleName}" eliminado exitosamente`);
        }
      );
    } else {
      showConfirmation(
        `¿Estás seguro de que quieres eliminar el rol "${roleName}"?`,
        () => {
          setRoles(roles.filter(role => role.id !== roleId));
          showSuccess(`Rol "${roleName}" eliminado exitosamente`);
        }
      );
    }
  };

  const handleEdit = (roleId) => {
    // Simular edición
    showSuccess(`Editando rol con ID: ${roleId}`);
  };

  const handleCreate = () => {
    // Simular creación
    showSuccess('Abriendo formulario de creación de rol');
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
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, roles]);

  const getStatusBadge = (status) => {
    return status === 'activo' ? 'status-active' : 'status-inactive';
  };

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
        <button onClick={handleCreate} className="create-button">
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
                    <h3 className="role-name">{role.name}</h3>
                    <p className="role-description">{role.description}</p>
                  </div>
                  <div className={`role-status ${getStatusBadge(role.status)}`}>
                    {role.status}
                  </div>
                </div>
                
                <div className="role-details">
                  <div className="role-stat">
                    <span className="stat-label">Usuarios:</span>
                    <span className="stat-value">{role.users}</span>
                  </div>
                  <div className="role-stat">
                    <span className="stat-label">Permisos:</span>
                    <span className="stat-value">{role.permissions.length}</span>
                  </div>
                  <div className="role-stat">
                    <span className="stat-label">Creado:</span>
                    <span className="stat-value">{new Date(role.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="role-permissions">
                  <h4>Permisos:</h4>
                  <div className="permissions-list">
                    {role.permissions.map((permission, index) => (
                      <span key={index} className="permission-tag">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="role-actions">
                  <button
                    onClick={() => handleEdit(role.id)}
                    className="action-button edit-button"
                    title="Editar rol"
                  >
                    <IoPencil />
                  </button>
                  <button
                    onClick={() => handleDelete(role.id, role.name)}
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
    </div>
  );
};

export default RoleSettings;
