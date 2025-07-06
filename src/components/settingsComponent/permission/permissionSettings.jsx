import  { useState, useMemo } from 'react';
import { IoArrowBack, IoKey } from 'react-icons/io5';
import './permissionSettings.css';

// Datos simulados de permisos
const mockPermissions = [
  {
    id: 1,
    nombre: 'user.create',
    descripcion: 'Crear Usuarios'
  },
  {
    id: 2,
    nombre: 'user.read',
    descripcion: 'Ver Usuarios'
  },
  {
    id: 3,
    nombre: 'user.update',
    descripcion: 'Editar Usuario'
  },
  {
    id: 4,
    nombre: 'user.delete',
    descripcion: 'Eliminar Usuario'
  },
  {
    id: 5,
    nombre: 'role.manage',
    descripcion: 'Gestionar Roles'
  },
  {
    id: 6,
    nombre: 'content.publish',
    descripcion: 'Publicar Contenido'
  },
  {
    id: 7,
    nombre: 'content.moderate',
    descripcion: 'Moderar Contenido'
  },
  {
    id: 8,
    nombre: 'reports.view',
    descripcion: 'Ver Reportes'
  },
  {
    id: 9,
    nombre: 'settings.system',
    descripcion: 'Configuración Sistema'
  },
  {
    id: 10,
    nombre: 'backup.create',
    descripcion: 'Crear Respaldos'
  }
];



const PermissionSettings = ({ onBack }) => {
  const [permissions] = useState(mockPermissions);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPermissions = useMemo(() => {
    let filtered = permissions;

    if (searchTerm) {
      filtered = filtered.filter(permission =>
        permission.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, permissions]);

  return (
    <div className="permission-settings">
      <div className="permission-header">
        <button onClick={onBack} className="back-button">
          <IoArrowBack />
        </button>
        <div className="header-text">
          <h2>Gestión de Permisos</h2>
          <p>Visualiza los permisos del sistema</p>
        </div>
      </div>

      <div className="permission-controls">
          <input
          
            type="text"
            placeholder="Buscar permisos..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

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
                    <h3 className="permission-name">{permission.nombre}</h3>
                    <p className="permission-description">{permission.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <IoKey className="no-results-icon" />
            <p>No se encontraron permisos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionSettings;
