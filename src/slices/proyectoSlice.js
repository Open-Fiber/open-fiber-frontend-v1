import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to create headers with token
const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Async thunks for all CRUD operations
export const createProyecto = createAsyncThunk(
  "proyecto/create",
  async ({ proyectoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/proyectos`,
        proyectoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllProyectos = createAsyncThunk(
  "proyecto/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/proyectos`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProyectoById = createAsyncThunk(
  "proyecto/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/proyectos/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProyecto = createAsyncThunk(
  "proyecto/update",
  async ({ id, proyectoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/proyectos/${id}`,
        proyectoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProyecto = createAsyncThunk(
  "proyecto/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/proyectos/${id}`,
        createAuthHeaders(token)
      );
      return id; // Return the deleted ID
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProyectosByCuenta = createAsyncThunk(
  "proyecto/fetchByCuenta",
  async ({ cuentaId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/proyectos/cuenta/${cuentaId}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const proyectoSlice = createSlice({
  name: "proyecto",
  initialState: {
    proyectos: [],
    currentProyecto: null,
    loading: false,
    error: null,
    // Separate loading states for different operations (optional)
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
  },
  reducers: {
    clearCurrentProyecto: (state) => {
      state.currentProyecto = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentProyecto: (state, action) => {
      state.currentProyecto = action.payload;
    },
    // Local update without API call (for optimistic updates)
    updateProyectoLocal: (state, action) => {
      const index = state.proyectos.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.proyectos[index] = {
          ...state.proyectos[index],
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create proyecto
      .addCase(createProyecto.pending, (state) => {
        state.createLoading = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(createProyecto.fulfilled, (state, action) => {
        state.createLoading = false;
        state.loading = false;
        state.proyectos.push(action.payload);
      })
      .addCase(createProyecto.rejected, (state, action) => {
        state.createLoading = false;
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all proyectos
      .addCase(fetchAllProyectos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProyectos.fulfilled, (state, action) => {
        state.loading = false;
        state.proyectos = action.payload;
      })
      .addCase(fetchAllProyectos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch proyecto by ID
      .addCase(fetchProyectoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProyectoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProyecto = action.payload;
      })
      .addCase(fetchProyectoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update proyecto
      .addCase(updateProyecto.pending, (state) => {
        state.updateLoading = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProyecto.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.loading = false;

        // Update in the array
        const index = state.proyectos.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.proyectos[index] = action.payload;
        }

        // Update current if it's the same
        if (state.currentProyecto?.id === action.payload.id) {
          state.currentProyecto = action.payload;
        }
      })
      .addCase(updateProyecto.rejected, (state, action) => {
        state.updateLoading = false;
        state.loading = false;
        state.error = action.payload;
      })

      // Delete proyecto
      .addCase(deleteProyecto.pending, (state) => {
        state.deleteLoading = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProyecto.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.loading = false;

        // Remove from array
        state.proyectos = state.proyectos.filter(
          (p) => p.id !== action.payload
        );

        // Clear current if it was deleted
        if (state.currentProyecto?.id === action.payload) {
          state.currentProyecto = null;
        }
      })
      .addCase(deleteProyecto.rejected, (state, action) => {
        state.deleteLoading = false;
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch proyectos by cuenta
      .addCase(fetchProyectosByCuenta.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProyectosByCuenta.fulfilled, (state, action) => {
        state.loading = false;
        state.proyectos = action.payload;
      })
      .addCase(fetchProyectosByCuenta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  clearCurrentProyecto,
  clearError,
  setCurrentProyecto,
  updateProyectoLocal,
} = proyectoSlice.actions;

// Selectors
export const selectProyectos = (state) => state.proyecto.proyectos;
export const selectCurrentProyecto = (state) => state.proyecto.currentProyecto;
export const selectProyectoLoading = (state) => state.proyecto.loading;
export const selectProyectoError = (state) => state.proyecto.error;
export const selectCreateLoading = (state) => state.proyecto.createLoading;
export const selectUpdateLoading = (state) => state.proyecto.updateLoading;
export const selectDeleteLoading = (state) => state.proyecto.deleteLoading;

// Advanced selectors
export const selectProyectoById = (state, proyectoId) =>
  state.proyecto.proyectos.find((p) => p.id === proyectoId);

export const selectProyectosByStatus = (state, status) =>
  state.proyecto.proyectos.filter((p) => p.status === status);

export default proyectoSlice.reducer;
