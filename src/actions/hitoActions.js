import axios from "axios";
import {
  HITO_CREATE_REQUEST,
  HITO_CREATE_SUCCESS,
  HITO_CREATE_FAILURE,
  HITO_FIND_ALL_REQUEST,
  HITO_FIND_ALL_SUCCESS,
  HITO_FIND_ALL_FAILURE,
  HITO_FIND_ONE_REQUEST,
  HITO_FIND_ONE_SUCCESS,
  HITO_FIND_ONE_FAILURE,
  HITO_UPDATE_REQUEST,
  HITO_UPDATE_SUCCESS,
  HITO_UPDATE_FAILURE,
  HITO_REMOVE_REQUEST,
  HITO_REMOVE_SUCCESS,
  HITO_REMOVE_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new milestone.
 * @param {object} hitoData - Data for creating a new milestone.
 * @param {string} token - Authorization token.
 */
export const createHito = (hitoData, token) => async (dispatch) => {
  dispatch({ type: HITO_CREATE_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/api/hitos`, hitoData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: HITO_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: HITO_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all milestones.
 * @param {string} token - Authorization token.
 */
export const findAllHitos = (token) => async (dispatch) => {
  dispatch({ type: HITO_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/hitos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: HITO_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: HITO_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single milestone by ID.
 * @param {string} id - ID of the milestone to fetch.
 * @param {string} token - Authorization token.
 */
export const findOneHito = (id, token) => async (dispatch) => {
  dispatch({ type: HITO_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/hitos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: HITO_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: HITO_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing milestone.
 * @param {string} id - ID of the milestone to update.
 * @param {object} hitoData - Data for updating the milestone.
 * @param {string} token - Authorization token.
 */
export const updateHito = (id, hitoData, token) => async (dispatch) => {
  dispatch({ type: HITO_UPDATE_REQUEST });
  try {
    const response = await axios.put(`${API_URL}/api/hitos/${id}`, hitoData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: HITO_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: HITO_UPDATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to remove (soft delete) a milestone by ID.
 * @param {string} id - ID of the milestone to remove.
 * @param {string} token - Authorization token.
 */
export const removeHito = (id, token) => async (dispatch) => {
  dispatch({ type: HITO_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/hitos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: HITO_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: HITO_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
