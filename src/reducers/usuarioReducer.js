import {
  USUARIO_CREATE_REQUEST,
  USUARIO_CREATE_SUCCESS,
  USUARIO_CREATE_FAILURE,
  USUARIO_FIND_ALL_REQUEST,
  USUARIO_FIND_ALL_SUCCESS,
  USUARIO_FIND_ALL_FAILURE,
  USUARIO_FIND_ONE_REQUEST,
  USUARIO_FIND_ONE_SUCCESS,
  USUARIO_FIND_ONE_FAILURE,
  USUARIO_UPDATE_REQUEST,
  USUARIO_UPDATE_SUCCESS,
  USUARIO_UPDATE_FAILURE,
  USUARIO_UPDATE_ROL_REQUEST,
  USUARIO_UPDATE_ROL_SUCCESS,
  USUARIO_UPDATE_ROL_FAILURE,
} from "../actions/types";

const initialState = {
  usuarios: [],
  currentUser: null,
  loading: false,
  error: null,
};

const usuarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case USUARIO_CREATE_REQUEST:
    case USUARIO_FIND_ALL_REQUEST:
    case USUARIO_FIND_ONE_REQUEST:
    case USUARIO_UPDATE_REQUEST:
    case USUARIO_UPDATE_ROL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USUARIO_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        usuarios: [...state.usuarios, action.payload],
        error: null,
      };
    case USUARIO_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        usuarios: action.payload,
        error: null,
      };
    case USUARIO_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: null,
      };
    case USUARIO_UPDATE_SUCCESS:
    case USUARIO_UPDATE_ROL_SUCCESS:
      return {
        ...state,
        loading: false,
        usuarios: state.usuarios.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        currentUser: action.payload,
        error: null,
      };
    case USUARIO_CREATE_FAILURE:
    case USUARIO_FIND_ALL_FAILURE:
    case USUARIO_FIND_ONE_FAILURE:
    case USUARIO_UPDATE_FAILURE:
    case USUARIO_UPDATE_ROL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default usuarioReducer;
