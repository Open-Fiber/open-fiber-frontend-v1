import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Async thunks
export const createMaquina = createAsyncThunk(
  "maquina/create",
  async ({ maquinaData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/maquinas`,
        maquinaData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllMaquinas = createAsyncThunk(
  "maquina/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/maquinas`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMaquinaById = createAsyncThunk(
  "maquina/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/maquinas/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateMaquina = createAsyncThunk(
  "maquina/update",
  async ({ id, maquinaData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/maquinas/${id}`,
        maquinaData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteMaquina = createAsyncThunk(
  "maquina/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/maquinas/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Special operation: find by proyecto
export const fetchMaquinasByProyecto = createAsyncThunk(
  "maquina/fetchByProyecto",
  async ({ proyectoId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/maquinas/proyecto/${proyectoId}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const maquinaSlice = createSlice({
  name: "maquina",
  initialState: {
    maquinas: [],
    currentMaquina: null,
    loading: false,
    error: null,
    proyectoMaquinas: [], // Maquinas filtered by proyecto
  },
  reducers: {
    clearCurrentMaquina: (state) => {
      state.currentMaquina = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearProyectoMaquinas: (state) => {
      state.proyectoMaquinas = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create maquina
      .addCase(createMaquina.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMaquina.fulfilled, (state, action) => {
        state.loading = false;
        state.maquinas.push(action.payload);
      })
      .addCase(createMaquina.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all maquinas
      .addCase(fetchAllMaquinas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMaquinas.fulfilled, (state, action) => {
        state.loading = false;
        state.maquinas = action.payload;
      })
      .addCase(fetchAllMaquinas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch maquina by ID
      .addCase(fetchMaquinaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaquinaById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMaquina = action.payload;
      })
      .addCase(fetchMaquinaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update maquina
      .addCase(updateMaquina.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMaquina.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.maquinas.findIndex(
          (m) => m.id === action.payload.id
        );
        if (index !== -1) {
          state.maquinas[index] = action.payload;
        }
        if (state.currentMaquina?.id === action.payload.id) {
          state.currentMaquina = action.payload;
        }
      })
      .addCase(updateMaquina.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete maquina
      .addCase(deleteMaquina.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMaquina.fulfilled, (state, action) => {
        state.loading = false;
        state.maquinas = state.maquinas.filter((m) => m.id !== action.payload);
        state.proyectoMaquinas = state.proyectoMaquinas.filter(
          (m) => m.id !== action.payload
        );
        if (state.currentMaquina?.id === action.payload) {
          state.currentMaquina = null;
        }
      })
      .addCase(deleteMaquina.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch maquinas by proyecto
      .addCase(fetchMaquinasByProyecto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaquinasByProyecto.fulfilled, (state, action) => {
        state.loading = false;
        state.proyectoMaquinas = action.payload;
      })
      .addCase(fetchMaquinasByProyecto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentMaquina, clearError, clearProyectoMaquinas } =
  maquinaSlice.actions;

// Selectors
export const selectMaquinas = (state) => state.maquina.maquinas;
export const selectCurrentMaquina = (state) => state.maquina.currentMaquina;
export const selectMaquinaLoading = (state) => state.maquina.loading;
export const selectMaquinaError = (state) => state.maquina.error;
export const selectProyectoMaquinas = (state) => state.maquina.proyectoMaquinas;

// Advanced selectors
export const selectMaquinasByCategoria = (state, categoria) =>
  state.maquina.maquinas.filter((m) => m.categoria === categoria);

export const selectPublicMaquinas = (state) =>
  state.maquina.maquinas.filter((m) => !m.isPrivate);

export default maquinaSlice.reducer;
