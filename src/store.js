import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import permisoReducer from "./slices/permisoSlice";
import rolReducer from "./slices/rolSlice";
import cuentaReducer from "./slices/cuentaSlice";
import usuarioReducer from "./slices/usuarioSlice";
import registrarReducer from "./slices/registrarSlice";
import organizacionReducer from "./slices/organizacionSlice";
import proyectoReducer from "./slices/proyectoSlice";
import maquinaReducer from "./slices/maquinaSlice";
import contribuyenteReducer from "./slices/contribuyenteSlice";
import { hitoReducer } from "./slices/hitoSlice";
import { contextoDeAplicacionReducer } from "./slices/contextoDeAplicacionSlice";
import { casoDeUsoReducer } from "./slices/casoDeUsoSlice";
import { tecnologiaReducer } from "./slices/tecnologiaSlice";
import { cursoReducer } from "./slices/cursoSlice";
import { claseReducer } from "./slices/claseSlice";
import { likeReducer } from "./slices/likeSlice";
import { comentarioReducer } from "./slices/comentarioSlice";
import { recursoClaseReducer } from "./slices/recursoClaseSlice";
import { redSocialReducer } from "./slices/redSocialSlice";
import { miembroReducer } from "./slices/miembroSlice";
import { compartidoReducer } from "./slices/compartidoSlice";

const store = configureStore({
  reducer: {
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
    curso: cursoReducer,
    clase: claseReducer,
    like: likeReducer,
    comentario: comentarioReducer,
    recursoClase: recursoClaseReducer,
    redSocial: redSocialReducer,
    miembro: miembroReducer,
    compartido: compartidoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  devTools: import.meta.env.DEV,
});

export default store;
