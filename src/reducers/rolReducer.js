import {
  ROL_CREATE_REQUEST,
  ROL_CREATE_SUCCESS,
  ROL_CREATE_FAILURE,
  ROL_FIND_ALL_REQUEST,
  ROL_FIND_ALL_SUCCESS,
  ROL_FIND_ALL_FAILURE,
  ROL_FIND_ONE_REQUEST,
  ROL_FIND_ONE_SUCCESS,
  ROL_FIND_ONE_FAILURE,
  ROL_UPDATE_REQUEST,
  ROL_UPDATE_SUCCESS,
  ROL_UPDATE_FAILURE,
  ROL_REMOVE_REQUEST,
  ROL_REMOVE_SUCCESS,
  ROL_REMOVE_FAILURE,
} from "../actions/types";

const initialState = {
  roles: [],
  currentRol: null,
  loading: false,
  error: null,
};

const rolReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROL_CREATE_REQUEST:
    case ROL_FIND_ALL_REQUEST:
    case ROL_FIND_ONE_REQUEST:
    case ROL_UPDATE_REQUEST:
    case ROL_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ROL_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: [...state.roles, action.payload],
        error: null,
      };
    case ROL_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload,
        error: null,
      };
    case ROL_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentRol: action.payload,
        error: null,
      };
    case ROL_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: state.roles.map((rol) =>
          rol.id === action.payload.id ? action.payload : rol
        ),
        currentRol: action.payload,
        error: null,
      };
    case ROL_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: state.roles.filter((rol) => rol.id !== action.payload),
        error: null,
      };
    case ROL_CREATE_FAILURE:
    case ROL_FIND_ALL_FAILURE:
    case ROL_FIND_ONE_FAILURE:
    case ROL_UPDATE_FAILURE:
    case ROL_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default rolReducer;
