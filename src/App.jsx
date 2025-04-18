// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import "./app.css";import Footer from "./pages/auth/Footer";

//import Home_Header from "./components/home_header/Home_Header";
import Second_Header from "./components/second_header/Second_Header";
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Second_Header />
        <video autoPlay loop muted playsInline className="background-video">
          <source
            src="https://res.cloudinary.com/dwzjheic7/video/upload/v1744945255/WhatsApp_Video_2025-04-17_at_23.00.21_utueeb.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      {/* Contenido de la app */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
