import axios from "axios";
import {
  PROYECTO_CREATE_REQUEST,
  PROYECTO_CREATE_SUCCESS,
  PROYECTO_CREATE_FAILURE,
  PROYECTO_FIND_ALL_REQUEST,
  PROYECTO_FIND_ALL_SUCCESS,
  PROYECTO_FIND_ALL_FAILURE,
  PROYECTO_FIND_ONE_REQUEST,
  PROYECTO_FIND_ONE_SUCCESS,
  PROYECTO_FIND_ONE_FAILURE,
  PROYECTO_UPDATE_REQUEST,
  PROYECTO_UPDATE_SUCCESS,
  PROYECTO_UPDATE_FAILURE,
  PROYECTO_REMOVE_REQUEST,
  PROYECTO_REMOVE_SUCCESS,
  PROYECTO_REMOVE_FAILURE,
  PROYECTO_FIND_BY_CUENTA_REQUEST,
  PROYECTO_FIND_BY_CUENTA_SUCCESS,
  PROYECTO_FIND_BY_CUENTA_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new project.
 * @param {object} proyectoData - Data for creating a new project.
 * @param {string} token - Authorization token.
 */
export const createProyecto = (proyectoData, token) => async (dispatch) => {
  dispatch({ type: PROYECTO_CREATE_REQUEST });
  try {
    const response = await axios.post(
      `${API_URL}/api/proyectos`,
      proyectoData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: PROYECTO_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROYECTO_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all projects.
 * @param {string} token - Authorization token.
 */
export const findAllProyectos = (token) => async (dispatch) => {
  dispatch({ type: PROYECTO_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/proyectos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: PROYECTO_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROYECTO_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single project by ID.
 * @param {string} id - ID of the project to fetch.
 * @param {string} token - Authorization token.
 */
export const findOneProyecto = (id, token) => async (dispatch) => {
  dispatch({ type: PROYECTO_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/proyectos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: PROYECTO_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROYECTO_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing project.
 * @param {string} id - ID of the project to update.
 * @param {object} proyectoData - Data for updating the project.
 * @param {string} token - Authorization token.
 */
export const updateProyecto = (id, proyectoData, token) => async (dispatch) => {
  dispatch({ type: PROYECTO_UPDATE_REQUEST });
  try {
    const response = await axios.put(
      `${API_URL}/api/proyectos/${id}`,
      proyectoData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: PROYECTO_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROYECTO_UPDATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to remove a project by ID.
 * @param {string} id - ID of the project to remove.
 * @param {string} token - Authorization token.
 */
export const removeProyecto = (id, token) => async (dispatch) => {
  dispatch({ type: PROYECTO_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/proyectos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: PROYECTO_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: PROYECTO_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to find projects by cuenta ID.
 * @param {string} id - ID of the cuenta.
 * @param {string} token - Authorization token.
 */
export const findProyectosByCuenta = (id, token) => async (dispatch) => {
  dispatch({ type: PROYECTO_FIND_BY_CUENTA_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/proyectos/cuenta/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: PROYECTO_FIND_BY_CUENTA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROYECTO_FIND_BY_CUENTA_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
