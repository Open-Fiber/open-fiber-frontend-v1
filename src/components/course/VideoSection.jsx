import React, { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa";

const VideoSection = ({ isPlaying, toggleVideo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const videoUrl =
    "https://res.cloudinary.com/dvqsabodr/video/upload/v1745020195/ob8ihzgg7rwfiybhyqr7.mp4";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        setIsLoading(false);
      });

      // Set up error handling
      videoRef.current.addEventListener("error", () => {
        console.error("Error loading video");
        setIsLoading(false);
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadeddata", () => {
          setIsLoading(false);
        });
        videoRef.current.removeEventListener("error", () => {
          setIsLoading(false);
        });
      }
    };
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      toggleVideo();
    }
  };

  // Handle clicking anywhere on the video overlay
  const handleVideoClick = () => {
    if (!isLoading) {
      handlePlay();
    }
  };

  return (
    <div className="main-content">
      <div className="video-container">
        <div
          className={`video-overlay ${!isPlaying ? "paused" : ""}`}
          onClick={handleVideoClick}
        >
          {isLoading && (
            <div className="video-loader">
              <div className="spinner"></div>
              <p>Cargando video...</p>
            </div>
          )}

          <video
            ref={videoRef}
            className="video-player"
            src={videoUrl}
            preload="auto"
            playsInline
            style={{ display: isLoading ? "none" : "block" }}
          />

          {!isLoading && !isPlaying && (
            <button
              className="play-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent double triggering
                handlePlay();
              }}
            >
              <FaPlay />
            </button>
          )}
        </div>
        <div className="video-details">
          <h2>Titulo Relacionado Al Tema</h2>
          <div className="author">
            <div className="author-avatar"></div>
            <span>Joanne Weick</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
