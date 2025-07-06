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
} from "../actions/types";

const initialState = {
  likes: [],
  currentLike: null,
  loading: false,
  error: null,
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_CREATE_REQUEST:
    case LIKE_FIND_ALL_REQUEST:
    case LIKE_FIND_ONE_REQUEST:
    case LIKE_REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LIKE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        likes: [...state.likes, action.payload],
        error: null,
      };
    case LIKE_FIND_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        likes: action.payload,
        error: null,
      };
    case LIKE_FIND_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentLike: action.payload,
        error: null,
      };
    case LIKE_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        likes: state.likes.filter((like) => like.id !== action.payload),
        error: null,
      };
    case LIKE_CREATE_FAILURE:
    case LIKE_FIND_ALL_FAILURE:
    case LIKE_FIND_ONE_FAILURE:
    case LIKE_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default likeReducer;
