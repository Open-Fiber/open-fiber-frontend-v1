import React from "react";
import ImageTextSection from "../components/home/ImageTextSection";
import CategoryGrid from "../components/home/CategoryGrid";
import CollageSection from "../components/home/CollageSection";

export const Home = () => {
  const sectionContent = {
    title: "Título Relacionado Al Tema",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, in sed et donec purus viverra. Sit justo velit, eu sed sollicitudin tempus. Lorem ipsum dolor sit amet, consectetur adipiscing adipiscing adipiscing elit, in sed et donec purus viverra. Sit justo velit, eu sed sollicitudin tempus. Lorem ipsum dolor sit amet, consectetur adipiscing adipiscing adipiscing elit, in sed et donec purus viverra. Sit justo velit, eu sed sollicitudin tempus. Lorem ipsum dolor sit amet, consectetur adipiscing adipiscing adipiscing elit, in sed et donec purus viverra. Sit justo velit, eu sed sollicitudin tempus. Lorem ipsum dolor sit amet, consectetur adipiscing adipiscing adipiscing elit, in sed et donec purus viverra. Sit",
    imageUrl:
      "https://www.portalverde.com.bo/wp-content/uploads/2024/08/Grecia-FabLaab-1024x597.jpg",
  };

  return (
    <div className="home-container">
      {/* First section with image on the left */}
      <ImageTextSection
        imageUrl={sectionContent.imageUrl}
        title={sectionContent.title}
        text={sectionContent.text}
        imageOnLeft={true}
      />

      {/* Second section with image on the right */}
      <ImageTextSection
        imageUrl={sectionContent.imageUrl}
        title={sectionContent.title}
        text={sectionContent.text}
        imageOnLeft={false}
      />

      <CategoryGrid />

      <CollageSection />
    </div>
  );
};

export default Home;
