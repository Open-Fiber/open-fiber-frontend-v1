import axios from "axios";
import {
  COMENTARIO_CREATE_REQUEST,
  COMENTARIO_CREATE_SUCCESS,
  COMENTARIO_CREATE_FAILURE,
  COMENTARIO_FIND_ALL_REQUEST,
  COMENTARIO_FIND_ALL_SUCCESS,
  COMENTARIO_FIND_ALL_FAILURE,
  COMENTARIO_FIND_ONE_REQUEST,
  COMENTARIO_FIND_ONE_SUCCESS,
  COMENTARIO_FIND_ONE_FAILURE,
  COMENTARIO_UPDATE_REQUEST,
  COMENTARIO_UPDATE_SUCCESS,
  COMENTARIO_UPDATE_FAILURE,
  COMENTARIO_REMOVE_REQUEST,
  COMENTARIO_REMOVE_SUCCESS,
  COMENTARIO_REMOVE_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new comment.
 * @param {object} comentarioData - Data for creating a new comment.
 * @param {string} token - Authorization token.
 */
export const createComentario = (comentarioData, token) => async (dispatch) => {
  dispatch({ type: COMENTARIO_CREATE_REQUEST });
  try {
    const response = await axios.post(
      `${API_URL}/api/comentarios`,
      comentarioData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({
      type: COMENTARIO_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: COMENTARIO_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all comments.
 * @param {string} token - Authorization token.
 */
export const findAllComentarios = (token) => async (dispatch) => {
  dispatch({ type: COMENTARIO_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/comentarios`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: COMENTARIO_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: COMENTARIO_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single comment by ID.
 * @param {string} id - ID of the comment to fetch.
 * @param {string} token - Authorization token.
 */
export const findOneComentario = (id, token) => async (dispatch) => {
  dispatch({ type: COMENTARIO_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/comentarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: COMENTARIO_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: COMENTARIO_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing comment.
 * @param {string} id - ID of the comment to update.
 * @param {object} comentarioData - Data for updating the comment.
 * @param {string} token - Authorization token.
 */
export const updateComentario =
  (id, comentarioData, token) => async (dispatch) => {
    dispatch({ type: COMENTARIO_UPDATE_REQUEST });
    try {
      const response = await axios.put(
        `${API_URL}/api/comentarios/${id}`,
        comentarioData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: COMENTARIO_UPDATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: COMENTARIO_UPDATE_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

/**
 * Action to remove (soft delete) a comment by ID.
 * @param {string} id - ID of the comment to remove.
 * @param {string} token - Authorization token.
 */
export const removeComentario = (id, token) => async (dispatch) => {
  dispatch({ type: COMENTARIO_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/comentarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: COMENTARIO_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: COMENTARIO_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
