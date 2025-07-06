// src/redux/actions/contextoDeAplicacionActions.js
import axios from "axios";
import {
  CONTEXTO_DE_APLICACION_CREATE_REQUEST,
  CONTEXTO_DE_APLICACION_CREATE_SUCCESS,
  CONTEXTO_DE_APLICACION_CREATE_FAILURE,
  CONTEXTO_DE_APLICACION_FIND_ALL_REQUEST,
  CONTEXTO_DE_APLICACION_FIND_ALL_SUCCESS,
  CONTEXTO_DE_APLICACION_FIND_ALL_FAILURE,
  CONTEXTO_DE_APLICACION_FIND_ONE_REQUEST,
  CONTEXTO_DE_APLICACION_FIND_ONE_SUCCESS,
  CONTEXTO_DE_APLICACION_FIND_ONE_FAILURE,
  CONTEXTO_DE_APLICACION_UPDATE_REQUEST,
  CONTEXTO_DE_APLICACION_UPDATE_SUCCESS,
  CONTEXTO_DE_APLICACION_UPDATE_FAILURE,
  CONTEXTO_DE_APLICACION_REMOVE_REQUEST,
  CONTEXTO_DE_APLICACION_REMOVE_SUCCESS,
  CONTEXTO_DE_APLICACION_REMOVE_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new application context.
 * @param {object} contextoData - Data for creating a new application context.
 * @param {string} token - Authorization token.
 */
export const createContextoDeAplicacion =
  (contextoData, token) => async (dispatch) => {
    dispatch({ type: CONTEXTO_DE_APLICACION_CREATE_REQUEST });
    try {
      const response = await axios.post(
        `${API_URL}/api/contextos-de-aplicacion`,
        contextoData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: CONTEXTO_DE_APLICACION_CREATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CONTEXTO_DE_APLICACION_CREATE_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

/**
 * Action to fetch all application contexts.
 * @param {string} token - Authorization token.
 */
export const findAllContextosDeAplicacion = (token) => async (dispatch) => {
  dispatch({ type: CONTEXTO_DE_APLICACION_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/contextos-de-aplicacion`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CONTEXTO_DE_APLICACION_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CONTEXTO_DE_APLICACION_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single application context by ID.
 * @param {string} id - ID of the application context to fetch.
 * @param {string} token - Authorization token.
 */
export const findOneContextoDeAplicacion = (id, token) => async (dispatch) => {
  dispatch({ type: CONTEXTO_DE_APLICACION_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(
      `${API_URL}/api/contextos-de-aplicacion/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: CONTEXTO_DE_APLICACION_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CONTEXTO_DE_APLICACION_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing application context.
 * @param {string} id - ID of the application context to update.
 * @param {object} contextoData - Data for updating the application context.
 * @param {string} token - Authorization token.
 */
export const updateContextoDeAplicacion =
  (id, contextoData, token) => async (dispatch) => {
    dispatch({ type: CONTEXTO_DE_APLICACION_UPDATE_REQUEST });
    try {
      const response = await axios.put(
        `${API_URL}/api/contextos-de-aplicacion/${id}`,
        contextoData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: CONTEXTO_DE_APLICACION_UPDATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CONTEXTO_DE_APLICACION_UPDATE_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

/**
 * Action to remove (soft delete) an application context by ID.
 * @param {string} id - ID of the application context to remove.
 * @param {string} token - Authorization token.
 */
export const removeContextoDeAplicacion = (id, token) => async (dispatch) => {
  dispatch({ type: CONTEXTO_DE_APLICACION_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/contextos-de-aplicacion/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CONTEXTO_DE_APLICACION_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: CONTEXTO_DE_APLICACION_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
