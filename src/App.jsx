// src/App.jsx
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from "./components/footer/Footer";
import Home_Header from "./components/home_header/Home_Header";
import Mis_Contribuciones from "./components/mis_contribuciones/Mis_Contribuciones";
import Second_Header from "./components/second_header/Second_Header";
import Course from "./pages/course/Course";
import CustomCursor from "./components/cursor/CustomCursor";
import cursorImage from "./assets/Group.png";
import "./app.css";

const rootStyle = {
  cursor: `url(${cursorImage}), auto`,
};

// Component for conditional layout rendering
const AppLayout = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine which header to show (if any)
  const showHomeHeader = path === "/";
  const showSecondHeader = !["/", "/login", "/register"].includes(path);

  // Determine if footer should be shown
  const showFooter = !["/login", "/register"].includes(path);

  return (
    <div className="app-container" style={rootStyle}>
      {/* Add the custom cursor component with no props needed now */}
      <CustomCursor />

      {showHomeHeader && <Home_Header />}
      {showSecondHeader && <Second_Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aprende" element={<Course />} />
        <Route path="/my-machines" element={<Mis_Contribuciones />} />
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
