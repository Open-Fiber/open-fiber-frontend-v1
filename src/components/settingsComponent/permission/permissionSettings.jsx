import  { useState, useMemo } from 'react';
import { IoArrowBack, IoSearch, IoAdd, IoTrash, IoPencil, IoKey, IoCheckmarkCircle, IoShield } from 'react-icons/io5';
import './permissionSettings.css';

// Datos simulados de permisos
const mockPermissions = [
  {
    id: 1,
    name: 'user.create',
    displayName: 'Crear Usuario',
    description: 'Permite crear nuevos usuarios en el sistema',
    module: 'Usuarios',
    category: 'CRUD',
    roles: ['Super Administrador', 'Administrador'],
    createdAt: '2024-01-15',
    status: 'activo'
  },
  {
    id: 2,
    name: 'user.read',
    displayName: 'Ver Usuarios',
    description: 'Permite visualizar la lista de usuarios',
    module: 'Usuarios',
    category: 'CRUD',
    roles: ['Super Administrador', 'Administrador', 'Editor', 'Moderador'],
    createdAt: '2024-01-15',
    status: 'activo'
  },
  {
    id: 3,
    name: 'user.update',
    displayName: 'Editar Usuario',
    description: 'Permite modificar información de usuarios',
    module: 'Usuarios',
    category: 'CRUD',
    roles: ['Super Administrador', 'Administrador'],
    createdAt: '2024-01-15',
    status: 'activo'
  },
  {
    id: 4,
    name: 'user.delete',
    displayName: 'Eliminar Usuario',
    description: 'Permite eliminar usuarios del sistema',
    module: 'Usuarios',
    category: 'CRUD',
    roles: ['Super Administrador'],
    createdAt: '2024-01-15',
    status: 'activo'
  },
  {
    id: 5,
    name: 'role.manage',
    displayName: 'Gestionar Roles',
    description: 'Permite administrar roles y permisos',
    module: 'Seguridad',
    category: 'Administración',
    roles: ['Super Administrador'],
    createdAt: '2024-01-20',
    status: 'activo'
  },
  {
    id: 6,
    name: 'content.publish',
    displayName: 'Publicar Contenido',
    description: 'Permite publicar y despublicar contenido',
    module: 'Contenido',
    category: 'Publicación',
    roles: ['Super Administrador', 'Administrador', 'Editor'],
    createdAt: '2024-02-01',
    status: 'activo'
  },
  {
    id: 7,
    name: 'content.moderate',
    displayName: 'Moderar Contenido',
    description: 'Permite revisar y moderar contenido antes de publicación',
    module: 'Contenido',
    category: 'Moderación',
    roles: ['Super Administrador', 'Administrador', 'Moderador'],
    createdAt: '2024-02-05',
    status: 'activo'
  },
  {
    id: 8,
    name: 'reports.view',
    displayName: 'Ver Reportes',
    description: 'Permite acceder a reportes del sistema',
    module: 'Reportes',
    category: 'Análisis',
    roles: ['Super Administrador', 'Administrador'],
    createdAt: '2024-02-10',
    status: 'activo'
  },
  {
    id: 9,
    name: 'settings.system',
    displayName: 'Configuración Sistema',
    description: 'Permite modificar configuraciones globales',
    module: 'Sistema',
    category: 'Configuración',
    roles: ['Super Administrador'],
    createdAt: '2024-02-15',
    status: 'activo'
  },
  {
    id: 10,
    name: 'backup.create',
    displayName: 'Crear Respaldos',
    description: 'Permite crear copias de seguridad del sistema',
    module: 'Sistema',
    category: 'Mantenimiento',
    roles: ['Super Administrador'],
    createdAt: '2024-03-01',
    status: 'inactivo'
  }
];

const categories = ['Todos', 'CRUD', 'Administración', 'Publicación', 'Moderación', 'Análisis', 'Configuración', 'Mantenimiento'];
const modules = ['Todos', 'Usuarios', 'Seguridad', 'Contenido', 'Reportes', 'Sistema'];

