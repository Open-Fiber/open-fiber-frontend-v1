import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createLike = createAsyncThunk(
  "like/create",
  async ({ likeData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/likes`,
        likeData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllLikes = createAsyncThunk(
  "like/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/likes`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchLikeById = createAsyncThunk(
  "like/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/likes/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteLike = createAsyncThunk(
  "like/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/likes/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Toggle like functionality (create if doesn't exist, delete if exists)
export const toggleLike = createAsyncThunk(
  "like/toggle",
  async (
    { maquinaId, cuentaId, token },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const existingLike = state.like.likes.find(
        (like) => like.maquinaId === maquinaId && like.cuentaId === cuentaId
      );

      if (existingLike) {
        // Delete existing like
        await dispatch(deleteLike({ id: existingLike.id, token }));
        return { action: "deleted", likeId: existingLike.id };
      } else {
        // Create new like
        const result = await dispatch(
          createLike({
            likeData: { maquinaId, cuentaId },
            token,
          })
        );
        return { action: "created", like: result.payload };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState: {
    likes: [],
    currentLike: null,
    loading: false,
    error: null,
    toggleLoading: false,
  },
  reducers: {
    clearCurrentLike: (state) => {
      state.currentLike = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create like
      .addCase(createLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLike.fulfilled, (state, action) => {
        state.loading = false;
        state.likes.push(action.payload);
      })
      .addCase(createLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all likes
      .addCase(fetchAllLikes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = action.payload;
      })
      .addCase(fetchAllLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch like by ID
      .addCase(fetchLikeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLike = action.payload;
      })
      .addCase(fetchLikeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete like
      .addCase(deleteLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = state.likes.filter((l) => l.id !== action.payload);
        if (state.currentLike?.id === action.payload) {
          state.currentLike = null;
        }
      })
      .addCase(deleteLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle like
      .addCase(toggleLike.pending, (state) => {
        state.toggleLoading = true;
        state.error = null;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.toggleLoading = false;
        // The individual create/delete actions will handle state updates
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.toggleLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentLike, clearError: clearLikeError } =
  likeSlice.actions;

export const selectLikes = (state) => state.like.likes;
export const selectCurrentLike = (state) => state.like.currentLike;
export const selectLikeLoading = (state) => state.like.loading;
export const selectLikeError = (state) => state.like.error;
export const selectToggleLikeLoading = (state) => state.like.toggleLoading;

// Advanced selectors
export const selectLikesByMaquina = (state, maquinaId) =>
  state.like.likes.filter((l) => l.maquinaId === maquinaId);

export const selectLikesByCuenta = (state, cuentaId) =>
  state.like.likes.filter((l) => l.cuentaId === cuentaId);

export const selectIsLikedByUser = (state, maquinaId, cuentaId) =>
  state.like.likes.some(
    (l) => l.maquinaId === maquinaId && l.cuentaId === cuentaId
  );

export const likeReducer = likeSlice.reducer;
