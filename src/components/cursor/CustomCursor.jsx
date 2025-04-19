// src/components/CustomCursor.jsx
import { useEffect } from "react";

const CustomCursor = () => {
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement("style");

    // Set the cursor using the direct Cloudinary URL
    const styleContent = `
      * {
        cursor: url('https://res.cloudinary.com/dvqsabodr/image/upload/v1745034796/zqunwh1rllimt7krn3za.png'), auto !important;
      }
      
      /* Also apply to interactive elements */
      a, button, [role="button"], input[type="submit"], input[type="button"], .clickable {
        cursor: url('https://res.cloudinary.com/dvqsabodr/image/upload/v1745034796/zqunwh1rllimt7krn3za.png'), pointer !important;
      }
      
      /* Also apply to text elements */
      input, textarea, [contenteditable="true"] {
        cursor: url('https://res.cloudinary.com/dvqsabodr/image/upload/v1745034796/zqunwh1rllimt7krn3za.png'), text !important;
      }
    `;

    // Set the content of the style element
    styleElement.innerHTML = styleContent;

    // Add the style element to the document head
    document.head.appendChild(styleElement);

    // Clean up function to remove the style element when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default CustomCursor;
