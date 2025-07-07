import React, { useState } from 'react';
import '../../styles/components/modals/CreateHackedMachineModal.css';

const CreateHackedMachineModal = ({ show, onClose }) => {
  const initialFormData = {
    informacion: '',
    impacto: '',
    evolucion: '',
    categoria: 'estetica',
    isPrivate: 'publico',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setFormData(initialFormData); // Reset form on close
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hacked Machine Data:', formData);
    handleClose(); // Close and reset modal after submission
  }

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay-hacked-machine" onClick={handleClose}>
      <form className="modal-content-hacked-machine" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="modal-header-hacked-machine">
          <h2>Nueva Máquina</h2>
          <button type="button" onClick={handleClose} className="close-button-hacked-machine">×</button>
        </div>

        <div className="modal-body-hacked-machine">
          <div className="form-group-hacked-machine">
            <label htmlFor="hacked-informacion">Información</label>
            <input id="hacked-informacion" type="text" required name="informacion" placeholder="Información detallada de la máquina" value={formData.informacion} onChange={handleChange} />
          </div>
          <div className="form-group-hacked-machine">
            <label htmlFor="hacked-impacto">Impacto</label>
            <input id="hacked-impacto" type="text" required name="impacto" placeholder="Alto impacto en el rendimiento del sistema" value={formData.impacto} onChange={handleChange} />
          </div>
          <div className="form-group-hacked-machine">
            <label htmlFor="hacked-evolucion">Evolución</label>
            <input id="hacked-evolucion" type="text" required name="evolucion" placeholder="Ha evolucionado desde el prototipo básico" value={formData.evolucion} onChange={handleChange} />
          </div>
          <div className="form-row-hacked-machine">
            <div className="form-group-hacked-machine">
              <label htmlFor="hacked-categoria">Categoría</label>
              <select id="hacked-categoria" required name="categoria" value={formData.categoria} onChange={handleChange}>
                <option value="estetica">Estética</option>
                <option value="electronica">Electrónica</option>
                <option value="mecanica">Mecánica</option>
              </select>
            </div>
            <div className="form-group-hacked-machine">
              <label htmlFor="hacked-visibility">Visibilidad</label>
              <select id="hacked-visibility" required name="isPrivate" value={formData.isPrivate} onChange={handleChange}>
                  <option value="publico">Público</option>
                  <option value="privado">Privado</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer-hacked-machine">
          <button type="button" className='btn-modal-secondary-hacked-machine' onClick={handleClose}>Atrás</button>
          <button type="submit" className='btn-modal-primary-hacked-machine'>Guardar Proyecto</button>
        </div>
      </form>
    </div>
  );
};

export default CreateHackedMachineModal;
