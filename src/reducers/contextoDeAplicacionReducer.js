import {
  CONTEXTO_DE_APLICACION_CREATE_REQUEST,
  CONTEXTO_DE_APLICACION_CREATE_SUCCESS,
  CONTEXTO_DE_APLICACION_CREATE_FAILURE,
  CONTEXTO_DE_APLICACION_FIND_ALL_REQUEST,
  CONTEXTO_DE_APLICACION_FIND_ALL_SUCCESS,
  CONTEXTO_DE_APLICACION_FIND_ALL_FAILURE,
  CONTEXTO_DE_APLICACION_FIND_ONE_REQUEST,
  CONTEXTO_DE_APLICACION_FIND_ONE_SUCCESS,
  CONTEXTO_DE_APLICACION_FIND_ONE_FAILURE,
  CONTEXTO_DE_APLICACION_UPDATE_REQUEST,
  CONTEXTO_DE_APLICACION_UPDATE_SUCCESS,
  CONTEXTO_DE_APLICACION_UPDATE_FAILURE,
  CONTEXTO_DE_APLICACION_REMOVE_REQUEST,
  CONTEXTO_DE_APLICACION_REMOVE_SUCCESS,
  CONTEXTO_DE_APLICACION_REMOVE_FAILURE,
} from "../actions/types";

const initialState = {
  contextos: [],
  currentContexto: null,
  loading: false,
  error: null,
};

const contextoDeAplicacionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTEXTO_DE_APLICACION_CREATE_REQUEST:
    case CONTEXTO_DE_APLICACION_FIND_ALL_REQUEST:
    case CONTEXTO_DE_APLICACION_FIND_ONE_REQUEST:
    case CONTEXTO_DE_APLICACION_UPDATE_REQUEST:
    case CONTEXTO_DE_APLICACION_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CONTEXTO_DE_APLICACION_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        contextos: [...state.contextos, action.payload],
        error: null,
      };
    case CONTEXTO_DE_APLICACION_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        contextos: action.payload,
        error: null,
      };
    case CONTEXTO_DE_APLICACION_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentContexto: action.payload,
        error: null,
      };
    case CONTEXTO_DE_APLICACION_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        contextos: state.contextos.map((contexto) =>
          contexto.id === action.payload.id ? action.payload : contexto
        ),
        currentContexto: action.payload,
        error: null,
      };
    case CONTEXTO_DE_APLICACION_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        contextos: state.contextos.filter(
          (contexto) => contexto.id !== action.payload
        ),
        error: null,
      };
    case CONTEXTO_DE_APLICACION_CREATE_FAILURE:
    case CONTEXTO_DE_APLICACION_FIND_ALL_FAILURE:
    case CONTEXTO_DE_APLICACION_FIND_ONE_FAILURE:
    case CONTEXTO_DE_APLICACION_UPDATE_FAILURE:
    case CONTEXTO_DE_APLICACION_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default contextoDeAplicacionReducer;
