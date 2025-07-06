import {
  COMENTARIO_CREATE_REQUEST,
  COMENTARIO_CREATE_SUCCESS,
  COMENTARIO_CREATE_FAILURE,
  COMENTARIO_FIND_ALL_REQUEST,
  COMENTARIO_FIND_ALL_SUCCESS,
  COMENTARIO_FIND_ALL_FAILURE,
  COMENTARIO_FIND_ONE_REQUEST,
  COMENTARIO_FIND_ONE_SUCCESS,
  COMENTARIO_FIND_ONE_FAILURE,
  COMENTARIO_UPDATE_REQUEST,
  COMENTARIO_UPDATE_SUCCESS,
  COMENTARIO_UPDATE_FAILURE,
  COMENTARIO_REMOVE_REQUEST,
  COMENTARIO_REMOVE_SUCCESS,
  COMENTARIO_REMOVE_FAILURE,
} from "../actions/types";

const initialState = {
  comentarios: [],
  currentComentario: null,
  loading: false,
  error: null,
};

const comentarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMENTARIO_CREATE_REQUEST:
    case COMENTARIO_FIND_ALL_REQUEST:
    case COMENTARIO_FIND_ONE_REQUEST:
    case COMENTARIO_UPDATE_REQUEST:
    case COMENTARIO_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COMENTARIO_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        comentarios: [...state.comentarios, action.payload],
        error: null,
      };
    case COMENTARIO_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        comentarios: action.payload,
        error: null,
      };
    case COMENTARIO_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentComentario: action.payload,
        error: null,
      };
    case COMENTARIO_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        comentarios: state.comentarios.map((comentario) =>
          comentario.id === action.payload.id ? action.payload : comentario
        ),
        currentComentario: action.payload,
        error: null,
      };
    case COMENTARIO_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        comentarios: state.comentarios.filter(
          (comentario) => comentario.id !== action.payload
        ),
        error: null,
      };
    case COMENTARIO_CREATE_FAILURE:
    case COMENTARIO_FIND_ALL_FAILURE:
    case COMENTARIO_FIND_ONE_FAILURE:
    case COMENTARIO_UPDATE_FAILURE:
    case COMENTARIO_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default comentarioReducer;
