import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaCog, FaDownload } from "react-icons/fa";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import { MdFullscreen, MdSpeed } from "react-icons/md";

const VideoSection = ({ isPlaying, toggleVideo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const videoUrl =
    "https://res.cloudinary.com/dvqsabodr/video/upload/v1745020195/ob8ihzgg7rwfiybhyqr7.mp4";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        setIsLoading(false);
        setDuration(videoRef.current.duration);
      });

      videoRef.current.addEventListener("timeupdate", updateProgress);

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
        videoRef.current.removeEventListener("timeupdate", updateProgress);
        videoRef.current.removeEventListener("error", () => {
          setIsLoading(false);
        });
      }
    };
  }, []);

  const updateProgress = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedOptions(false);
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
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

          {/* Video controls that appear on hover or when paused */}
          {!isLoading && (
            <div className="video-controls-container">
              <div className="video-controls">
                <div className="video-progress">
                  <input
                    type="range"
                    ref={progressRef}
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    onClick={(e) => e.stopPropagation()}
                    className="progress-slider"
                  />
                </div>

                <div className="video-buttons">
                  <div className="settings-button">
                    <button
                      className="control-button play-control"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlay();
                      }}
                    >
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>

                    <div className="middle-controls">
                      <div className="volume-control">
                        <button
                          className="control-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                          }}
                        >
                          {isMuted ? <BiVolumeMute /> : <BiVolumeFull />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          onClick={(e) => e.stopPropagation()}
                          className="volume-slider"
                        />
                      </div>

                      <div className="speed-control">
                        <button
                          className="control-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowSpeedOptions(!showSpeedOptions);
                          }}
                        >
                          <MdSpeed />
                          <span className="speed-label">{playbackSpeed}x</span>
                        </button>

                        {showSpeedOptions && (
                          <div
                            className="speed-options"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                              <button
                                key={speed}
                                className={`speed-option ${
                                  playbackSpeed === speed ? "active" : ""
                                }`}
                                onClick={() => handleSpeedChange(speed)}
                              >
                                {speed}x
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="right-controls">
                    <div className="time-display">
                      <span>{formatTime(currentTime)}</span>
                      <span> / </span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <button
                      className="control-button fullscreen-control"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFullscreen();
                      }}
                    >
                      <MdFullscreen />
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
