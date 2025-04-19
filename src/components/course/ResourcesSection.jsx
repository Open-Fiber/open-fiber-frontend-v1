import React from "react";
import { FaFile, FaFileWord, FaFileArchive, FaDownload } from "react-icons/fa";

const ResourcesSection = ({ resources }) => {
  return (
    <div className="resources-list active">
      <h2>Recursos</h2>
      {resources.map((resource) => (
        <div key={resource.id} className="resource-item">
          <div className="resource-icon">
            {resource.type === "pdf" ? (
              <FaFile />
            ) : resource.type === "docx" ? (
              <FaFileWord />
            ) : (
              <FaFileArchive />
            )}
          </div>
          <div className="resource-details">
            <div className="resource-title">{resource.title}</div>
            <div className="resource-size">{resource.size}</div>
          </div>
          <div className="resource-download">
            <FaDownload />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourcesSection;
