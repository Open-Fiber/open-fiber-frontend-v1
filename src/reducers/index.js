// src/redux/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./auth";
import permisoReducer from "./permisoReducer";
import rolReducer from "./rolReducer";
import cuentaReducer from "./cuentaReducer";
import usuarioReducer from "./usuarioReducer";
import registrarReducer from "./registrarReducer";
import organizacionReducer from "./organizacionReducer";
import proyectoReducer from "./proyectoReducer";
import maquinaReducer from "./maquinaReducer";
import contribuyenteReducer from "./contribuyenteReducer";
import hitoReducer from "./hitoReducer";
import contextoDeAplicacionReducer from "./contextoDeAplicacionReducer";
import casoDeUsoReducer from "./casoDeUsoReducer";
import tecnologiaReducer from "./tecnologiaReducer";
import likeReducer from "./likeReducer";
import cursoReducer from "./cursoReducer";
import claseReducer from "./claseReducer";
import comentarioReducer from "./comentarioReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  permiso: permisoReducer,
  rol: rolReducer,
  cuenta: cuentaReducer,
  usuario: usuarioReducer,
  registrar: registrarReducer,
  organizacion: organizacionReducer,
  proyecto: proyectoReducer,
  maquina: maquinaReducer,
  contribuyente: contribuyenteReducer,
  hito: hitoReducer,
  contextoDeAplicacion: contextoDeAplicacionReducer,
  casoDeUso: casoDeUsoReducer,
  tecnologia: tecnologiaReducer,
  like: likeReducer,
  curso: cursoReducer,
  clase: claseReducer,
  comentario: comentarioReducer,
});

export default rootReducer;
