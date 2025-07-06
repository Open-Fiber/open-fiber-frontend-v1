// src/redux/reducers/contribuyenteReducer.js
import {
  CONTRIBUYENTE_CREATE_REQUEST,
  CONTRIBUYENTE_CREATE_SUCCESS,
  CONTRIBUYENTE_CREATE_FAILURE,
  CONTRIBUYENTE_FIND_ALL_REQUEST,
  CONTRIBUYENTE_FIND_ALL_SUCCESS,
  CONTRIBUYENTE_FIND_ALL_FAILURE,
  CONTRIBUYENTE_FIND_ONE_REQUEST,
  CONTRIBUYENTE_FIND_ONE_SUCCESS,
  CONTRIBUYENTE_FIND_ONE_FAILURE,
  CONTRIBUYENTE_UPDATE_REQUEST,
  CONTRIBUYENTE_UPDATE_SUCCESS,
  CONTRIBUYENTE_UPDATE_FAILURE,
  CONTRIBUYENTE_REMOVE_REQUEST,
  CONTRIBUYENTE_REMOVE_SUCCESS,
  CONTRIBUYENTE_REMOVE_FAILURE,
} from "../actions/types";

const initialState = {
  contribuyentes: [],
  currentContribuyente: null,
  loading: false,
  error: null,
};

const contribuyenteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTRIBUYENTE_CREATE_REQUEST:
    case CONTRIBUYENTE_FIND_ALL_REQUEST:
    case CONTRIBUYENTE_FIND_ONE_REQUEST:
    case CONTRIBUYENTE_UPDATE_REQUEST:
    case CONTRIBUYENTE_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CONTRIBUYENTE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        contribuyentes: [...state.contribuyentes, action.payload],
        error: null,
      };
    case CONTRIBUYENTE_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        contribuyentes: action.payload,
        error: null,
      };
    case CONTRIBUYENTE_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentContribuyente: action.payload,
        error: null,
      };
    case CONTRIBUYENTE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        contribuyentes: state.contribuyentes.map((contribuyente) =>
          contribuyente.id === action.payload.id
            ? action.payload
            : contribuyente
        ),
        currentContribuyente: action.payload,
        error: null,
      };
    case CONTRIBUYENTE_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        contribuyentes: state.contribuyentes.filter(
          (contribuyente) => contribuyente.id !== action.payload
        ),
        error: null,
      };
    case CONTRIBUYENTE_CREATE_FAILURE:
    case CONTRIBUYENTE_FIND_ALL_FAILURE:
    case CONTRIBUYENTE_FIND_ONE_FAILURE:
    case CONTRIBUYENTE_UPDATE_FAILURE:
    case CONTRIBUYENTE_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default contribuyenteReducer;
