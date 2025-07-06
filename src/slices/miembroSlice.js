import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createMiembro = createAsyncThunk(
  "miembro/create",
  async ({ miembroData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/miembros`,
        miembroData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllMiembros = createAsyncThunk(
  "miembro/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/miembros`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMiembroById = createAsyncThunk(
  "miembro/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/miembros/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateMiembro = createAsyncThunk(
  "miembro/update",
  async ({ id, miembroData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/miembros/${id}`,
        miembroData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteMiembro = createAsyncThunk(
  "miembro/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/miembros/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const miembroSlice = createSlice({
  name: "miembro",
  initialState: {
    miembros: [],
    currentMiembro: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentMiembro: (state) => {
      state.currentMiembro = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMiembro.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMiembro.fulfilled, (state, action) => {
        state.loading = false;
        state.miembros.push(action.payload);
      })
      .addCase(createMiembro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllMiembros.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMiembros.fulfilled, (state, action) => {
        state.loading = false;
        state.miembros = action.payload;
      })
      .addCase(fetchAllMiembros.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMiembroById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMiembroById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMiembro = action.payload;
      })
      .addCase(fetchMiembroById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMiembro.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMiembro.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.miembros.findIndex(
          (m) => m.id === action.payload.id
        );
        if (index !== -1) {
          state.miembros[index] = action.payload;
        }
        if (state.currentMiembro?.id === action.payload.id) {
          state.currentMiembro = action.payload;
        }
      })
      .addCase(updateMiembro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMiembro.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMiembro.fulfilled, (state, action) => {
        state.loading = false;
        state.miembros = state.miembros.filter((m) => m.id !== action.payload);
        if (state.currentMiembro?.id === action.payload) {
          state.currentMiembro = null;
        }
      })
      .addCase(deleteMiembro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentMiembro, clearError: clearMiembroError } =
  miembroSlice.actions;

export const selectMiembros = (state) => state.miembro.miembros;
export const selectCurrentMiembro = (state) => state.miembro.currentMiembro;
export const selectMiembroLoading = (state) => state.miembro.loading;
export const selectMiembroError = (state) => state.miembro.error;

// Advanced selectors
export const selectMiembrosByOrganizacion = (state, organizacionId) =>
  state.miembro.miembros.filter((m) => m.organizacionId === organizacionId);

export const selectActiveMiembros = (state) =>
  state.miembro.miembros.filter((m) => m.isActivo);

export const miembroReducer = miembroSlice.reducer;
