import axios from "axios";
import {
  CLASE_CREATE_REQUEST,
  CLASE_CREATE_SUCCESS,
  CLASE_CREATE_FAILURE,
  CLASE_FIND_ALL_REQUEST,
  CLASE_FIND_ALL_SUCCESS,
  CLASE_FIND_ALL_FAILURE,
  CLASE_FIND_ONE_REQUEST,
  CLASE_FIND_ONE_SUCCESS,
  CLASE_FIND_ONE_FAILURE,
  CLASE_UPDATE_REQUEST,
  CLASE_UPDATE_SUCCESS,
  CLASE_UPDATE_FAILURE,
  CLASE_REMOVE_REQUEST,
  CLASE_REMOVE_SUCCESS,
  CLASE_REMOVE_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new class.
 * @param {object} claseData - Data for creating a new class.
 * @param {string} token - Authorization token.
 */
export const createClase = (claseData, token) => async (dispatch) => {
  dispatch({ type: CLASE_CREATE_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/api/clases`, claseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CLASE_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CLASE_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all classes.
 * @param {string} token - Authorization token.
 */
export const findAllClases = (token) => async (dispatch) => {
  dispatch({ type: CLASE_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/clases`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CLASE_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CLASE_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single class by ID.
 * @param {string} id - ID of the class to fetch.
 * @param {string} token - Authorization token.
 */
export const findOneClase = (id, token) => async (dispatch) => {
  dispatch({ type: CLASE_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/clases/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CLASE_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CLASE_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing class.
 * @param {string} id - ID of the class to update.
 * @param {object} claseData - Data for updating the class.
 * @param {string} token - Authorization token.
 */
export const updateClase = (id, claseData, token) => async (dispatch) => {
  dispatch({ type: CLASE_UPDATE_REQUEST });
  try {
    const response = await axios.put(`${API_URL}/api/clases/${id}`, claseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CLASE_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CLASE_UPDATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to remove (soft delete) a class by ID.
 * @param {string} id - ID of the class to remove.
 * @param {string} token - Authorization token.
 */
export const removeClase = (id, token) => async (dispatch) => {
  dispatch({ type: CLASE_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/clases/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CLASE_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: CLASE_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
