import {
  CURSO_CREATE_REQUEST,
  CURSO_CREATE_SUCCESS,
  CURSO_CREATE_FAILURE,
  CURSO_FIND_ALL_REQUEST,
  CURSO_FIND_ALL_SUCCESS,
  CURSO_FIND_ALL_FAILURE,
  CURSO_FIND_ONE_REQUEST,
  CURSO_FIND_ONE_SUCCESS,
  CURSO_FIND_ONE_FAILURE,
  CURSO_UPDATE_REQUEST,
  CURSO_UPDATE_SUCCESS,
  CURSO_UPDATE_FAILURE,
  CURSO_REMOVE_REQUEST,
  CURSO_REMOVE_SUCCESS,
  CURSO_REMOVE_FAILURE,
} from "../actions/types";

const initialState = {
  cursos: [],
  currentCurso: null,
  loading: false,
  error: null,
};

const cursoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURSO_CREATE_REQUEST:
    case CURSO_FIND_ALL_REQUEST:
    case CURSO_FIND_ONE_REQUEST:
    case CURSO_UPDATE_REQUEST:
    case CURSO_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CURSO_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        cursos: [...state.cursos, action.payload],
        error: null,
      };
    case CURSO_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        cursos: action.payload,
        error: null,
      };
    case CURSO_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentCurso: action.payload,
        error: null,
      };
    case CURSO_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        cursos: state.cursos.map((curso) =>
          curso.id === action.payload.id ? action.payload : curso
        ),
        currentCurso: action.payload,
        error: null,
      };
    case CURSO_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        cursos: state.cursos.filter((curso) => curso.id !== action.payload),
        error: null,
      };
    case CURSO_CREATE_FAILURE:
    case CURSO_FIND_ALL_FAILURE:
    case CURSO_FIND_ONE_FAILURE:
    case CURSO_UPDATE_FAILURE:
    case CURSO_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cursoReducer;
