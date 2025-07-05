import machine1 from "../../assets/machine/machine1.jpg";
import machine2 from "../../assets/machine/machine2.jpg";
import machine3 from "../../assets/machine/machine3.jpg";
import machine4 from "../../assets/machine/machine4.JPG";
import machine5 from "../../assets/machine/machine5.JPG";
import machine6 from "../../assets/machine/machine6.JPG";
import machine7 from "../../assets/machine/machine7.jpg";
import machine8 from "../../assets/machine/machine8.JPG";

export const cardData = [
  {
    id: 1,
    nombre: "PET Bottle Shredder v2.1",
    descripcion:
      "Máquina trituradora de botellas PET para reciclaje automatizado con control por Arduino",
    pais: "BO",
    likes: 127,
    difficulty: "Intermedio",
    category: "Mecanica",
    createdAt: new Date(2024, 10, 15),
    image: machine1,
    tags: ["PET", "Reciclaje", "Automatización", "Arduino"],
    author: "Carlos Mendoza",
  },
  {
    id: 2,
    nombre: "Extrusora de Filamento 3D",
    descripcion:
      "Sistema de extrusión para fabricar filamento 3D reciclado con sensores y control PID",
    pais: "AR",
    likes: 89,
    difficulty: "Avanzado",
    category: "Electronica",
    createdAt: new Date(2024, 9, 3),
    image: machine2,
    tags: ["3D Print", "Extrusión", "PID", "Sensores"],
    author: "María González",
  },
  {
    id: 3,
    nombre: "Prensa Hidráulica para Ladrillos Ecológicos",
    descripcion:
      "Prensa hidráulica manual para fabricar ladrillos ecológicos usando materiales sostenibles",
    pais: "PE",
    likes: 156,
    difficulty: "Principiante",
    category: "Mecanica",
    createdAt: new Date(2024, 8, 22),
    image: machine3,
    tags: ["Construcción", "Ecológico", "Hidráulica", "DIY"],
    author: "Jorge Ramirez",
  },
  {
    id: 4,
    nombre: "Reactor de Pirólisis Compacto",
    descripcion:
      "Reactor compacto para convertir residuos plásticos en combustible mediante pirólisis controlada",
    pais: "CL",
    likes: 203,
    difficulty: "Avanzado",
    category: "Electronica",
    createdAt: new Date(2024, 7, 8),
    image: machine4,
    tags: ["Pirólisis", "Combustible", "Sensores", "Química"],
    author: "Ana Morales",
  },
  {
    id: 5,
    nombre: "Moldeadora por Inyección Mini",
    descripcion:
      "Inyectora de plástico en miniatura para moldear piezas pequeñas con calentador eléctrico",
    pais: "CO",
    likes: 94,
    difficulty: "Intermedio",
    category: "Mecanica",
    createdAt: new Date(2024, 6, 17),
    image: "src/assets/machine/machine5.JPG",
    tags: ["Inyección", "Moldes", "Calentador", "Objetos"],
    author: "Luis Herrera",
  },
  {
    id: 6,
    nombre: "Separador Magnético de Metales",
    descripcion:
      "Dispositivo electromagnético para separar metales de otros materiales automáticamente",
    pais: "BO",
    likes: 78,
    difficulty: "Intermedio",
    category: "Electronica",
    createdAt: new Date(2024, 5, 29),
    image: "src/assets/machine/machine6.JPG",
    tags: ["Magnetismo", "Separación", "Arduino", "Automatización"],
    author: "Patricia Silva",
  },
  {
    id: 7,
    nombre: "Lavadora de Plásticos Solar",
    descripcion:
      "Lavadora solar para plásticos reciclables con filtros y alimentación autosuficiente",
    pais: "AR",
    likes: 142,
    difficulty: "Principiante",
    category: "Estetica",
    createdAt: new Date(2024, 4, 11),
    image: "src/assets/machine/machine7.jpg",
    tags: ["Solar", "Limpieza", "Filtros", "Sostenible"],
    author: "Roberto Vega",
  },
  {
    id: 8,
    nombre: "Cortadora Láser de Plástico",
    descripcion:
      "Cortadora láser CNC para plásticos con precisión milimétrica y comandos G-code",
    pais: "PE",
    likes: 187,
    difficulty: "Avanzado",
    category: "Electronica",
    createdAt: new Date(2024, 3, 25),
    image: "src/assets/machine/machine8.JPG",
    tags: ["Láser", "CNC", "G-code", "Precisión"],
    author: "Diana Torres",
  },
];

