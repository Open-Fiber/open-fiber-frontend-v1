import React, { useState } from "react";
import "../../styles/pages/course/course.css";
import Sidebar from "../../components/course/Sidebar";
import VideoSection from "../../components/course/VideoSection";
import CommentsSection from "../../components/course/CommentSection";
import ResourcesSection from "../../components/course/ResourcesSection";

const Course = () => {
  // State for controlling sidebar chapters collapse/expand
  const [chapters, setChapters] = useState([
    { id: 1, title: "Introducción", isOpen: true, lessons: ["Introducción"] },
    { id: 2, title: "Introducción", isOpen: false, lessons: ["Introducción"] },
    { id: 3, title: "Introducción", isOpen: false, lessons: ["Introducción"] },
    { id: 4, title: "Introducción", isOpen: false, lessons: ["Introducción"] },
  ]);

  // Video states
  const [isPlaying, setIsPlaying] = useState(false);

  // Comments section states
  const [activeTab, setActiveTab] = useState("comentarios");
  const [commentText, setCommentText] = useState("");
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);
  const [commentType, setCommentType] = useState("pregunta");
  const [filterTab, setFilterTab] = useState("todo");

  // Resources data
  const resources = [
    { id: 1, title: "Material de clase", size: "2.5 MB", type: "pdf" },
    { id: 2, title: "Ejercicios prácticos", size: "1.8 MB", type: "docx" },
    { id: 3, title: "Recursos adicionales", size: "4.2 MB", type: "zip" },
  ];

  // Toggle chapter open/close
  const toggleChapter = (chapterId) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isOpen: !chapter.isOpen }
          : chapter
      )
    );
  };

  // Handle publish click
  const handlePublishClick = () => {
    // Implement publish functionality
    console.log("Publishing comment:", commentText, "Type:", commentType);
    setCommentText("");
    setIsCommentExpanded(false);
  };

  // Toggle video play/pause
  const toggleVideo = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle comment input focus
  const handleCommentFocus = () => {
    setIsCommentExpanded(true);
  };

  // Handle comment type change
  const handleCommentTypeChange = (type) => {
    setCommentType(type);
  };

  // Handle bottom tab change
  const handleBottomTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="course-page">
      {/* Left Sidebar */}
      <Sidebar chapters={chapters} toggleChapter={toggleChapter} />

      {/* Main Content Area */}
      <VideoSection isPlaying={isPlaying} toggleVideo={toggleVideo} />

      {/* Right Sidebar */}
      <div className="comments-section">
        {activeTab === "comentarios" ? (
          <CommentsSection
            activeTab={activeTab}
            commentText={commentText}
            setCommentText={setCommentText}
            isCommentExpanded={isCommentExpanded}
            handleCommentFocus={handleCommentFocus}
            commentType={commentType}
            handleCommentTypeChange={handleCommentTypeChange}
            handlePublishClick={handlePublishClick}
            filterTab={filterTab}
            setFilterTab={setFilterTab}
            handleBottomTabChange={handleBottomTabChange}
          />
        ) : (
          <ResourcesSection
            resources={resources}
            activeTab={activeTab}
            handleBottomTabChange={handleBottomTabChange}
          />
        )}
      </div>
    </div>
  );
};

export default Course;
