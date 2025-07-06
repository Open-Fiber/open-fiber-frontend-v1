import {
  PROYECTO_CREATE_REQUEST,
  PROYECTO_CREATE_SUCCESS,
  PROYECTO_CREATE_FAILURE,
  PROYECTO_FIND_ALL_REQUEST,
  PROYECTO_FIND_ALL_SUCCESS,
  PROYECTO_FIND_ALL_FAILURE,
  PROYECTO_FIND_ONE_REQUEST,
  PROYECTO_FIND_ONE_SUCCESS,
  PROYECTO_FIND_ONE_FAILURE,
  PROYECTO_UPDATE_REQUEST,
  PROYECTO_UPDATE_SUCCESS,
  PROYECTO_UPDATE_FAILURE,
  PROYECTO_REMOVE_REQUEST,
  PROYECTO_REMOVE_SUCCESS,
  PROYECTO_REMOVE_FAILURE,
  PROYECTO_FIND_BY_CUENTA_REQUEST,
  PROYECTO_FIND_BY_CUENTA_SUCCESS,
  PROYECTO_FIND_BY_CUENTA_FAILURE,
} from "../actions/types";

const initialState = {
  proyectos: [],
  currentProyecto: null,
  loading: false,
  error: null,
};

const proyectoReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROYECTO_CREATE_REQUEST:
    case PROYECTO_FIND_ALL_REQUEST:
    case PROYECTO_FIND_ONE_REQUEST:
    case PROYECTO_UPDATE_REQUEST:
    case PROYECTO_REMOVE_REQUEST:
    case PROYECTO_FIND_BY_CUENTA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PROYECTO_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        proyectos: [...state.proyectos, action.payload],
        error: null,
      };
    case PROYECTO_FIND_ALL_SUCCESS:
    case PROYECTO_FIND_BY_CUENTA_SUCCESS:
      return {
        ...state,
        loading: false,
        proyectos: action.payload,
        error: null,
      };
    case PROYECTO_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentProyecto: action.payload,
        error: null,
      };
    case PROYECTO_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        proyectos: state.proyectos.map((proyecto) =>
          proyecto.id === action.payload.id ? action.payload : proyecto
        ),
        currentProyecto: action.payload,
        error: null,
      };
    case PROYECTO_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        proyectos: state.proyectos.filter(
          (proyecto) => proyecto.id !== action.payload
        ),
        error: null,
      };
    case PROYECTO_CREATE_FAILURE:
    case PROYECTO_FIND_ALL_FAILURE:
    case PROYECTO_FIND_ONE_FAILURE:
    case PROYECTO_UPDATE_FAILURE:
    case PROYECTO_REMOVE_FAILURE:
    case PROYECTO_FIND_BY_CUENTA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default proyectoReducer;
