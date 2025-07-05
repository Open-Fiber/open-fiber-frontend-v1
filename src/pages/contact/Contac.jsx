import React from 'react';
import fondo1 from '../../assets/contac/contac1.png'
import fondo2 from '../../assets/contac/contac2.png'
import fondo3 from '../../assets/contac/contac3.png'
import fondo4 from '../../assets/contac/contac4.png'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; 
import "../../styles/pages/contac/contac.css";

const Contac = () => {
    const heroImages = [
        {
            src: fondo1,
            alt: 'Espacio de oficina moderno 1',
            gridClass: 'image-1'
        },
        {
            src: fondo2,
            alt: 'Área de recepción de la oficina',
            gridClass: 'image-2'
        },
        {
            src: fondo3,
            alt: 'Espacio de trabajo colaborativo',
            gridClass: 'image-3'
        },
        {
            src: fondo4,
            alt: 'Área de descanso de la oficina',
            gridClass: 'image-4'
        }
    ];

    return (
        <main className="contact-page">
            <section className="discover-us-section">
                <div className="discover-us-content">
                    <h2>DESCUBRENOS</h2>
                    <p>Nuestros expertos están disponibles para responder cualquier pregunta que tengas. Tenemos las respuestas.</p>
                    
                    <div className="contact-info-block">
                        <h3>VISITANOS</h3>
                        <p>Oficina no G-02, Edificio L, Piso 1, Dubai, Media City - Dubai</p>
                    </div>
                    
                    <p>Siéntete libre de contactarnos a través de nuestros canales.</p>
                    
                    <div className="contact-info-block">
                        <h3>EMAIL</h3>
                        <p>flick@flick.com</p>
                    </div>
                    
                    <div className="contact-info-block">
                        <h3>LLAMANOS</h3>
                        <p>+971 4 578 6470</p>
                        <p>+971 4 584 7307</p>
                    </div>
                </div>
                <div className="discover-us-images">
                    {heroImages.map((image, index) => (
                        <div key={index} className={`image-container ${image.gridClass}`}>
                            <img src={image.src} alt={image.alt} />
                        </div>
                    ))}
                </div>
            </section>

            <section className="contact-form-section">
                <div className="contact-form-container">
                    <div className="contact-form-header">
                        <h2>TIENES UN PROYECTO!</h2>
                        <h1>HABLANOS</h1>
                        <p>Gracias por contactarnos! Por favor, complete el formulario, que tengas un gran día!</p>
                    </div>
                    <form className="contact-form">
                        <div className="form-row">
                            <input type="text" placeholder="Nombre" />
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="form-row">
                            <input type="tel" placeholder="Telefono" />
                            <input type="text" placeholder="Pais" />
                        </div>
                        <div className="form-row">
                            <input type="text" placeholder="Nombre de la empresa" />
                            <select>
                                <option value="" disabled selected>Interesado en</option>
                                <option value="design">Diseño</option>
                                <option value="development">Desarrollo</option>
                                <option value="consulting">Consultoria</option>
                            </select>
                        </div>
                        <textarea placeholder="Mensaje"></textarea>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </section>

            <section className="map-section">
                {/* Aquí iría el componente del mapa, por ahora un placeholder */}
                <div className="map-placeholder">
                    <FaMapMarkerAlt className="map-pin" />
                </div>
            </section>
        </main>
    );
};

export default Contac;
