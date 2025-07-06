import {
  HITO_CREATE_REQUEST,
  HITO_CREATE_SUCCESS,
  HITO_CREATE_FAILURE,
  HITO_FIND_ALL_REQUEST,
  HITO_FIND_ALL_SUCCESS,
  HITO_FIND_ALL_FAILURE,
  HITO_FIND_ONE_REQUEST,
  HITO_FIND_ONE_SUCCESS,
  HITO_FIND_ONE_FAILURE,
  HITO_UPDATE_REQUEST,
  HITO_UPDATE_SUCCESS,
  HITO_UPDATE_FAILURE,
  HITO_REMOVE_REQUEST,
  HITO_REMOVE_SUCCESS,
  HITO_REMOVE_FAILURE,
} from "../actions/types";

const initialState = {
  hitos: [],
  currentHito: null,
  loading: false,
  error: null,
};

const hitoReducer = (state = initialState, action) => {
  switch (action.type) {
    case HITO_CREATE_REQUEST:
    case HITO_FIND_ALL_REQUEST:
    case HITO_FIND_ONE_REQUEST:
    case HITO_UPDATE_REQUEST:
    case HITO_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case HITO_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        hitos: [...state.hitos, action.payload],
        error: null,
      };
    case HITO_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        hitos: action.payload,
        error: null,
      };
    case HITO_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentHito: action.payload,
        error: null,
      };
    case HITO_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        hitos: state.hitos.map((hito) =>
          hito.id === action.payload.id ? action.payload : hito
        ),
        currentHito: action.payload,
        error: null,
      };
    case HITO_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        hitos: state.hitos.filter((hito) => hito.id !== action.payload),
        error: null,
      };
    case HITO_CREATE_FAILURE:
    case HITO_FIND_ALL_FAILURE:
    case HITO_FIND_ONE_FAILURE:
    case HITO_UPDATE_FAILURE:
    case HITO_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default hitoReducer;
