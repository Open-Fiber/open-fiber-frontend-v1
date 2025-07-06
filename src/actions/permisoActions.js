import axios from "axios";
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
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new permission.
 * @param {object} permisoData - Data for creating a new permission.
 * @param {string} token - Authorization token.
 */
export const createPermiso = (permisoData, token) => async (dispatch) => {
  dispatch({ type: PERMISO_CREATE_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/api/permiso`, permisoData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: PERMISO_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PERMISO_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all permissions.
 * @param {object} params - Query parameters (value, attr, order, offset, limit).
 * @param {string} token - Authorization token.
 */
export const findAllPermisos = (params, token) => async (dispatch) => {
  dispatch({ type: PERMISO_FIND_ALL_REQUEST });
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${API_URL}/api/permiso?${queryString}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: PERMISO_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PERMISO_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single permission by ID.
 * @param {string} id - ID of the permission to fetch.
 * @param {string} token - Authorization token.
 */
export const findOnePermiso = (id, token) => async (dispatch) => {
  dispatch({ type: PERMISO_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/permiso/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: PERMISO_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PERMISO_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing permission.
 * @param {string} id - ID of the permission to update.
 * @param {object} permisoData - Data for updating the permission.
 * @param {string} token - Authorization token.
 */
export const updatePermiso = (id, permisoData, token) => async (dispatch) => {
  dispatch({ type: PERMISO_UPDATE_REQUEST });
  try {
    const response = await axios.patch(
      `${API_URL}/api/permiso/${id}`,
      permisoData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: PERMISO_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PERMISO_UPDATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to remove a permission by ID.
 * @param {string} id - ID of the permission to remove.
 * @param {string} token - Authorization token.
 */
export const removePermiso = (id, token) => async (dispatch) => {
  dispatch({ type: PERMISO_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/permiso/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: PERMISO_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: PERMISO_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
