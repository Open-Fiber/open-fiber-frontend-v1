// src/App.jsx
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./slices/authSlice";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from "./components/footer/Footer";
import Hero from "./components/home_header/Hero";
import Mis_Contribuciones from "./components/mis_contribuciones/Mis_Contribuciones";
import Nosotros from "./components/nosotros/Nosotros";
import Second_Header from "./components/second_header/Second_Header";
import Course from "./pages/course/Course";
import CustomCursor from "./components/cursor/CustomCursor";
import Construye from "./pages/construye/Construye";
import { initSmoothScrolling } from "./utils/scroll";
import cursorImage from "./assets/Group.png";
import "./app.css";
import Settings from "./pages/Settings/Settings";
import Comunidad from "./pages/comunidad/Comunidad";
import Contac from "./pages/contact/Contac";
import MaquinaDetails from "./pages/construye/MaquinaDetails";
import Aprende from "./pages/aprende/Aprende";

const rootStyle = {
  cursor: `url(${cursorImage}), auto`,
};

// Component for conditional layout rendering
const AppLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const location = useLocation();
  const path = location.pathname;

  // Initialize smooth scrolling when app loads
  useEffect(() => {
    initSmoothScrolling();

    // Cleanup function
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Determine which header to show (if any)
  const showHomeHeader = path === "/";
  const showSecondHeader = !["/", "/login", "/register"].includes(path);

  // Determine if footer should be shown
  const showFooter = !["/login", "/register"].includes(path);

  return (
    <div className="app-container" style={rootStyle}>
      {/* Add the custom cursor component */}
      <CustomCursor />

      {showHomeHeader && <Hero />}
      {showSecondHeader && <Second_Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aprende" element={<Course />} />
        <Route path="/construye" element={<Construye />} />
        <Route path="/maquina-details" element={<MaquinaDetails />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/my-machines" element={<Mis_Contribuciones />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/contacto" element={<Contac />} />
        <Route path="/page-aprende" element={<Aprende />} />
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