const PermissionSettings = ({ onBack, showConfirmation }) => {
  const [permissions, setPermissions] = useState(mockPermissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedModule, setSelectedModule] = useState('Todos');
  const [success, setSuccess] = useState('');

  const handleDelete = (permissionId, permissionName) => {
    const permission = permissions.find(p => p.id === permissionId);
    if (permission.roles.length > 0) {
      showConfirmation(
        `El permiso "${permissionName}" está asignado a ${permission.roles.length} rol(es). ¿Desea continuar con la eliminación?`,
        () => {
          setPermissions(permissions.filter(perm => perm.id !== permissionId));
          showSuccess(`Permiso "${permissionName}" eliminado exitosamente`);
        }
      );
    } else {
      showConfirmation(
        `¿Estás seguro de que quieres eliminar el permiso "${permissionName}"?`,
        () => {
          setPermissions(permissions.filter(perm => perm.id !== permissionId));
          showSuccess(`Permiso "${permissionName}" eliminado exitosamente`);
        }
      );
    }
  };

  const handleEdit = (permissionId) => {
    showSuccess(`Editando permiso con ID: ${permissionId}`);
  };

  const handleCreate = () => {
    showSuccess('Abriendo formulario de creación de permiso');
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  const filteredPermissions = useMemo(() => {
    let filtered = permissions;

    if (searchTerm) {
      filtered = filtered.filter(permission =>
        permission.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(permission => permission.category === selectedCategory);
    }

    if (selectedModule !== 'Todos') {
      filtered = filtered.filter(permission => permission.module === selectedModule);
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedModule, permissions]);

  const getStatusBadge = (status) => {
    return status === 'activo' ? 'status-active' : 'status-inactive';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'CRUD': 'category-crud',
      'Administración': 'category-admin',
      'Publicación': 'category-publish',
      'Moderación': 'category-moderate',
      'Análisis': 'category-analytics',
      'Configuración': 'category-config',
      'Mantenimiento': 'category-maintenance'
    };
    return colors[category] || 'category-default';
  };

  return (
    <div className="permission-settings">
      <div className="permission-header">
        <button onClick={onBack} className="back-button">
          <IoArrowBack />
        </button>
        <div className="header-text">
          <h2>Gestión de Permisos</h2>
          <p>Administra los permisos y accesos del sistema</p>
        </div>
      </div>

      {success && (
        <div className="success-message">
          <IoCheckmarkCircle className="success-icon" />
          <span className="success-text">{success}</span>
        </div>
      )}

      <div className="permission-controls">
        <div className="search-filter-container">
          <div className="search-container">
            <IoSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar permisos..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filters-container">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="filter-select"
            >
              {modules.map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button onClick={handleCreate} className="create-button">
          <IoAdd className="create-icon" />
          <span>Crear Permiso</span>
        </button>
      </div>

      <div className="permissions-container">
        {filteredPermissions.length > 0 ? (
          <div className="permissions-grid">
            {filteredPermissions.map((permission) => (
              <div key={permission.id} className="permission-card">
                <div className="permission-card-header">
                  <div className="permission-icon-container">
                    <IoKey className="permission-icon" />
                  </div>
                  <div className="permission-info">
                    <h3 className="permission-name">{permission.displayName}</h3>
                    <p className="permission-code">{permission.name}</p>
                    <p className="permission-description">{permission.description}</p>
                  </div>
                  <div className={`permission-status ${getStatusBadge(permission.status)}`}>
                    {permission.status}
                  </div>
                </div>
                
                <div className="permission-details">
                  <div className="permission-meta">
                    <span className="meta-label">Módulo:</span>
                    <span className="meta-value">{permission.module}</span>
                  </div>
                  <div className="permission-meta">
                    <span className="meta-label">Categoría:</span>
                    <span className={`category-badge ${getCategoryColor(permission.category)}`}>
                      {permission.category}
                    </span>
                  </div>
                  <div className="permission-meta">
                    <span className="meta-label">Creado:</span>
                    <span className="meta-value">{new Date(permission.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="permission-roles">
                  <h4>
                    <IoShield className="roles-icon" />
                    Roles asignados ({permission.roles.length}):
                  </h4>
                  <div className="roles-list">
                    {permission.roles.length > 0 ? (
                      permission.roles.map((role, index) => (
                        <span key={index} className="role-tag">
                          {role}
                        </span>
                      ))
                    ) : (
                      <span className="no-roles">Sin roles asignados</span>
                    )}
                  </div>
                </div>

                <div className="permission-actions">
                  <button
                    onClick={() => handleEdit(permission.id)}
                    className="action-button edit-button"
                    title="Editar permiso"
                  >
                    <IoPencil />
                  </button>
                  <button
                    onClick={() => handleDelete(permission.id, permission.displayName)}
                    className="action-button delete-button"
                    title="Eliminar permiso"
                  >
                    <IoTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <IoKey className="no-results-icon" />
            <p>No se encontraron permisos</p>
            {(searchTerm || selectedCategory !== 'Todos' || selectedModule !== 'Todos') && (
              <p className="no-results-suggestion">
                Intenta ajustar los filtros o{' '}
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Todos');
                    setSelectedModule('Todos');
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

export default PermissionSettings;
