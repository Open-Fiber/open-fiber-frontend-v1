import axios from "axios";
import {
  MAQUINA_CREATE_REQUEST,
  MAQUINA_CREATE_SUCCESS,
  MAQUINA_CREATE_FAILURE,
  MAQUINA_FIND_ALL_REQUEST,
  MAQUINA_FIND_ALL_SUCCESS,
  MAQUINA_FIND_ALL_FAILURE,
  MAQUINA_FIND_ONE_REQUEST,
  MAQUINA_FIND_ONE_SUCCESS,
  MAQUINA_FIND_ONE_FAILURE,
  MAQUINA_UPDATE_REQUEST,
  MAQUINA_UPDATE_SUCCESS,
  MAQUINA_UPDATE_FAILURE,
  MAQUINA_REMOVE_REQUEST,
  MAQUINA_REMOVE_SUCCESS,
  MAQUINA_REMOVE_FAILURE,
  MAQUINA_FIND_BY_PROYECTO_REQUEST,
  MAQUINA_FIND_BY_PROYECTO_SUCCESS,
  MAQUINA_FIND_BY_PROYECTO_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new machine.
 * @param {object} maquinaData - Data for creating a new machine.
 * @param {string} token - Authorization token.
 */
export const createMaquina = (maquinaData, token) => async (dispatch) => {
  dispatch({ type: MAQUINA_CREATE_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/api/maquinas`, maquinaData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: MAQUINA_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: MAQUINA_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all machines.
 * @param {string} token - Authorization token.
 */
export const findAllMaquinas = (token) => async (dispatch) => {
  dispatch({ type: MAQUINA_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/maquinas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: MAQUINA_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: MAQUINA_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single machine by ID.
 * @param {string} id - ID of the machine to fetch.
 * @param {string} token - Authorization token.
 */
export const findOneMaquina = (id, token) => async (dispatch) => {
  dispatch({ type: MAQUINA_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/maquinas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: MAQUINA_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: MAQUINA_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing machine.
 * @param {string} id - ID of the machine to update.
 * @param {object} maquinaData - Data for updating the machine.
 * @param {string} token - Authorization token.
 */
export const updateMaquina = (id, maquinaData, token) => async (dispatch) => {
  dispatch({ type: MAQUINA_UPDATE_REQUEST });
  try {
    const response = await axios.put(
      `${API_URL}/api/maquinas/${id}`,
      maquinaData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: MAQUINA_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: MAQUINA_UPDATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to remove a machine by ID.
 * @param {string} id - ID of the machine to remove.
 * @param {string} token - Authorization token.
 */
export const removeMaquina = (id, token) => async (dispatch) => {
  dispatch({ type: MAQUINA_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/maquinas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: MAQUINA_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: MAQUINA_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to find machines by proyecto ID.
 * @param {string} id - ID of the proyecto.
 * @param {string} token - Authorization token.
 */
export const findMaquinasByProyecto = (id, token) => async (dispatch) => {
  dispatch({ type: MAQUINA_FIND_BY_PROYECTO_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/maquinas/proyecto/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: MAQUINA_FIND_BY_PROYECTO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: MAQUINA_FIND_BY_PROYECTO_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
