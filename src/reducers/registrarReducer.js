import {
  REGISTRAR_CREATE_REQUEST,
  REGISTRAR_CREATE_SUCCESS,
  REGISTRAR_CREATE_FAILURE,
} from "../actions/types";

const initialState = {
  registeredUser: null,
  loading: false,
  error: null,
};

const registrarReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRAR_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTRAR_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        registeredUser: action.payload,
        error: null,
      };
    case REGISTRAR_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        registeredUser: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default registrarReducer;
