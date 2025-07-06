// src/redux/actions/likeActions.js
import axios from "axios";
import {
  LIKE_CREATE_REQUEST,
  LIKE_CREATE_SUCCESS,
  LIKE_CREATE_FAILURE,
  LIKE_FIND_ALL_REQUEST,
  LIKE_FIND_ALL_SUCCESS,
  LIKE_FIND_ALL_FAILURE,
  LIKE_FIND_ONE_REQUEST,
  LIKE_FIND_ONE_SUCCESS,
  LIKE_FIND_ONE_FAILURE,
  LIKE_REMOVE_REQUEST,
  LIKE_REMOVE_SUCCESS,
  LIKE_REMOVE_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new like.
 * @param {object} likeData - Data for creating a new like.
 * @param {string} token - Authorization token.
 */
export const createLike = (likeData, token) => async (dispatch) => {
  dispatch({ type: LIKE_CREATE_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/api/likes`, likeData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: LIKE_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: LIKE_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all likes.
 * @param {string} token - Authorization token.
 */
export const findAllLikes = (token) => async (dispatch) => {
  dispatch({ type: LIKE_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/likes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: LIKE_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: LIKE_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single like by ID.
 * @param {string} id - ID of the like to fetch.
 * @param {string} token - Authorization token.
 */
export const findOneLike = (id, token) => async (dispatch) => {
  dispatch({ type: LIKE_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/likes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: LIKE_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: LIKE_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to remove (soft delete) a like by ID.
 * @param {string} id - ID of the like to remove.
 * @param {string} token - Authorization token.
 */
export const removeLike = (id, token) => async (dispatch) => {
  dispatch({ type: LIKE_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/likes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: LIKE_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: LIKE_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
