import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Async thunks for organization operations
export const createOrganizacion = createAsyncThunk(
  "organizacion/create",
  async (organizacionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/organizacion`,
        organizacionData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllOrganizaciones = createAsyncThunk(
  "organizacion/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/organizacion`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchOrganizacionById = createAsyncThunk(
  "organizacion/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/organizacion/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateOrganizacion = createAsyncThunk(
  "organizacion/update",
  async ({ id, organizacionData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/organizacion/${id}`,
        organizacionData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const organizacionSlice = createSlice({
  name: "organizacion",
  initialState: {
    organizaciones: [],
    currentOrganizacion: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrganizacion: (state) => {
      state.currentOrganizacion = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create organization
      .addCase(createOrganizacion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrganizacion.fulfilled, (state, action) => {
        state.loading = false;
        state.organizaciones.push(action.payload);
      })
      .addCase(createOrganizacion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all organizations
      .addCase(fetchAllOrganizaciones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrganizaciones.fulfilled, (state, action) => {
        state.loading = false;
        state.organizaciones = action.payload;
      })
      .addCase(fetchAllOrganizaciones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch organization by ID
      .addCase(fetchOrganizacionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizacionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrganizacion = action.payload;
      })
      .addCase(fetchOrganizacionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update organization
      .addCase(updateOrganizacion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganizacion.fulfilled, (state, action) => {
        state.loading = false;
        // Update in the array
        const index = state.organizaciones.findIndex(
          (org) => org.id === action.payload.id
        );
        if (index !== -1) {
          state.organizaciones[index] = action.payload;
        }
        // Update current if it's the same
        if (state.currentOrganizacion?.id === action.payload.id) {
          state.currentOrganizacion = action.payload;
        }
      })
      .addCase(updateOrganizacion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrganizacion, clearError } =
  organizacionSlice.actions;

// Selectors
export const selectOrganizaciones = (state) =>
  state.organizacion.organizaciones;
export const selectCurrentOrganizacion = (state) =>
  state.organizacion.currentOrganizacion;
export const selectOrganizacionLoading = (state) => state.organizacion.loading;
export const selectOrganizacionError = (state) => state.organizacion.error;

export default organizacionSlice.reducer;
