import axios from "axios";
import {
  ROL_CREATE_REQUEST,
  ROL_CREATE_SUCCESS,
  ROL_CREATE_FAILURE,
  ROL_FIND_ALL_REQUEST,
  ROL_FIND_ALL_SUCCESS,
  ROL_FIND_ALL_FAILURE,
  ROL_FIND_ONE_REQUEST,
  ROL_FIND_ONE_SUCCESS,
  ROL_FIND_ONE_FAILURE,
  ROL_UPDATE_REQUEST,
  ROL_UPDATE_SUCCESS,
  ROL_UPDATE_FAILURE,
  ROL_REMOVE_REQUEST,
  ROL_REMOVE_SUCCESS,
  ROL_REMOVE_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new role.
 * @param {object} rolData - Data for creating a new role.
 * @param {string} token - Authorization token.
 */
export const createRol = (rolData, token) => async (dispatch) => {
  dispatch({ type: ROL_CREATE_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/api/rol`, rolData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: ROL_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ROL_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all roles.
 * @param {object} params - Query parameters (value, attr, order, offset, limit).
 * @param {string} token - Authorization token.
 */
export const findAllRoles = (params, token) => async (dispatch) => {
  dispatch({ type: ROL_FIND_ALL_REQUEST });
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${API_URL}/api/rol?${queryString}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: ROL_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ROL_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single role by ID.
 * @param {string} id - ID of the role to fetch.
 * @param {string} token - Authorization token.
 */
export const findOneRol = (id, token) => async (dispatch) => {
  dispatch({ type: ROL_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/rol/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: ROL_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ROL_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing role.
 * @param {string} id - ID of the role to update.
 * @param {object} rolData - Data for updating the role.
 * @param {string} token - Authorization token.
 */
export const updateRol = (id, rolData, token) => async (dispatch) => {
  dispatch({ type: ROL_UPDATE_REQUEST });
  try {
    const response = await axios.patch(`${API_URL}/api/rol/${id}`, rolData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: ROL_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ROL_UPDATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to remove a role by ID.
 * @param {string} id - ID of the role to remove.
 * @param {string} token - Authorization token.
 */
export const removeRol = (id, token) => async (dispatch) => {
  dispatch({ type: ROL_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/rol/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: ROL_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: ROL_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
