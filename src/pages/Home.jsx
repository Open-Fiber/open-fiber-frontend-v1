import CategoryGrid from "../components/home/CategoryGrid";
import ImageTextSection from "../components/home/ImageTextSection";
import CollageSection from "../components/home/CollageSection";

export const Home = () => {
  // Better organized content data with unique content for each section
  const sectionsContent = [
    {
      title: "Innovación Abierta y Sostenible",
      text: "OPEN FIBER es una comunidad global que une saberes ancestrales y tecnologías abiertas para transformar botellas plásticas en fibras reutilizables. Desarrollamos herramientas de código abierto que permiten a makers, Fab Labs y comunidades crear soluciones sostenibles desde cualquier rincón del mundo. Nuestra misión es democratizar la tecnología de reciclaje y fomentar la creatividad colectiva.",
      imageUrl:
        "https://www.portalverde.com.bo/wp-content/uploads/2024/08/unifranz-fablab-1024x597.jpg",
    },
    {
      title: "Tecnología al Servicio del Planeta",
      text: "Conectamos tradición e innovación a través de Arakuaa, nuestra máquina accesible y fácil de construir que convierte botellas PET en fibras textiles. Esta tecnología integra prácticas ancestrales con fabricación digital moderna, creando un puente entre la sabiduría tradicional y las herramientas del futuro. Cada fibra representa un paso hacia un mundo más sostenible.",
      imageUrl:
        "https://unifranz.edu.bo/wp-content/uploads/2024/08/FAB-LAB-ANIVERSARIO-blog.jpg",
    },
  ];

  return (
    <div className="home-container">
      {/* Category grid */}
      <CategoryGrid />

      {/*  sections with unique content and animations */}
      {sectionsContent.map((section, index) => (
        <ImageTextSection
          key={index}
          imageUrl={section.imageUrl}
          title={section.title}
          text={section.text}
          imageOnLeft={index % 2 === 0}
          index={index}
        />
      ))}

      {/*  collage section */}
      <CollageSection />
    </div>
  );
};

export default Home;
