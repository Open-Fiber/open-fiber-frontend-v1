import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CHECK_TOKEN_REQUEST,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_FAILURE,
  LOGOUT,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  rol: null,
  tipo: null,
  loading: false,
  error: null,
  tokenChecking: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: null,
        user: null,
        error: action.payload,
      };

    case CHECK_TOKEN_REQUEST:
      return {
        ...state,
        tokenChecking: true,
        error: null,
      };

    case CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        tokenChecking: false,
        isAuthenticated: true,
        rol: action.payload.rol,
        tipo: action.payload.tipo,
        error: null,
      };

    case CHECK_TOKEN_FAILURE:
      return {
        ...state,
        tokenChecking: false,
        isAuthenticated: false,
        token: null,
        user: null,
        rol: null,
        tipo: null,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default authReducer;
