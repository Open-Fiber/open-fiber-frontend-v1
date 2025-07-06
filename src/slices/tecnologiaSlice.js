import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createTecnologia = createAsyncThunk(
  "tecnologia/create",
  async ({ tecnologiaData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/tecnologias`,
        tecnologiaData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllTecnologias = createAsyncThunk(
  "tecnologia/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/tecnologias`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTecnologiaById = createAsyncThunk(
  "tecnologia/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/tecnologias/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTecnologia = createAsyncThunk(
  "tecnologia/update",
  async ({ id, tecnologiaData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/tecnologias/${id}`,
        tecnologiaData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTecnologia = createAsyncThunk(
  "tecnologia/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/tecnologias/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const tecnologiaSlice = createSlice({
  name: "tecnologia",
  initialState: {
    tecnologias: [],
    currentTecnologia: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentTecnologia: (state) => {
      state.currentTecnologia = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTecnologia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTecnologia.fulfilled, (state, action) => {
        state.loading = false;
        state.tecnologias.push(action.payload);
      })
      .addCase(createTecnologia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllTecnologias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTecnologias.fulfilled, (state, action) => {
        state.loading = false;
        state.tecnologias = action.payload;
      })
      .addCase(fetchAllTecnologias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTecnologiaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTecnologiaById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTecnologia = action.payload;
      })
      .addCase(fetchTecnologiaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTecnologia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTecnologia.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tecnologias.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.tecnologias[index] = action.payload;
        }
        if (state.currentTecnologia?.id === action.payload.id) {
          state.currentTecnologia = action.payload;
        }
      })
      .addCase(updateTecnologia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTecnologia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTecnologia.fulfilled, (state, action) => {
        state.loading = false;
        state.tecnologias = state.tecnologias.filter(
          (t) => t.id !== action.payload
        );
        if (state.currentTecnologia?.id === action.payload) {
          state.currentTecnologia = null;
        }
      })
      .addCase(deleteTecnologia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentTecnologia, clearError: clearTecnologiaError } =
  tecnologiaSlice.actions;

export const selectTecnologias = (state) => state.tecnologia.tecnologias;
export const selectCurrentTecnologia = (state) =>
  state.tecnologia.currentTecnologia;
export const selectTecnologiaLoading = (state) => state.tecnologia.loading;
export const selectTecnologiaError = (state) => state.tecnologia.error;

// Advanced selectors
export const selectTecnologiasByTipo = (state, tipo) =>
  state.tecnologia.tecnologias.filter((t) => t.tipo === tipo);

export const tecnologiaReducer = tecnologiaSlice.reducer;
