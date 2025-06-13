import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import "./imagetextsection.css";

const ImageTextSection = ({
  imageUrl,
  title,
  text,
  imageOnLeft = true,
  index = 0,
}) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const textContainer = textRef.current;
    const titleEl = titleRef.current;
    const paragraphEl = paragraphRef.current;

    // Set initial states
    animate([image, textContainer], {
      opacity: 0,
      translateY: 60,
      duration: 0,
    });

    animate(titleEl, {
      opacity: 0,
      translateY: 30,
      duration: 0,
    });

    animate(paragraphEl, {
      opacity: 0,
      translateY: 20,
      duration: 0,
    });

    // Create intersection observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Main container animation
            animate([image, textContainer], {
              opacity: 1,
              translateY: 0,
              duration: 1200,
              delay: stagger(200),
              ease: "outExpo",
            });

            // Title animation with character stagger
            animate(titleEl, {
              opacity: 1,
              translateY: 0,
              duration: 800,
              delay: 400,
              ease: "outBack",
            });

            // Paragraph animation
            animate(paragraphEl, {
              opacity: 1,
              translateY: 0,
              duration: 1000,
              delay: 600,
              ease: "outCirc",
            });

            // Add floating animation to image
            animate(image, {
              translateY: [0, -10, 0],
              duration: 4000,
              delay: 1500,
              ease: "inOutSine",
              loop: true,
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`image-text-section ${
        imageOnLeft ? "image-left" : "image-right"
      } section-${index}`}
    >
      <div className="content-container">
        <div ref={imageRef} className="image-container">
          <div className="image-wrapper">
            <img src={imageUrl} alt={title} />
            <div className="image-overlay"></div>
          </div>
        </div>

        <div ref={textRef} className="text-container">
          <h2 ref={titleRef} className="section-title">
            {title}
          </h2>
          <p ref={paragraphRef} className="section-text">
            {text}
          </p>

          <div className="accent-line"></div>
        </div>
      </div>
    </section>
  );
};

export default ImageTextSection;
