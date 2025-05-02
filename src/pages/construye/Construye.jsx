import React, { useState } from 'react';
import '../../styles/pages/construye/construye.css';
import Card_Machine from '../../components/cards/card_machine/Card_Machine';
import Card_App from '../../components/cards/card_app/Card_App';

const Construye = () => {
  const [activeTab, setActiveTab] = useState('maquinas');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Datos de muestra para las tarjetas
  const cardData = Array(9).fill().map((_, index) => ({
    id: index + 1,
    nombre: "Nuestra Magia",
    descripcion: "Una breve descripción del proyecto",
    pais: "ES",
    likes: Math.floor(Math.random() * 100),
    image: "/placeholder-image.jpg"
  }));

  return (
    <div className="construye-container">
      <h1 className="construye-title">Colabora, crea, transforma</h1>
      
      {/* Sección de imagen destacada con tamaño fijo 1118x324 */}
      <div className="featured-image-container">
        <div className="featured-image-wrapper">
          <div className="fixed-dimension-container">
            <img 
              src="https://res.cloudinary.com/dwzjheic7/image/upload/v1746227945/6_700_Simple_Cat_Line_Art_Stock_Illustrations_Royalty-Free_Vector_Graphics_Clip_Art_nwjz77.jpg" 
              alt="Colaboración creativa" 
              className="featured-image"
            />
          </div>
          
        </div>
      </div>

      <div className="construye-tabs">
        <div className="tab-links">
          <button
            className={`tab-button ${activeTab === 'maquinas' ? 'active' : ''}`}
            onClick={() => handleTabChange('maquinas')}
          >
            Máquinas Hackeadas
          </button>
          <button
            className={`tab-button ${activeTab === 'aplicaciones' ? 'active' : ''}`}
            onClick={() => handleTabChange('aplicaciones')}
          >
            Aplicaciones
          </button>
        </div>
        
        <div className="filter-dropdown">
          <select>
            <option>Más Votados</option>
            <option>Recientes</option>
          </select>
        </div>
      </div>

      {/* Contenedor de tarjetas usando los componentes existentes */}
      <div className="cards-container">
        {activeTab === 'maquinas' ? (
          <>
            {cardData.map((card) => (
              <Card_Machine
                key={card.id}
                image={card.image}
                nombre={card.nombre}
                descripcion={card.descripcion}
                pais={card.pais}
                likes={card.likes}
              />
            ))}
          </>
        ) : (
          <>
            {cardData.map((card) => (
              <Card_App
                key={card.id}
                image={card.image}
                nombre={card.nombre}
                descripcion={card.descripcion}
                pais={card.pais}
                likes={card.likes}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Construye;