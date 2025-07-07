import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createCurso = createAsyncThunk(
  "curso/create",
  async ({ cursoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/cursos`,
        cursoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllCursos = createAsyncThunk(
  "curso/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/cursos`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCursoById = createAsyncThunk(
  "curso/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/cursos/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCurso = createAsyncThunk(
  "curso/update",
  async ({ id, cursoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/cursos/${id}`,
        cursoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCurso = createAsyncThunk(
  "curso/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/cursos/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cursoSlice = createSlice({
  name: "curso",
  initialState: {
    cursos: [],
    currentCurso: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentCurso: (state) => {
      state.currentCurso = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCurso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCurso.fulfilled, (state, action) => {
        state.loading = false;
        state.cursos.push(action.payload);
      })
      .addCase(createCurso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllCursos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCursos.fulfilled, (state, action) => {
        state.loading = false;
        state.cursos = action.payload;
      })
      .addCase(fetchAllCursos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCursoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCursoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCurso = action.payload;
      })
      .addCase(fetchCursoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCurso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCurso.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cursos.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.cursos[index] = action.payload;
        }
        if (state.currentCurso?.id === action.payload.id) {
          state.currentCurso = action.payload;
        }
      })
      .addCase(updateCurso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCurso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCurso.fulfilled, (state, action) => {
        state.loading = false;
        state.cursos = state.cursos.filter((c) => c.id !== action.payload);
        if (state.currentCurso?.id === action.payload) {
          state.currentCurso = null;
        }
      })
      .addCase(deleteCurso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentCurso, clearError: clearCursoError } =
  cursoSlice.actions;

export const selectCursos = (state) => state.curso.cursos;
export const selectCurrentCurso = (state) => state.curso.currentCurso;
export const selectCursoLoading = (state) => state.curso.loading;
export const selectCursoError = (state) => state.curso.error;

// Advanced selectors
export const selectCursosByNivel = (state, nivel) =>
  state.curso.cursos.filter((c) => c.nivel === nivel);

export const cursoReducer = cursoSlice.reducer;
