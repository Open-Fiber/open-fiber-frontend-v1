import {
  TECNOLOGIA_CREATE_REQUEST,
  TECNOLOGIA_CREATE_SUCCESS,
  TECNOLOGIA_CREATE_FAILURE,
  TECNOLOGIA_FIND_ALL_REQUEST,
  TECNOLOGIA_FIND_ALL_SUCCESS,
  TECNOLOGIA_FIND_ALL_FAILURE,
  TECNOLOGIA_FIND_ONE_REQUEST,
  TECNOLOGIA_FIND_ONE_SUCCESS,
  TECNOLOGIA_FIND_ONE_FAILURE,
  TECNOLOGIA_UPDATE_REQUEST,
  TECNOLOGIA_UPDATE_SUCCESS,
  TECNOLOGIA_UPDATE_FAILURE,
  TECNOLOGIA_REMOVE_REQUEST,
  TECNOLOGIA_REMOVE_SUCCESS,
  TECNOLOGIA_REMOVE_FAILURE,
} from "../actions/types";

const initialState = {
  tecnologias: [],
  currentTecnologia: null,
  loading: false,
  error: null,
};

const tecnologiaReducer = (state = initialState, action) => {
  switch (action.type) {
    case TECNOLOGIA_CREATE_REQUEST:
    case TECNOLOGIA_FIND_ALL_REQUEST:
    case TECNOLOGIA_FIND_ONE_REQUEST:
    case TECNOLOGIA_UPDATE_REQUEST:
    case TECNOLOGIA_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TECNOLOGIA_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        tecnologias: [...state.tecnologias, action.payload],
        error: null,
      };
    case TECNOLOGIA_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        tecnologias: action.payload,
        error: null,
      };
    case TECNOLOGIA_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentTecnologia: action.payload,
        error: null,
      };
    case TECNOLOGIA_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        tecnologias: state.tecnologias.map((tec) =>
          tec.id === action.payload.id ? action.payload : tec
        ),
        currentTecnologia: action.payload,
        error: null,
      };
    case TECNOLOGIA_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        tecnologias: state.tecnologias.filter(
          (tec) => tec.id !== action.payload
        ),
        error: null,
      };
    case TECNOLOGIA_CREATE_FAILURE:
    case TECNOLOGIA_FIND_ALL_FAILURE:
    case TECNOLOGIA_FIND_ONE_FAILURE:
    case TECNOLOGIA_UPDATE_FAILURE:
    case TECNOLOGIA_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tecnologiaReducer;
