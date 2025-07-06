// src/redux/actions/organizacionActions.js
import axios from "axios";
import {
  ORGANIZACION_CREATE_REQUEST,
  ORGANIZACION_CREATE_SUCCESS,
  ORGANIZACION_CREATE_FAILURE,
  ORGANIZACION_FIND_ALL_REQUEST,
  ORGANIZACION_FIND_ALL_SUCCESS,
  ORGANIZACION_FIND_ALL_FAILURE,
  ORGANIZACION_FIND_ONE_REQUEST,
  ORGANIZACION_FIND_ONE_SUCCESS,
  ORGANIZACION_FIND_ONE_FAILURE,
  ORGANIZACION_UPDATE_REQUEST,
  ORGANIZACION_UPDATE_SUCCESS,
  ORGANIZACION_UPDATE_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to create a new organization.
 * @param {object} organizacionData - Data for creating a new organization.
 */
export const createOrganizacion = (organizacionData) => async (dispatch) => {
  dispatch({ type: ORGANIZACION_CREATE_REQUEST });
  try {
    const response = await axios.post(
      `${API_URL}/api/organizacion`,
      organizacionData
    );
    dispatch({
      type: ORGANIZACION_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORGANIZACION_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch all organizations.
 */
export const findAllOrganizaciones = () => async (dispatch) => {
  dispatch({ type: ORGANIZACION_FIND_ALL_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/organizacion`);
    dispatch({
      type: ORGANIZACION_FIND_ALL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORGANIZACION_FIND_ALL_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to fetch a single organization by ID.
 * @param {string} id - ID of the organization to fetch.
 */
export const findOneOrganizacion = (id) => async (dispatch) => {
  dispatch({ type: ORGANIZACION_FIND_ONE_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/api/organizacion/${id}`);
    dispatch({
      type: ORGANIZACION_FIND_ONE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORGANIZACION_FIND_ONE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

/**
 * Action to update an existing organization.
 * @param {string} id - ID of the organization to update.
 * @param {object} organizacionData - Data for updating the organization.
 */
export const updateOrganizacion =
  (id, organizacionData) => async (dispatch) => {
    dispatch({ type: ORGANIZACION_UPDATE_REQUEST });
    try {
      const response = await axios.patch(
        `${API_URL}/api/organizacion/${id}`,
        organizacionData
      );
      dispatch({
        type: ORGANIZACION_UPDATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ORGANIZACION_UPDATE_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
