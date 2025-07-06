import axios from "axios";
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
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new user.
 * @param {object} userData - Data for creating a new user.
 */
export const createUsuario = (userData) => async (dispatch) => {
  dispatch({ type: USUARIO_CREATE_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/api/usuarios`, userData);
    dispatch({
      type: USUARIO_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USUARIO_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all users.
 */
export const findAllUsuarios = () => async (dispatch) => {
  dispatch({ type: USUARIO_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/usuarios`);
    dispatch({
      type: USUARIO_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USUARIO_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single user by ID.
 * @param {string} id - ID of the user to fetch.
 */
export const findOneUsuario = (id) => async (dispatch) => {
  dispatch({ type: USUARIO_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/usuarios/${id}`);
    dispatch({
      type: USUARIO_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USUARIO_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing user.
 * @param {string} id - ID of the user to update.
 * @param {object} userData - Data for updating the user.
 */
export const updateUsuario = (id, userData) => async (dispatch) => {
  dispatch({ type: USUARIO_UPDATE_REQUEST });
  try {
    const response = await axios.patch(
      `${API_URL}/api/usuarios/${id}`,
      userData
    );
    dispatch({
      type: USUARIO_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USUARIO_UPDATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update the role of a user.
 * @param {string} id - ID of the user to update the role for.
 * @param {object} rolData - Data containing the new role ID.
 */
export const updateRolUsuario = (id, rolData) => async (dispatch) => {
  dispatch({ type: USUARIO_UPDATE_ROL_REQUEST });
  try {
    const response = await axios.patch(
      `${API_URL}/api/usuarios/rol/${id}`,
      rolData
    );
    dispatch({
      type: USUARIO_UPDATE_ROL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USUARIO_UPDATE_ROL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
