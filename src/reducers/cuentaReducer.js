import {
  CUENTA_CREATE_REQUEST,
  CUENTA_CREATE_SUCCESS,
  CUENTA_CREATE_FAILURE,
  CUENTA_FIND_ALL_REQUEST,
  CUENTA_FIND_ALL_SUCCESS,
  CUENTA_FIND_ALL_FAILURE,
  CUENTA_FIND_ONE_REQUEST,
  CUENTA_FIND_ONE_SUCCESS,
  CUENTA_FIND_ONE_FAILURE,
  CUENTA_DELETE_REQUEST,
  CUENTA_DELETE_SUCCESS,
  CUENTA_DELETE_FAILURE,
  CUENTA_CAMBIAR_ESTADO_REQUEST,
  CUENTA_CAMBIAR_ESTADO_SUCCESS,
  CUENTA_CAMBIAR_ESTADO_FAILURE,
} from "../actions/types";

const initialState = {
  cuentas: [],
  currentCuenta: null,
  loading: false,
  error: null,
};

const cuentaReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUENTA_CREATE_REQUEST:
    case CUENTA_FIND_ALL_REQUEST:
    case CUENTA_FIND_ONE_REQUEST:
    case CUENTA_DELETE_REQUEST:
    case CUENTA_CAMBIAR_ESTADO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CUENTA_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        cuentas: [...state.cuentas, action.payload],
        error: null,
      };
    case CUENTA_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        cuentas: action.payload,
        error: null,
      };
    case CUENTA_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentCuenta: action.payload,
        error: null,
      };
    case CUENTA_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        cuentas: state.cuentas.filter((cuenta) => cuenta.id !== action.payload),
        error: null,
      };
    case CUENTA_CAMBIAR_ESTADO_SUCCESS:
      return {
        ...state,
        loading: false,
        // Assuming the payload contains the updated account or a success message
        // You might need to update the specific account in the 'cuentas' array
        error: null,
      };
    case CUENTA_CREATE_FAILURE:
    case CUENTA_FIND_ALL_FAILURE:
    case CUENTA_FIND_ONE_FAILURE:
    case CUENTA_DELETE_FAILURE:
    case CUENTA_CAMBIAR_ESTADO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cuentaReducer;
