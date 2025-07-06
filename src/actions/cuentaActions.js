import axios from "axios";
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
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new account.
 * @param {object} cuentaData - Data for creating a new account.
 */
export const createCuenta = (cuentaData) => async (dispatch) => {
  dispatch({ type: CUENTA_CREATE_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/api/cuenta`, cuentaData);
    dispatch({
      type: CUENTA_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CUENTA_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all accounts.
 * @param {object} params - Query parameters (value, attr, order, offset, limit).
 */
export const findAllCuentas = (params) => async (dispatch) => {
  dispatch({ type: CUENTA_FIND_ALL_REQUEST });
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${API_URL}/api/cuenta?${queryString}`);
    dispatch({
      type: CUENTA_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CUENTA_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single account by ID.
 * @param {string} id - ID of the account to fetch.
 */
export const findOneCuenta = (id) => async (dispatch) => {
  dispatch({ type: CUENTA_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/cuenta/${id}`);
    dispatch({
      type: CUENTA_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CUENTA_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to delete an account by ID.
 * @param {string} id - ID of the account to delete.
 */
export const deleteCuenta = (id) => async (dispatch) => {
  dispatch({ type: CUENTA_DELETE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/cuenta/${id}`);
    dispatch({
      type: CUENTA_DELETE_SUCCESS,
      payload: id, // Optionally pass the ID of the deleted item
    });
  } catch (error) {
    dispatch({
      type: CUENTA_DELETE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to change the status (activate/deactivate) of an account by ID.
 * @param {string} id - ID of the account to change status.
 */
export const cambiarEstadoCuenta = (id) => async (dispatch) => {
  dispatch({ type: CUENTA_CAMBIAR_ESTADO_REQUEST });
  try {
    const response = await axios.post(
      `${API_URL}/api/cuenta/cambiar-estado/${id}`
    );
    dispatch({
      type: CUENTA_CAMBIAR_ESTADO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CUENTA_CAMBIAR_ESTADO_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
