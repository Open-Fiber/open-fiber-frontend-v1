import axios from "axios";
import {
  TECNOLOGIA_CREATE_REQUEST,
  TECNOLOGIA_CREATE_SUCCESS,
  TECNOLOGIA_CREATE_FAILURE,
  TECNOLOGIA_FIND_ALL_REQUEST,
  TECNOLOGIA_FIND_ALL_SUCCESS,
  TECNOLOGIA_FIND_ALL_FAILURE,
  TECNOLOGIA_FIND_ONE_REQUEST,
  TECNOLOGIA_FIND_ONE_SUCCESS,
  TECNOLOGIA_FIND_ONE_FAILURE,
  TECNOLOGIA_UPDATE_REQUEST,
  TECNOLOGIA_UPDATE_SUCCESS,
  TECNOLOGIA_UPDATE_FAILURE,
  TECNOLOGIA_REMOVE_REQUEST,
  TECNOLOGIA_REMOVE_SUCCESS,
  TECNOLOGIA_REMOVE_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new technology.
 * @param {object} tecnologiaData - Data for creating a new technology.
 * @param {string} token - Authorization token.
 */
export const createTecnologia = (tecnologiaData, token) => async (dispatch) => {
  dispatch({ type: TECNOLOGIA_CREATE_REQUEST });
  try {
    const response = await axios.post(
      `${API_URL}/api/tecnologias`,
      tecnologiaData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: TECNOLOGIA_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: TECNOLOGIA_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all technologies.
 * @param {string} token - Authorization token.
 */
export const findAllTecnologias = (token) => async (dispatch) => {
  dispatch({ type: TECNOLOGIA_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/tecnologias`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: TECNOLOGIA_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: TECNOLOGIA_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single technology by ID.
 * @param {string} id - ID of the technology to fetch.
 * @param {string} token - Authorization token.
 */
export const findOneTecnologia = (id, token) => async (dispatch) => {
  dispatch({ type: TECNOLOGIA_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/tecnologias/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: TECNOLOGIA_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: TECNOLOGIA_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing technology.
 * @param {string} id - ID of the technology to update.
 * @param {object} tecnologiaData - Data for updating the technology.
 * @param {string} token - Authorization token.
 */
export const updateTecnologia =
  (id, tecnologiaData, token) => async (dispatch) => {
    dispatch({ type: TECNOLOGIA_UPDATE_REQUEST });
    try {
      const response = await axios.put(
        `${API_URL}/api/tecnologias/${id}`,
        tecnologiaData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: TECNOLOGIA_UPDATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: TECNOLOGIA_UPDATE_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

/**
 * Action to remove (soft delete) a technology by ID.
 * @param {string} id - ID of the technology to remove.
 * @param {string} token - Authorization token.
 */
export const removeTecnologia = (id, token) => async (dispatch) => {
  dispatch({ type: TECNOLOGIA_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/tecnologias/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: TECNOLOGIA_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: TECNOLOGIA_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
