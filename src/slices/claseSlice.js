import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createClase = createAsyncThunk(
  "clase/create",
  async ({ claseData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/clases`,
        claseData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllClases = createAsyncThunk(
  "clase/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/clases`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchClaseById = createAsyncThunk(
  "clase/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/clases/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateClase = createAsyncThunk(
  "clase/update",
  async ({ id, claseData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/clases/${id}`,
        claseData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteClase = createAsyncThunk(
  "clase/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/clases/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const claseSlice = createSlice({
  name: "clase",
  initialState: {
    clases: [],
    currentClase: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentClase: (state) => {
      state.currentClase = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClase.fulfilled, (state, action) => {
        state.loading = false;
        state.clases.push(action.payload);
      })
      .addCase(createClase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllClases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllClases.fulfilled, (state, action) => {
        state.loading = false;
        state.clases = action.payload;
      })
      .addCase(fetchAllClases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchClaseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentClase = action.payload;
      })
      .addCase(fetchClaseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateClase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClase.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.clases.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.clases[index] = action.payload;
        }
        if (state.currentClase?.id === action.payload.id) {
          state.currentClase = action.payload;
        }
      })
      .addCase(updateClase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteClase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClase.fulfilled, (state, action) => {
        state.loading = false;
        state.clases = state.clases.filter((c) => c.id !== action.payload);
        if (state.currentClase?.id === action.payload) {
          state.currentClase = null;
        }
      })
      .addCase(deleteClase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentClase, clearError: clearClaseError } =
  claseSlice.actions;

export const selectClases = (state) => state.clase.clases;
export const selectCurrentClase = (state) => state.clase.currentClase;
export const selectClaseLoading = (state) => state.clase.loading;
export const selectClaseError = (state) => state.clase.error;

// Advanced selectors
export const selectClasesByCurso = (state, cursoId) =>
  state.clase.clases.filter((c) => c.cursoId === cursoId);

export const claseReducer = claseSlice.reducer;
