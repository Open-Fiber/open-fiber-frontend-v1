import axios from "axios";
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
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new contributor.
 * @param {object} contribuyenteData - Data for creating a new contributor.
 * @param {string} token - Authorization token.
 */
export const createContribuyente =
  (contribuyenteData, token) => async (dispatch) => {
    dispatch({ type: CONTRIBUYENTE_CREATE_REQUEST });
    try {
      const response = await axios.post(
        `${API_URL}/api/contribuyentes`,
        contribuyenteData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: CONTRIBUYENTE_CREATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CONTRIBUYENTE_CREATE_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

/**
 * Action to fetch all contributors.
 * @param {string} token - Authorization token.
 */
export const findAllContribuyentes = (token) => async (dispatch) => {
  dispatch({ type: CONTRIBUYENTE_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/contribuyentes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CONTRIBUYENTE_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CONTRIBUYENTE_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single contributor by ID.
 * @param {string} id - ID of the contributor to fetch.
 * @param {string} token - Authorization token.
 */
export const findOneContribuyente = (id, token) => async (dispatch) => {
  dispatch({ type: CONTRIBUYENTE_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/contribuyentes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CONTRIBUYENTE_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CONTRIBUYENTE_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing contributor.
 * @param {string} id - ID of the contributor to update.
 * @param {object} contribuyenteData - Data for updating the contributor.
 * @param {string} token - Authorization token.
 */
export const updateContribuyente =
  (id, contribuyenteData, token) => async (dispatch) => {
    dispatch({ type: CONTRIBUYENTE_UPDATE_REQUEST });
    try {
      const response = await axios.put(
        `${API_URL}/api/contribuyentes/${id}`,
        contribuyenteData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: CONTRIBUYENTE_UPDATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CONTRIBUYENTE_UPDATE_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

/**
 * Action to remove (soft delete) a contributor by ID.
 * @param {string} id - ID of the contributor to remove.
 * @param {string} token - Authorization token.
 */
export const removeContribuyente = (id, token) => async (dispatch) => {
  dispatch({ type: CONTRIBUYENTE_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/contribuyentes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CONTRIBUYENTE_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: CONTRIBUYENTE_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
