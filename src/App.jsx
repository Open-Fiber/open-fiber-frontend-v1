// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from "./components/footer/Footer";
import Home_Header from "./components/home_header/Home_Header";
import Mis_Contribuciones from "./components/mis_contribuciones/Mis_Contribuciones"; // Agrega esta línea
import "./app.css";

//import Home_Header from "./components/home_header/Home_Header";
import Second_Header from "./components/second_header/Second_Header";
import Course from "./pages/course/Course";
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Home_Header />
        
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/course" element={<Course />} />
        <Route path="/my-machines" element={<Mis_Contribuciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
