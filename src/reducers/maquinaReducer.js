import {
  MAQUINA_CREATE_REQUEST,
  MAQUINA_CREATE_SUCCESS,
  MAQUINA_CREATE_FAILURE,
  MAQUINA_FIND_ALL_REQUEST,
  MAQUINA_FIND_ALL_SUCCESS,
  MAQUINA_FIND_ALL_FAILURE,
  MAQUINA_FIND_ONE_REQUEST,
  MAQUINA_FIND_ONE_SUCCESS,
  MAQUINA_FIND_ONE_FAILURE,
  MAQUINA_UPDATE_REQUEST,
  MAQUINA_UPDATE_SUCCESS,
  MAQUINA_UPDATE_FAILURE,
  MAQUINA_REMOVE_REQUEST,
  MAQUINA_REMOVE_SUCCESS,
  MAQUINA_REMOVE_FAILURE,
  MAQUINA_FIND_BY_PROYECTO_REQUEST,
  MAQUINA_FIND_BY_PROYECTO_SUCCESS,
  MAQUINA_FIND_BY_PROYECTO_FAILURE,
} from "../actions/types";

const initialState = {
  maquinas: [],
  currentMaquina: null,
  loading: false,
  error: null,
};

const maquinaReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAQUINA_CREATE_REQUEST:
    case MAQUINA_FIND_ALL_REQUEST:
    case MAQUINA_FIND_ONE_REQUEST:
    case MAQUINA_UPDATE_REQUEST:
    case MAQUINA_REMOVE_REQUEST:
    case MAQUINA_FIND_BY_PROYECTO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MAQUINA_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        maquinas: [...state.maquinas, action.payload],
        error: null,
      };
    case MAQUINA_FIND_ALL_SUCCESS:
    case MAQUINA_FIND_BY_PROYECTO_SUCCESS:
      return {
        ...state,
        loading: false,
        maquinas: action.payload,
        error: null,
      };
    case MAQUINA_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentMaquina: action.payload,
        error: null,
      };
    case MAQUINA_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        maquinas: state.maquinas.map((maquina) =>
          maquina.id === action.payload.id ? action.payload : maquina
        ),
        currentMaquina: action.payload,
        error: null,
      };
    case MAQUINA_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        maquinas: state.maquinas.filter(
          (maquina) => maquina.id !== action.payload
        ),
        error: null,
      };
    case MAQUINA_CREATE_FAILURE:
    case MAQUINA_FIND_ALL_FAILURE:
    case MAQUINA_FIND_ONE_FAILURE:
    case MAQUINA_UPDATE_FAILURE:
    case MAQUINA_REMOVE_FAILURE:
    case MAQUINA_FIND_BY_PROYECTO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default maquinaReducer;
