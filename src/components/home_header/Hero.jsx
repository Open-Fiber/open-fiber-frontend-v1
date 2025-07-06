import React from "react";  
import "./hero.css";
import HeroMaquina1 from "../../assets/machine/machine1.jpeg"
import HeroMaquina2 from "../../assets/machine/machine2.jpeg"
import HeroMaquina3 from "../../assets/machine/machine3.jpeg"
import HeroMaquina4 from "../../assets/machine/machine4.jpeg"
import HeroMaquina5 from "../../assets/machine/machine5.jpeg"
import HeroMaquina6 from "../../assets/machine/machine6.jpeg"
import HeroMaquina7 from "../../assets/machine/machine7.jpeg"
import HeroMaquina8 from "../../assets/machine/machine8.jpeg"
import Second_Header from "../second_header/Second_Header";

const Hero = () => {
    // Dividir las imágenes para los dos carruseles
    const carouselImages1 = [HeroMaquina1, HeroMaquina2, HeroMaquina3, HeroMaquina4,HeroMaquina5, HeroMaquina6, HeroMaquina7, HeroMaquina8];
    const carouselImages2 = [HeroMaquina5, HeroMaquina6, HeroMaquina7, HeroMaquina8,HeroMaquina1, HeroMaquina2, HeroMaquina3, HeroMaquina4];

    return (
        <div className="hero">
            <Second_Header isFixed={true} />
            <div className="hero-content">
                <div className="hero-left">
                    {/* Carrusel 1 */}
                    <div className="carousel-column carousel-1">
                        <div className="carousel-scroll uno">
                            {carouselImages1.map((src, index) => <img key={`c1-${index}`} src={src} alt={`Máquina ${index + 1}`} />)}
                            {/* Duplicado para scroll infinito */}
                            {carouselImages1.map((src, index) => <img key={`c1-dup-${index}`} src={src} alt={`Máquina ${index + 1}`} />)}
                        </div>
                    </div>
                    {/* Carrusel 2 */}
                    <div className="carousel-column carousel-2">
                         <div className="carousel-scroll dos">
                            {carouselImages2.map((src, index) => <img key={`c2-${index}`} src={src} alt={`Máquina ${index + 5}`} />)}
                            {/* Duplicado para scroll infinito */}
                            {carouselImages2.map((src, index) => <img key={`c2-dup-${index}`} src={src} alt={`Máquina ${index + 5}`} />)}
                        </div>
                    </div>
                </div>
                <div className="hero-right">
                    <h1>Open Fiber</h1>
                    <p>Únete a nuestra comunidad y comparte tus creaciones. La inspiración está en todos lados, solo necesitas el lugar correcto para encontrarla.</p>
                </div>
            </div>
        </div>
    );
};

export default Hero;
