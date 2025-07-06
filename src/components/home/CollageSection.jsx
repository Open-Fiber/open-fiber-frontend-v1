import { useEffect, useRef } from "react";
import { animate, stagger, createTimeline } from "animejs";
import "./collagesection.css";

const CollageSection = () => {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const imagesRef = useRef([]);
  const floatingElementsRef = useRef([]);

  const addToImagesRef = (el) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  const addToFloatingRef = (el) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current.push(el);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const title = titleRef.current;
    const button = buttonRef.current;
    const images = imagesRef.current;
    const floatingElements = floatingElementsRef.current;

    // Set initial states
    animate(leftContent, {
      opacity: 0,
      translateX: -60,
      duration: 0,
    });

    animate(images, {
      opacity: 0,
      scale: 0.8,
      rotate: 0,
      duration: 0,
    });

    animate(floatingElements, {
      opacity: 0,
      scale: 0,
      duration: 0,
    });

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Create a timeline for coordinated animations
            const tl = createTimeline({
              duration: 2000,
              ease: "outExpo",
            });

            // Left content entrance
            animate(leftContent, {
              opacity: 1,
              translateX: 0,
              duration: 400,
              ease: "outBack",
            });

            // Title character animation
            const titleChars = title.textContent.split("");
            title.innerHTML = titleChars
              .map((char) =>
                char === " " ? "&nbsp;" : `<span class="char">${char}</span>`
              )
              .join("");

            animate(title.querySelectorAll(".char"), {
              opacity: [0, 1],
              translateY: [50, 0],
              rotate: [10, 0],
              duration: 800,
              delay: stagger(50),
              ease: "outBack",
            });

            // Button animation
            animate(button, {
              scale: [0, 1.1, 1],
              opacity: [0, 1],
              duration: 800,
              delay: 600,
              ease: "outBack",
            });

            // Images entrance with stagger
            animate(images, {
              opacity: 1,
              scale: 1,
              rotate: (_, i) => [0, i % 2 === 0 ? 3 : -3], // Alternate rotation
              duration: 1200,
              delay: stagger(200, { from: "center" }),
              ease: "outElastic",
            });

            // Floating elements
            animate(floatingElements, {
              opacity: 1,
              scale: 1,
              duration: 1000,
              delay: stagger(100),
              ease: "outBack",
            });

            // Continuous floating animations
            setTimeout(() => {
              // Images floating animation
              images.forEach((img, i) => {
                animate(img, {
                  translateY: [0, -15, 0],
                  rotate: [
                    img.style.transform.match(/rotate\(([-\d.]+)deg\)/)?.[1] ||
                      0,
                    i % 2 === 0 ? 5 : -5,
                    img.style.transform.match(/rotate\(([-\d.]+)deg\)/)?.[1] ||
                      0,
                  ],
                  duration: 3000 + i * 200,
                  delay: i * 300,
                  ease: "inOutSine",
                  loop: true,
                });
              });

              // Floating elements orbital motion
              floatingElements.forEach((el, i) => {
                animate(el, {
                  translateX: [0, 20, -20, 0],
                  translateY: [0, -25, -25, 0],
                  rotate: [0, 360],
                  duration: 8000 + i * 1000,
                  ease: "linear",
                  loop: true,
                });
              });
            }, 1500);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (section) {
      observer.observe(section);
    }

    // Button hover animation
    const handleButtonHover = () => {
      animate(button, {
        scale: 1.05,
        duration: 200,
        ease: "outQuad",
      });
    };

    const handleButtonLeave = () => {
      animate(button, {
        scale: 1,
        duration: 200,
        ease: "outQuad",
      });
    };

    if (button) {
      button.addEventListener("mouseenter", handleButtonHover);
      button.addEventListener("mouseleave", handleButtonLeave);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      if (button) {
        button.removeEventListener("mouseenter", handleButtonHover);
        button.removeEventListener("mouseleave", handleButtonLeave);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="collage-section">
      {/* Floating background elements */}
      <div className="floating-background">
        <div ref={addToFloatingRef} className="floating-circle circle-1"></div>
        <div ref={addToFloatingRef} className="floating-circle circle-2"></div>
        <div
          ref={addToFloatingRef}
          className="floating-square square-collage-1"
        ></div>
        <div
          ref={addToFloatingRef}
          className="floating-triangle triangle-1"
        ></div>
      </div>

      <div className="collage-layout">
        {/* Left side - Title and CTA */}
        <div ref={leftContentRef} className="collage-left">
          <div className="collage-title">
            <h2 ref={titleRef}>
              <span className="highlight">CONSTRUYE +</span>
              <br />
              CON NOSOTROS
            </h2>
          </div>
          <div className="cta-button">
            <button ref={buttonRef}>
              <span className="button-text">
                <span className="highlight">CONSTRUYE +</span>
              </span>
              <div className="button-bg"></div>
              <div className="button-ripple"></div>
            </button>
          </div>
        </div>

        {/* Right side - Images */}
        <div className="collage-right">
          <div ref={addToImagesRef} className="framed-image img-1">
            <div className="frame">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZCgsof-xTfwf5ceQFbo_6Za2cipCKBwzAm_-WUe9e4qnMdJLYj6o_fGNjyIUy9SNwW1_eaHl9xppz1yK2s10yjfgVqzye56N3ymHXZ8QlRIjzInX8Ub_y3bdAQXXiM9eg90UDYcTiyA/w1200-h630-p-k-no-nu/46288541711_a9d63f559d_k.jpg"
                alt="FabLab workspace"
              />
              <div className="image-overlay"></div>
            </div>
          </div>

          <div ref={addToImagesRef} className="framed-image img-2">
            <div className="frame">
              <img
                src="https://www.undp.org/sites/g/files/zskgke326/files/2023-09/f31fq8_wsaaxzye.jpeg"
                alt="Innovation lab"
              />
              <div className="image-overlay"></div>
            </div>
          </div>

          <div ref={addToImagesRef} className="framed-image img-3">
            <div className="frame">
              <img
                src="https://i.ytimg.com/vi/021FKrbC82k/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgWigRMA8=&rs=AOn4CLBLG-FbxKUSHSPsfDzHGsMcQaMO2g"
                alt="Creative collaboration"
              />
              <div className="image-overlay"></div>
            </div>
          </div>

          {/* Connecting lines */}
          <svg className="connecting-lines" viewBox="0 0 600 400">
            <path
              d="M 100 50 Q 300 100 500 150"
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M 150 300 Q 250 200 400 250"
              stroke="url(#gradient2)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="3,7"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f093fb" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f5576c" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default CollageSection;
