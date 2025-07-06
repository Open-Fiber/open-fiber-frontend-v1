import {
  CLASE_CREATE_REQUEST,
  CLASE_CREATE_SUCCESS,
  CLASE_CREATE_FAILURE,
  CLASE_FIND_ALL_REQUEST,
  CLASE_FIND_ALL_SUCCESS,
  CLASE_FIND_ALL_FAILURE,
  CLASE_FIND_ONE_REQUEST,
  CLASE_FIND_ONE_SUCCESS,
  CLASE_FIND_ONE_FAILURE,
  CLASE_UPDATE_REQUEST,
  CLASE_UPDATE_SUCCESS,
  CLASE_UPDATE_FAILURE,
  CLASE_REMOVE_REQUEST,
  CLASE_REMOVE_SUCCESS,
  CLASE_REMOVE_FAILURE,
} from "../actions/types";

const initialState = {
  clases: [],
  currentClase: null,
  loading: false,
  error: null,
};

const claseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLASE_CREATE_REQUEST:
    case CLASE_FIND_ALL_REQUEST:
    case CLASE_FIND_ONE_REQUEST:
    case CLASE_UPDATE_REQUEST:
    case CLASE_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CLASE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        clases: [...state.clases, action.payload],
        error: null,
      };
    case CLASE_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        clases: action.payload,
        error: null,
      };
    case CLASE_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentClase: action.payload,
        error: null,
      };
    case CLASE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        clases: state.clases.map((clase) =>
          clase.id === action.payload.id ? action.payload : clase
        ),
        currentClase: action.payload,
        error: null,
      };
    case CLASE_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        clases: state.clases.filter((clase) => clase.id !== action.payload),
        error: null,
      };
    case CLASE_CREATE_FAILURE:
    case CLASE_FIND_ALL_FAILURE:
    case CLASE_FIND_ONE_FAILURE:
    case CLASE_UPDATE_FAILURE:
    case CLASE_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default claseReducer;
