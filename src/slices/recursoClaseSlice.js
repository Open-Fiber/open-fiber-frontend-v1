import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// =============================================================================
// RECURSO CLASE SLICE
// =============================================================================

export const createRecursoClase = createAsyncThunk(
  "recursoClase/create",
  async ({ recursoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/recursos-clase`,
        recursoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllRecursosClase = createAsyncThunk(
  "recursoClase/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/recursos-clase`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchRecursoClaseById = createAsyncThunk(
  "recursoClase/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/recursos-clase/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateRecursoClase = createAsyncThunk(
  "recursoClase/update",
  async ({ id, recursoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/recursos-clase/${id}`,
        recursoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteRecursoClase = createAsyncThunk(
  "recursoClase/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/recursos-clase/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const recursoClaseSlice = createSlice({
  name: "recursoClase",
  initialState: {
    recursosClase: [],
    currentRecursoClase: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentRecursoClase: (state) => {
      state.currentRecursoClase = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecursoClase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRecursoClase.fulfilled, (state, action) => {
        state.loading = false;
        state.recursosClase.push(action.payload);
      })
      .addCase(createRecursoClase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllRecursosClase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRecursosClase.fulfilled, (state, action) => {
        state.loading = false;
        state.recursosClase = action.payload;
      })
      .addCase(fetchAllRecursosClase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecursoClaseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecursoClaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecursoClase = action.payload;
      })
      .addCase(fetchRecursoClaseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRecursoClase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRecursoClase.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.recursosClase.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) {
          state.recursosClase[index] = action.payload;
        }
        if (state.currentRecursoClase?.id === action.payload.id) {
          state.currentRecursoClase = action.payload;
        }
      })
      .addCase(updateRecursoClase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRecursoClase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRecursoClase.fulfilled, (state, action) => {
        state.loading = false;
        state.recursosClase = state.recursosClase.filter(
          (r) => r.id !== action.payload
        );
        if (state.currentRecursoClase?.id === action.payload) {
          state.currentRecursoClase = null;
        }
      })
      .addCase(deleteRecursoClase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentRecursoClase, clearError: clearRecursoClaseError } =
  recursoClaseSlice.actions;

export const selectRecursosClase = (state) => state.recursoClase.recursosClase;
export const selectCurrentRecursoClase = (state) =>
  state.recursoClase.currentRecursoClase;
export const selectRecursoClaseLoading = (state) => state.recursoClase.loading;
export const selectRecursoClaseError = (state) => state.recursoClase.error;

// Advanced selectors
export const selectRecursosByClase = (state, claseId) =>
  state.recursoClase.recursosClase.filter((r) => r.claseId === claseId);

export const recursoClaseReducer = recursoClaseSlice.reducer;
