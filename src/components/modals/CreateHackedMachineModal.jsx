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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nueva máquina hackeada guardada:', formData);
    const backendData = { ...formData };
    console.log('Simulando envío al backend:', backendData);
    handleClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay-machine" onClick={handleClose}>
      <form className="modal-content-machine" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <button type="button" onClick={handleClose} className="close-button-machine">X</button>
        <>
          <h2>Nueva Maquina Hackeada</h2>
          <p>Rellene todos los campos para su nueva maquina.</p>
          <label htmlFor="hacked-informacion">Información</label>
          <input id="hacked-informacion" type="text" required name="informacion" placeholder="Información detallada de la máquina" value={formData.informacion} onChange={handleChange} />
          <label htmlFor="hacked-impacto">Impacto</label>
          <input id="hacked-impacto" type="text" required name="impacto" placeholder="Alto impacto en el rendimiento del sistema" value={formData.impacto} onChange={handleChange} />
          <label htmlFor="hacked-evolucion">Evolución</label>
          <input id="hacked-evolucion" type="text" required name="evolucion" placeholder="Ha evolucionado desde el prototipo básico" value={formData.evolucion} onChange={handleChange} />
          <label htmlFor="hacked-categoria">Categoría</label>
          <select id="hacked-categoria" required name="categoria" value={formData.categoria} onChange={handleChange}>
            <option value="estetica">Estética</option>
            <option value="electronica">Electrónica</option>
            <option value="mecanica">Mecánica</option>
          </select>
          <label htmlFor="hacked-visibility">Visibilidad</label>
          <select id="hacked-visibility" required name="isPrivate" value={formData.isPrivate} onChange={handleChange}>
              <option value="publico">Público</option>
              <option value="privado">Privado</option>
          </select>
          <button type="submit" className='btn-create-machine-modal'>Guardar Maquina</button>
        </>
      </form>
    </div>
  );
};

export default CreateHackedMachineModal;