export const appData = [
  {
    id: 1,
    nombre: "PlasticFlow Controller",
    descripcion:
      "Aplicación de control inteligente para flujos de plástico con monitoreo en tiempo real",
    pais: "BO",
    likes: 145,
    difficulty: "Intermedio",
    category: "Electronica",
    createdAt: new Date(2024, 10, 20),
    image: "src/assets/machine/machine1.jpg",
    tags: ["Control", "IA", "Monitoreo", "Alertas"],
    author: "Miguel Santos",
  },
  {
    id: 2,
    nombre: "RecycleVision AI",
    descripcion:
      "Sistema de visión artificial con IA para clasificar materiales reciclables mediante cámara",
    pais: "AR",
    likes: 189,
    difficulty: "Avanzado",
    category: "Electronica",
    createdAt: new Date(2024, 9, 8),
    image: "src/assets/machine/machine2.jpg",
    tags: ["Visión Artificial", "Clasificación", "Cámara", "50k Imágenes"],
    author: "Sofía Moreno",
  },
  {
    id: 3,
    nombre: "EcoProcess Manager",
    descripcion:
      "Administrador digital de procesos industriales con control de inventario y generación de reportes",
    pais: "PE",
    likes: 167,
    difficulty: "Intermedio",
    category: "Electronica",
    createdAt: new Date(2024, 8, 15),
    image: "src/assets/machine/machine3.jpg",
    tags: ["Gestión", "Inventario", "Reportes", "Análisis"],
    author: "David Herrera",
  },
  {
    id: 4,
    nombre: "TempGuard Pro",
    descripcion:
      "Aplicación profesional para controlar temperatura con algoritmos PID y registro histórico",
    pais: "CL",
    likes: 98,
    difficulty: "Avanzado",
    category: "Electronica",
    createdAt: new Date(2024, 7, 3),
    image: "src/assets/machine/machine4.JPG",
    tags: ["Temperatura", "PID", "Históricos", "Fundición"],
    author: "Carmen Vásquez",
  },
  {
    id: 5,
    nombre: "PlasticTracker Mobile",
    descripcion:
      "App móvil con rastreo de plásticos por QR, blockchain y trazabilidad completa",
    pais: "CO",
    likes: 223,
    difficulty: "Principiante",
    category: "Electronica",
    createdAt: new Date(2024, 6, 19),
    image: "src/assets/machine/machine5.JPG",
    tags: ["Móvil", "QR", "Blockchain", "Trazabilidad"],
    author: "Javier Medina",
  },
  {
    id: 6,
    nombre: "MachineHealth Monitor",
    descripcion:
      "Plataforma de monitoreo predictivo de salud de máquinas usando vibraciones y mantenimiento preventivo",
    pais: "BO",
    likes: 134,
    difficulty: "Avanzado",
    category: "Electronica",
    createdAt: new Date(2024, 5, 7),
    image: "src/assets/machine/machine6.JPG",
    tags: ["Mantenimiento", "Predictivo", "Vibraciones", "Preventivo"],
    author: "Elena Torres",
  },
  {
    id: 7,
    nombre: "ColorMix Calculator",
    descripcion:
      "Simulador de mezcla de colores y pigmentos en impresión 3D con resultados visuales",
    pais: "AR",
    likes: 87,
    difficulty: "Principiante",
    category: "Estetica",
    createdAt: new Date(2024, 4, 24),
    image: "src/assets/machine/machine7.jpg",
    tags: ["Colores", "Pigmentos", "3D", "Simulador"],
    author: "Tomás Rivera",
  },
  {
    id: 8,
    nombre: "Energy Optimizer",
    descripcion:
      "Aplicación para analizar y optimizar el consumo energético en plantas mediante aprendizaje automático",
    pais: "PE",
    likes: 156,
    difficulty: "Avanzado",
    category: "Electronica",
    createdAt: new Date(2024, 3, 11),
    image: "src/assets/machine/machine8.jpg",
    tags: ["Energía", "ML", "Demanda", "Programación"],
    author: "Natalia Cruz",
  },
];

// Helper function to get country name from code
export const getCountryName = (code) => {
  const countries = {
    BO: "Bolivia",
    AR: "Argentina",
    PE: "Perú",
    CL: "Chile",
    CO: "Colombia",
  };
  return countries[code] || code;
};

// Helper function to get random items
export const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
