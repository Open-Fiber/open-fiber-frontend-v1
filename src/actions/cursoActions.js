import axios from "axios";
import {
  CURSO_CREATE_REQUEST,
  CURSO_CREATE_SUCCESS,
  CURSO_CREATE_FAILURE,
  CURSO_FIND_ALL_REQUEST,
  CURSO_FIND_ALL_SUCCESS,
  CURSO_FIND_ALL_FAILURE,
  CURSO_FIND_ONE_REQUEST,
  CURSO_FIND_ONE_SUCCESS,
  CURSO_FIND_ONE_FAILURE,
  CURSO_UPDATE_REQUEST,
  CURSO_UPDATE_SUCCESS,
  CURSO_UPDATE_FAILURE,
  CURSO_REMOVE_REQUEST,
  CURSO_REMOVE_SUCCESS,
  CURSO_REMOVE_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new course.
 * @param {object} cursoData - Data for creating a new course.
 * @param {string} token - Authorization token.
 */
export const createCurso = (cursoData, token) => async (dispatch) => {
  dispatch({ type: CURSO_CREATE_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/api/cursos`, cursoData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CURSO_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CURSO_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all courses.
 * @param {string} token - Authorization token.
 */
export const findAllCursos = (token) => async (dispatch) => {
  dispatch({ type: CURSO_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/cursos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CURSO_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CURSO_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single course by ID.
 * @param {string} id - ID of the course to fetch.
 * @param {string} token - Authorization token.
 */
export const findOneCurso = (id, token) => async (dispatch) => {
  dispatch({ type: CURSO_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/cursos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CURSO_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CURSO_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing course.
 * @param {string} id - ID of the course to update.
 * @param {object} cursoData - Data for updating the course.
 * @param {string} token - Authorization token.
 */
export const updateCurso = (id, cursoData, token) => async (dispatch) => {
  dispatch({ type: CURSO_UPDATE_REQUEST });
  try {
    const response = await axios.put(`${API_URL}/api/cursos/${id}`, cursoData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CURSO_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CURSO_UPDATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to remove (soft delete) a course by ID.
 * @param {string} id - ID of the course to remove.
 * @param {string} token - Authorization token.
 */
export const removeCurso = (id, token) => async (dispatch) => {
  dispatch({ type: CURSO_REMOVE_REQUEST });
  try {
    await axios.delete(`${API_URL}/api/cursos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CURSO_REMOVE_SUCCESS,
      payload: id, // Optionally pass the ID of the removed item
    });
  } catch (error) {
    dispatch({
      type: CURSO_REMOVE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
