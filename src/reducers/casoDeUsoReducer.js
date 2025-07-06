import {
  CASO_DE_USO_CREATE_REQUEST,
  CASO_DE_USO_CREATE_SUCCESS,
  CASO_DE_USO_CREATE_FAILURE,
  CASO_DE_USO_FIND_ALL_REQUEST,
  CASO_DE_USO_FIND_ALL_SUCCESS,
  CASO_DE_USO_FIND_ALL_FAILURE,
  CASO_DE_USO_FIND_ONE_REQUEST,
  CASO_DE_USO_FIND_ONE_SUCCESS,
  CASO_DE_USO_FIND_ONE_FAILURE,
  CASO_DE_USO_UPDATE_REQUEST,
  CASO_DE_USO_UPDATE_SUCCESS,
  CASO_DE_USO_UPDATE_FAILURE,
  CASO_DE_USO_REMOVE_REQUEST,
  CASO_DE_USO_REMOVE_SUCCESS,
  CASO_DE_USO_REMOVE_FAILURE,
} from "../actions/types";

const initialState = {
  casosDeUso: [],
  currentCasoDeUso: null,
  loading: false,
  error: null,
};

const casoDeUsoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CASO_DE_USO_CREATE_REQUEST:
    case CASO_DE_USO_FIND_ALL_REQUEST:
    case CASO_DE_USO_FIND_ONE_REQUEST:
    case CASO_DE_USO_UPDATE_REQUEST:
    case CASO_DE_USO_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CASO_DE_USO_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        casosDeUso: [...state.casosDeUso, action.payload],
        error: null,
      };
    case CASO_DE_USO_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        casosDeUso: action.payload,
        error: null,
      };
    case CASO_DE_USO_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentCasoDeUso: action.payload,
        error: null,
      };
    case CASO_DE_USO_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        casosDeUso: state.casosDeUso.map((caso) =>
          caso.id === action.payload.id ? action.payload : caso
        ),
        currentCasoDeUso: action.payload,
        error: null,
      };
    case CASO_DE_USO_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        casosDeUso: state.casosDeUso.filter(
          (caso) => caso.id !== action.payload
        ),
        error: null,
      };
    case CASO_DE_USO_CREATE_FAILURE:
    case CASO_DE_USO_FIND_ALL_FAILURE:
    case CASO_DE_USO_FIND_ONE_FAILURE:
    case CASO_DE_USO_UPDATE_FAILURE:
    case CASO_DE_USO_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default casoDeUsoReducer;
