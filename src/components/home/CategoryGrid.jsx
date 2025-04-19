import React from "react";
import CategoryCard from "./CategoryCard";
import "./styles/categorygrid.css";

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      title: "Historia",
      imageUrl:
        "https://www.portalverde.com.bo/wp-content/uploads/2024/08/unifranz-fablab-1024x597.jpg",
    },
    {
      id: 2,
      title: "Construye",
      imageUrl:
        "https://unifranz.edu.bo/wp-content/uploads/2024/08/FAB-LAB-ANIVERSARIO-blog.jpg",
    },
    {
      id: 3,
      title: "Aprende",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ1nheCKo35qmSr2RauaVXAX5Nrfh2mjb5Cg&s",
    },
    {
      id: 4,
      title: "Hackeado",
      imageUrl:
        "https://eldeber.com.bo/sites/default/efsfiles/2024-09/unifranz_171079980_1140x520.jpg",
    },
  ];

  return (
    <div className="category-grid-container">
      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            imageUrl={category.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
