import "./nosotros.css";

// Import images
import people1 from '../../assets/people/people1.jpeg';
import people2 from '../../assets/people/people2.jpeg';
import people3 from '../../assets/people/people3.jpeg';
import people4 from '../../assets/people/people4.jpeg';
import people6 from '../../assets/people/people6.jpeg';
import people7 from '../../assets/people/people7.jpeg';
import person1 from '../../assets/person/person1.jpg';
import person2 from '../../assets/person/person2.jpg';
import person3 from '../../assets/person/person3.jpg';
import person4 from '../../assets/person/person4.jpg';
import person5 from '../../assets/person/person5.jpg';
import person6 from '../../assets/person/person6.jpg';

// --- DATOS SIMULADOS (como si vinieran de un backend) ---

const storyData = {
  title: "Nuestra Historia",
  paragraphs: [
    "Nuestra experiencia previa en el sector TI nos demostró que la honestidad, la lealtad y el respeto por los empleados y clientes no siempre son la prioridad. Decidimos cambiar el sistema. Los valores son para nosotros inamovibles y nadie puede socavarlos. Además, logramos unir nuestra pasión por los productos de excelencia y crear una empresa donde las prácticas de desarrollo limpias, seguras, efectivas y rápidas se combinan con un diseño limpio, moderno y maravillosamente hermoso.",
  ],
  secondaryParagraph: "Unikorns significa gente que se preocupa por la calidad y las relaciones profesionales.",
  images: [
    { src: people6, alt: "Team discussion in office", className: "story-img-1" },
    { src: people7, alt: "Team brainstorming", className: "story-img-2" },
    { src: people3, alt: "Developer at work", className: "story-img-3" },
  ],
};

const missionData = {
  title: "Nuestra Misión",
  paragraph: "Al igual que las personas, las empresas tienen su personalidad. Nuestra misión es ayudar a las empresas y a las personas a expresar su verdadera singularidad. Queremos trabajar a tu lado para ofrecerte la mejor experiencia y las emociones más preciosas que recordarás.",
  motto: "“Cada detalle importa” es nuestro lema.",
  images: [
    { src: people1, alt: "Team working collaboratively", className: "mission-img-1" },
    { src: people2, alt: "Smiling woman in office", className: "mission-img-2" },
    { src: people4, alt: "Team meeting around a table", className: "mission-img-3" }
  ],
};

const teamMembers = [
  { id: 1, name: "Dima Miro", role: "Founder & Frontend Developer", image: person1 },
  { id: 2, name: "Maria Brilkova", role: "Co-Founder & Designer", image: person2 },
  { id: 3, name: "Vlad Migulia", role: "Co-Founder & Project Manager", image: person3 },
  { id: 4, name: "Anton Rud", role: "Frontend Developer", image: person4 },
  { id: 5, name: "Roman Leuta", role: "New Business Manager", image: person5 },
  { id: 6, name: "Yegor Savoshevich", role: "Frontend Developer", image: person6 },
];

const valuesData = [
  { 
    id: "01", 
    title: "Respeto mutuo", 
    emoji: "✨",
    description: "Velamos por la felicidad de nuestros empleados y clientes, tratando a todos con dignidad y respeto." 
  },
  { 
    id: "02", 
    title: "Creciendo juntos", 
    emoji: "🌳",
    description: "Somos como árboles en el bosque, nuestro crecimiento profesional y personal es rápido gracias a la competencia positiva." 
  },
  { 
    id: "03", 
    title: "Nadie lucha solo", 
    emoji: "👯",
    description: "Nunca dejamos que un compañero enfrente solo un desafío. Nos ayudamos mutuamente y actuamos en equipo." 
  },
  { 
    id: "04", 
    title: "Comunicación clara", 
    emoji: "🗣️",
    description: "Con el equipo y los clientes. Hablamos sobre objetivos y expectativas. No dejamos lugar a malentendidos." 
  },
  { 
    id: "05", 
    title: "Eliminando el caos", 
    emoji: "⚙️",
    description: "Vencemos el caos a través de procesos de ejecución de proyectos bien regulados y personalizados." 
  },
  { 
    id: "06", 
    title: "Trabajo en equipo, no horas hombre", 
    emoji: "🔗",
    description: "Nuestro valor es el conocimiento y experiencia del equipo. Ofrecemos diseño web integral y no aceptamos el modelo de subcontratación de personal." 
  }
];

const Nosotros = () => {
  return (
    <div className="nosotros-container">
      {/* Story Section */}
      <section className="about-section story-section">
        <div className="about-content">
          <h2 className="about-title">{storyData.title}</h2>
          {storyData.paragraphs.map((p, index) => (
            <p key={index} className="about-paragraph">{p}</p>
          ))}
          <p className="about-paragraph secondary">{storyData.secondaryParagraph}</p>
        </div>
        <div className="about-images story-images">
          {storyData.images.map((img, index) => (
            <img key={index} src={img.src} alt={img.alt} className={img.className} />
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section mission-section">
        <div className="about-images mission-images">
          {missionData.images.map((img, index) => (
            <img key={index} src={img.src} alt={img.alt} className={img.className} />
          ))}
        </div>
        <div className="about-content">
          <h2 className="about-title">{missionData.title}</h2>
          <p className="about-paragraph">{missionData.paragraph}</p>
          <p className="about-paragraph motto">{missionData.motto}</p>
        </div>
      </section>

      {/* Team Section */}
      <div className="team-section">
        <h2 className="team-title">Nuestro Equipo</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-photo-wrapper">
                <img src={member.image} alt={member.name} className="team-photo" />
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <h2 className="section-title">Valores que Respetamos</h2>
        <div className="values-grid">
          {valuesData.map((value) => (
            <div key={value.id} className="value-card">
              <span className="value-label">...</span>
              <h3 className="value-title">{value.title} {value.emoji}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nosotros;