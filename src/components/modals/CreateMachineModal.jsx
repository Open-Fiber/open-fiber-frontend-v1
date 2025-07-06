import React, { useState } from 'react';
import '../../styles/components/modals/CreateMachineModal.css';

const CreateMachineModal = ({ show, onClose }) => {
  const initialFormData = {
    titulo: '',
    objetivo: '',
    descripcion: '',
    informacion: '',
    version: '',
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
    <div className="modal-overlay-machine" onClick={handleClose}>
      <form className="modal-content-machine" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <button type="button" onClick={handleClose} className="close-button-machine">X</button>
        {step === 1 && (
          <>
            <h2>Nuevo Proyecto</h2>
            <p>Rellena todos los campos con información de su proyecto.</p>
            <label htmlFor="titulo">Título</label>
            <input id="titulo" type="text" required name="titulo" placeholder="Título del proyecto" value={formData.titulo} onChange={handleChange} />
            <label htmlFor="objetivo">Objetivo</label>
            <input id="objetivo" type="text" required name="objetivo" placeholder="Objetivo principal" value={formData.objetivo} onChange={handleChange} />
            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" required name="descripcion" placeholder="Describe tu proyecto" value={formData.descripcion} onChange={handleChange}></textarea>
            <button type="submit" className='btn-create-machine-modal'>Siguiente</button>
          </>
        )}
        {step === 2 && (
          <>
            <h2>Nueva maquina</h2>
            <p>Rellene todos los campos para su nueva maquina.</p>
            <label htmlFor="informacion">Información</label>
            <input id="informacion" type="text" required name="informacion" placeholder="Información detallada de la máquina" value={formData.informacion} onChange={handleChange} />
            <label htmlFor="version">Versión</label>
            <input id="version" type="text" required name="version" placeholder="v1.0.0" value={formData.version} onChange={handleChange} />
            <label htmlFor="impacto">Impacto</label>
            <input id="impacto" type="text" required name="impacto" placeholder="Alto impacto en el rendimiento del sistema" value={formData.impacto} onChange={handleChange} />
            <label htmlFor="evolucion">Evolución</label>
            <input id="evolucion" type="text" required name="evolucion" placeholder="Ha evolucionado desde el prototipo básico" value={formData.evolucion} onChange={handleChange} />
            <label htmlFor="categoria">Categoría</label>
            <select id="categoria" required name="categoria" value={formData.categoria} onChange={handleChange}>
              <option value="estetica">Estética</option>
              <option value="electronica">Electrónica</option>
              <option value="mecanica">Mecánica</option>
            </select>
            <label htmlFor="visibility-select">Visibilidad</label>
            <select id="visibility-select" required name="isPrivate" value={formData.isPrivate} onChange={handleChange}>
                <option value="publico">Público</option>
                <option value="privado">Privado</option>
            </select>
            <button type="submit" className='btn-create-machine-modal'>Guardar Proyecto</button>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateMachineModal;
