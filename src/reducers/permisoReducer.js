import {
  PERMISO_CREATE_REQUEST,
  PERMISO_CREATE_SUCCESS,
  PERMISO_CREATE_FAILURE,
  PERMISO_FIND_ALL_REQUEST,
  PERMISO_FIND_ALL_SUCCESS,
  PERMISO_FIND_ALL_FAILURE,
  PERMISO_FIND_ONE_REQUEST,
  PERMISO_FIND_ONE_SUCCESS,
  PERMISO_FIND_ONE_FAILURE,
  PERMISO_UPDATE_REQUEST,
  PERMISO_UPDATE_SUCCESS,
  PERMISO_UPDATE_FAILURE,
  PERMISO_REMOVE_REQUEST,
  PERMISO_REMOVE_SUCCESS,
  PERMISO_REMOVE_FAILURE,
} from "../actions/types";

const initialState = {
  permisos: [],
  currentPermiso: null,
  loading: false,
  error: null,
};

const permisoReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERMISO_CREATE_REQUEST:
    case PERMISO_FIND_ALL_REQUEST:
    case PERMISO_FIND_ONE_REQUEST:
    case PERMISO_UPDATE_REQUEST:
    case PERMISO_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PERMISO_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        permisos: [...state.permisos, action.payload],
        error: null,
      };
    case PERMISO_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        permisos: action.payload,
        error: null,
      };
    case PERMISO_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentPermiso: action.payload,
        error: null,
      };
    case PERMISO_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        permisos: state.permisos.map((permiso) =>
          permiso.id === action.payload.id ? action.payload : permiso
        ),
        currentPermiso: action.payload,
        error: null,
      };
    case PERMISO_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        permisos: state.permisos.filter(
          (permiso) => permiso.id !== action.payload
        ),
        error: null,
      };
    case PERMISO_CREATE_FAILURE:
    case PERMISO_FIND_ALL_FAILURE:
    case PERMISO_FIND_ONE_FAILURE:
    case PERMISO_UPDATE_FAILURE:
    case PERMISO_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default permisoReducer;
