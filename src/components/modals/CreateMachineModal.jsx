import React, { useState } from 'react';
import '../../styles/components/modals/CreateMachineModal.css';

const CreateMachineModal = ({ show, onClose }) => {
  const initialFormData = {
    titulo: '',
    objetivo: '',
    descripcion: '',
    informacion: '',
    impacto: '',
    evolucion: '',
    categoria: 'estetica',
    isPrivate: 'publico',
    proyectoId: 'b3f34e23-91d1-4f3a-9950-13cd15c8a59d',
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setStep(1);
    setFormData(initialFormData);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      console.log('Proyecto guardado:', formData);
      const backendData = { ...formData };
      console.log('Simulando envío al backend:', backendData);
      handleClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay-create-machine" onClick={handleClose}>
      <form className="modal-content-create-machine" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="modal-header-create-machine">
          <h2>{step === 1 ? 'Nuevo Proyecto' : 'Nueva Máquina'}</h2>
          <button type="button" onClick={handleClose} className="close-button-create-machine">×</button>
        </div>

        <div className="modal-body-create-machine">
          {step === 1 ? (
            <>
              <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input id="titulo" type="text" required name="titulo" placeholder="Título del proyecto" value={formData.titulo} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="objetivo">Objetivo</label>
                <input id="objetivo" type="text" required name="objetivo" placeholder="Objetivo principal" value={formData.objetivo} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea id="descripcion" required name="descripcion" placeholder="Describe tu proyecto" value={formData.descripcion} onChange={handleChange}></textarea>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="informacion">Información</label>
                <input id="informacion" type="text" required name="informacion" placeholder="Información detallada de la máquina" value={formData.informacion} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="impacto">Impacto</label>
                <input id="impacto" type="text" required name="impacto" placeholder="Alto impacto en el rendimiento del sistema" value={formData.impacto} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="evolucion">Evolución</label>
                <input id="evolucion" type="text" required name="evolucion" placeholder="Ha evolucionado desde el prototipo básico" value={formData.evolucion} onChange={handleChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="categoria">Categoría</label>
                  <select id="categoria" required name="categoria" value={formData.categoria} onChange={handleChange}>
                    <option value="estetica">Estética</option>
                    <option value="electronica">Electrónica</option>
                    <option value="mecanica">Mecánica</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="visibility-select">Visibilidad</label>
                  <select id="visibility-select" required name="isPrivate" value={formData.isPrivate} onChange={handleChange}>
                    <option value="publico">Público</option>
                    <option value="privado">Privado</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="modal-footer-create-machine">
          {step === 1 ? (
            <button type="submit" className='btn-modal-primary-create-machine'>Siguiente</button>
          ) : (
            <>
              <button type="button" className='btn-modal-secondary-create-machine' onClick={() => setStep(1)}>Atrás</button>
              <button type="submit" className='btn-modal-primary-create-machine'>Guardar Proyecto</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateMachineModal;
