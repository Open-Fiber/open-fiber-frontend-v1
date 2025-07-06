import axios from "axios";
import {
  CASO_DE_USO_CREATE_REQUEST,
  CASO_DE_USO_CREATE_SUCCESS,
  CASO_DE_USO_CREATE_FAILURE,
  CASO_DE_USO_FIND_ALL_REQUEST,
  CASO_DE_USO_FIND_ALL_SUCCESS,
  CASO_DE_USO_FIND_ALL_FAILURE,
  CASO_DE_USO_FIND_ONE_REQUEST,
  CASO_DE_USO_FIND_ONE_SUCCESS,
  CASO_DE_USO_FIND_ONE_FAILURE,
  CASO_DE_USO_UPDATE_REQUEST,
  CASO_DE_USO_UPDATE_SUCCESS,
  CASO_DE_USO_UPDATE_FAILURE,
  CASO_DE_USO_REMOVE_REQUEST,
  CASO_DE_USO_REMOVE_SUCCESS,
  CASO_DE_USO_REMOVE_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new use case.
 * @param {object} casoDeUsoData - Data for creating a new use case.
 * @param {string} token - Authorization token.
 */
export const createCasoDeUso = (casoDeUsoData, token) => async (dispatch) => {
  dispatch({ type: CASO_DE_USO_CREATE_REQUEST });
  try {
    const response = await axios.post(
      `${API_URL}/api/casos-de-uso`,
      casoDeUsoData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: CASO_DE_USO_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CASO_DE_USO_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all use cases.
 * @param {string} token - Authorization token.
 */
export const findAllCasosDeUso = (token) => async (dispatch) => {
  dispatch({ type: CASO_DE_USO_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/casos-de-uso`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CASO_DE_USO_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CASO_DE_USO_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single use case by ID.
 * @param {string} id - ID of the use case to fetch.
 * @param {string} token - Authorization token.
 */
export const findOneCasoDeUso = (id, token) => async (dispatch) => {
  dispatch({ type: CASO_DE_USO_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/casos-de-uso/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CASO_DE_USO_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CASO_DE_USO_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing use case.
 * @param {string} id - ID of the use case to update.
 * @param {object} casoDeUsoData - Data for updating the use case.
 * @param {string} token - Authorization token.
 */
export const updateCasoDeUso =
  (id, casoDeUsoData, token) => async (dispatch) => {
    dispatch({ type: CASO_DE_USO_UPDATE_REQUEST });
    try {
      const response = await axios.put(
        `${API_URL}/api/casos-de-uso/${id}`,
        casoDeUsoData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: CASO_DE_USO_UPDATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CASO_DE_USO_UPDATE_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

/**
 * Action to remove (soft delete) a use case by ID.
 * @param {string} id - ID of the use case to remove.
 * @param {string} token - Authorization token.
 */
export const removeCasoDeUso = (id, token) => async (dispatch) => {
  dispatch({ type: CASO_DE_USO_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/casos-de-uso/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CASO_DE_USO_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: CASO_DE_USO_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
