import {
  ORGANIZACION_CREATE_REQUEST,
  ORGANIZACION_CREATE_SUCCESS,
  ORGANIZACION_CREATE_FAILURE,
  ORGANIZACION_FIND_ALL_REQUEST,
  ORGANIZACION_FIND_ALL_SUCCESS,
  ORGANIZACION_FIND_ALL_FAILURE,
  ORGANIZACION_FIND_ONE_REQUEST,
  ORGANIZACION_FIND_ONE_SUCCESS,
  ORGANIZACION_FIND_ONE_FAILURE,
  ORGANIZACION_UPDATE_REQUEST,
  ORGANIZACION_UPDATE_SUCCESS,
  ORGANIZACION_UPDATE_FAILURE,
} from "../actions/types";

const initialState = {
  organizaciones: [],
  currentOrganizacion: null,
  loading: false,
  error: null,
};

const organizacionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORGANIZACION_CREATE_REQUEST:
    case ORGANIZACION_FIND_ALL_REQUEST:
    case ORGANIZACION_FIND_ONE_REQUEST:
    case ORGANIZACION_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ORGANIZACION_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        organizaciones: [...state.organizaciones, action.payload],
        error: null,
      };
    case ORGANIZACION_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        organizaciones: action.payload,
        error: null,
      };
    case ORGANIZACION_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentOrganizacion: action.payload,
        error: null,
      };
    case ORGANIZACION_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        organizaciones: state.organizaciones.map((org) =>
          org.id === action.payload.id ? action.payload : org
        ),
        currentOrganizacion: action.payload,
        error: null,
      };
    case ORGANIZACION_CREATE_FAILURE:
    case ORGANIZACION_FIND_ALL_FAILURE:
    case ORGANIZACION_FIND_ONE_FAILURE:
    case ORGANIZACION_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default organizacionReducer;
