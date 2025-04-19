import React from "react";
import {
  FaFile,
  FaFileWord,
  FaFileArchive,
  FaDownload,
  FaComments,
  FaPaperclip,
} from "react-icons/fa";

const ResourcesSection = ({ resources, activeTab, handleBottomTabChange }) => {
  return (
    <>
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

      <div className="bottom-tabs">
        <button
          className={`bottom-tab ${activeTab === "recursos" ? "active" : ""}`}
          onClick={() => handleBottomTabChange("recursos")}
        >
          <FaPaperclip className="tab-icon" /> Recursos
        </button>
        <button
          className={`bottom-tab ${
            activeTab === "comentarios" ? "active" : ""
          }`}
          onClick={() => handleBottomTabChange("comentarios")}
        >
          <FaComments className="tab-icon" /> Comentarios
        </button>
      </div>
    </>
  );
};

export default ResourcesSection;
