import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createComentario = createAsyncThunk(
  "comentario/create",
  async ({ comentarioData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/comentarios`,
        comentarioData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllComentarios = createAsyncThunk(
  "comentario/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/comentarios`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchComentarioById = createAsyncThunk(
  "comentario/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/comentarios/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateComentario = createAsyncThunk(
  "comentario/update",
  async ({ id, comentarioData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/comentarios/${id}`,
        comentarioData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteComentario = createAsyncThunk(
  "comentario/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/comentarios/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const comentarioSlice = createSlice({
  name: "comentario",
  initialState: {
    comentarios: [],
    currentComentario: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentComentario: (state) => {
      state.currentComentario = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComentario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComentario.fulfilled, (state, action) => {
        state.loading = false;
        state.comentarios.push(action.payload);
      })
      .addCase(createComentario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllComentarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllComentarios.fulfilled, (state, action) => {
        state.loading = false;
        state.comentarios = action.payload;
      })
      .addCase(fetchAllComentarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchComentarioById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComentarioById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentComentario = action.payload;
      })
      .addCase(fetchComentarioById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateComentario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComentario.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.comentarios.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.comentarios[index] = action.payload;
        }
        if (state.currentComentario?.id === action.payload.id) {
          state.currentComentario = action.payload;
        }
      })
      .addCase(updateComentario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteComentario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComentario.fulfilled, (state, action) => {
        state.loading = false;
        state.comentarios = state.comentarios.filter(
          (c) => c.id !== action.payload
        );
        if (state.currentComentario?.id === action.payload) {
          state.currentComentario = null;
        }
      })
      .addCase(deleteComentario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentComentario, clearError: clearComentarioError } =
  comentarioSlice.actions;

export const selectComentarios = (state) => state.comentario.comentarios;
export const selectCurrentComentario = (state) =>
  state.comentario.currentComentario;
export const selectComentarioLoading = (state) => state.comentario.loading;
export const selectComentarioError = (state) => state.comentario.error;

// Advanced selectors
export const selectComentariosByClase = (state, claseId) =>
  state.comentario.comentarios.filter((c) => c.claseId === claseId);

export const comentarioReducer = comentarioSlice.reducer;
