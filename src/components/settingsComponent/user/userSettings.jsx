import { useState } from 'react';
import './userSettings.css';

// Mock data matching the exact JSON structure
const mockUsers = [
  {
    id: "1",
    nombre: "Juan",
    apellido: "Pérez",
    pais: "Colombia",
    celular: "+57 300 123 4567",
    fechaNacimiento: "1990-05-15",
    fotoUrl: "",
    birthdate: "1990-05-15",
    sexo: "Masculino",
    cuentaId: "CUENTA123",
    rol: "Admin"
  },
  {
    id: "2",
    nombre: "María",
    apellido: "García",
    pais: "México",
    celular: "+52 55 987 6543",
    fechaNacimiento: "1985-12-03",
    fotoUrl: "",
    birthdate: "1985-12-03",
    sexo: "Femenino",
    cuentaId: "CUENTA456",
    rol: "Usuario"
  },
  {
    id: "3",
    nombre: "Carlos",
    apellido: "Rodríguez",
    pais: "Argentina",
    celular: "+54 11 456 7890",
    fechaNacimiento: "1992-08-20",
    fotoUrl: "",
    birthdate: "1992-08-20",
    sexo: "Masculino",
    cuentaId: "CUENTA789",
    rol: "Moderador"
  }
];

// Country flag mapping
const countryFlags = {
  'Colombia': '🇨🇴',
  'México': '🇲🇽',
  'Argentina': '🇦🇷',
  'España': '🇪🇸',
  'Chile': '🇨🇱',
  'Perú': '🇵🇪'
};

// Options
const roleOptions = ['Admin', 'Usuario', 'Moderador'];
const sexOptions = ['Masculino', 'Femenino', 'Otro'];
const countryOptions = Object.keys(countryFlags);

// eslint-disable-next-line react/prop-types
const UserSettings = ({ onBack }) => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'view', 'create', 'edit'
  const [formData, setFormData] = useState({});

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.nombre} ${user.apellido}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.rol === roleFilter;
    return matchesSearch && matchesRole;
  });

  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
    setFormData(user || {
      nombre: '',
      apellido: '',
      pais: '',
      celular: '',
      fechaNacimiento: '',
      sexo: '',
      rol: 'Usuario'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFormData({});
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'create') {
      const newUser = {
        ...formData,
        id: Date.now().toString(),
        fotoUrl: '',
        birthdate: formData.fechaNacimiento,
        cuentaId: `CUENTA${Date.now()}`
      };
      setUsers(prev => [...prev, newUser]);
    } else if (modalType === 'edit') {
      setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
    }
    closeModal();
  };

  const handleDelete = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      closeModal();
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setRoleFilter('');
  };

  const UserDetailModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content user-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Detalles del Usuario</h3>
          <button className="close-button" onClick={closeModal}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="user-detail-card">
          <div className="user-card-header">
            <div className="user-avatar-placeholder">
              <span className="avatar-initials">
                {selectedUser?.nombre?.[0]}{selectedUser?.apellido?.[0]}
              </span>
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
                {selectedUser?.nombre} {selectedUser?.apellido}
              </h4>
              <p style={{ margin: 0, color: '#64748b' }}>{selectedUser?.rol}</p>
            </div>
          </div>
          
          <div className="user-details">
            {[
              { label: 'País', value: `${countryFlags[selectedUser?.pais] || ''} ${selectedUser?.pais}` },
              { label: 'Celular', value: selectedUser?.celular },
              { label: 'Fecha de Nacimiento', value: selectedUser?.fechaNacimiento },
              { label: 'Sexo', value: selectedUser?.sexo },
              { label: 'Cuenta ID', value: selectedUser?.cuentaId },
              { label: 'Rol', value: selectedUser?.rol }
            ].map(({ label, value }) => (
              <div key={label} className="user-meta">
                <span className="meta-label">{label}:</span>
                <span className="meta-value">{value || 'No especificado'}</span>
              </div>
            ))}
          </div>

          <div className="user-actions">
            <button className="cancel-button" onClick={() => openModal('edit', selectedUser)}>
              Editar
            </button>
            <button 
              className="submit-button" 
              style={{ background: '#ef4444' }}
              onClick={() => handleDelete(selectedUser.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const UserFormModal = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content user-form-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{modalType === 'create' ? 'Crear Usuario' : 'Editar Usuario'}</h3>
          <button className="close-button" onClick={closeModal}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre *</label>
              <input
                type="text"
                value={formData.nombre || ''}
                onChange={e => handleFormChange('nombre', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Apellido *</label>
              <input
                type="text"
                value={formData.apellido || ''}
                onChange={e => handleFormChange('apellido', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>País *</label>
              <select
                value={formData.pais || ''}
                onChange={e => handleFormChange('pais', e.target.value)}
                required
              >
                <option value="">Seleccionar país</option>
                {countryOptions.map(country => (
                  <option key={country} value={country}>
                    {countryFlags[country]} {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Celular</label>
              <input
                type="tel"
                value={formData.celular || ''}
                onChange={e => handleFormChange('celular', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                value={formData.fechaNacimiento || ''}
                onChange={e => handleFormChange('fechaNacimiento', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Sexo</label>
              <select
                value={formData.sexo || ''}
                onChange={e => handleFormChange('sexo', e.target.value)}
              >
                <option value="">Seleccionar</option>
                {sexOptions.map(sex => (
                  <option key={sex} value={sex}>{sex}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rol *</label>
              <select
                value={formData.rol || 'Usuario'}
                onChange={e => handleFormChange('rol', e.target.value)}
                required
              >
                {roleOptions.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={closeModal}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              {modalType === 'create' ? 'Crear' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="user-settings">
      <div className="user-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="header-text">
          <h2>Gestión de Usuarios</h2>
          <p>Administra los usuarios del sistema</p>
        </div>
      </div>

      <div className="user-controls">
          <div className="search-container">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Roles</option>
            {roleOptions.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          
          {(searchTerm || roleFilter) && (
            <button className="clear-filters" onClick={clearFilters}>
              Limpiar
            </button>
          )}

        <button className="add-user-button" onClick={() => openModal('create')}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Añadir
        </button>
      </div>

      <div className="users-table">
        <div className="table-header">
          <div className="header-cell">Usuario</div>
          <div className="header-cell">País</div>
          <div className="header-cell">Rol</div>
        </div>
        <div className="table-body">
          {filteredUsers.map(user => (
            <div key={user.id} className="table-row" onClick={() => openModal('view', user)}>
              <div className="cell user-cell">
                <div className="user-info">
                  <span className="user-name">{user.nombre} {user.apellido}</span>
                </div>
              </div>
              <div className="cell">
                <span className="country-flag">{countryFlags[user.pais]} {user.pais}</span>
              </div>
              <div className="cell">
                <span className={`status-badge ${user.rol.toLowerCase()}`}>
                  {user.rol}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="empty-state">
          <p>No se encontraron usuarios</p>
        </div>
      )}

      {showModal && modalType === 'view' && <UserDetailModal />}
      {showModal && (modalType === 'create' || modalType === 'edit') && <UserFormModal />}
    </div>
  );
};

export default UserSettings;
