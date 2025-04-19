import React from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const Sidebar = ({ chapters, toggleChapter }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <div className="sidebar-header">
          <h3>CONSTRUYE +</h3>
        </div>
        <div className="chapters-list">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="chapter">
              <div
                className="chapter-header"
                onClick={() => toggleChapter(chapter.id)}
              >
                <span className="chapter-prefix">
                  <FaChevronRight />
                </span>
                <span className="chapter-title">Introducción</span>
                <span
                  className={`chapter-arrow ${chapter.isOpen ? "open" : ""}`}
                >
                  <FaChevronDown />
                </span>
              </div>
              {chapter.isOpen && (
                <div className="lessons-list">
                  {chapter.lessons.map((lesson, idx) => (
                    <div key={idx} className="lesson">
                      {lesson}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
