// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

// -----------------------------------------
// LOGIN
// -----------------------------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginRes = await authApi.login(email, password);
      return loginRes.data.user; // backend: { user: {...} }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

// -----------------------------------------
// LOAD EXISTING SESSION FROM COOKIE
// -----------------------------------------
export const loadSession = createAsyncThunk(
  "auth/loadSession",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.me();
      return res.data.user;
    } catch {
      return rejectWithValue(null);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, username, password, confirm }, { rejectWithValue }) => {
    try {
      const res = await authApi.register({
        email,
        username,
        password,
        confirmPassword: confirm,
      });

      // success: backend only returns { message: ... }
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Registration failed"
      );
    }
  }
);

// -----------------------------------------
// LOGOUT (clears cookie)
// -----------------------------------------
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await authApi.logout();
  return null;
});

// -----------------------------------------
// SLICE
// -----------------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    sessionLoaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.sessionLoaded = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOAD SESSION
      .addCase(loadSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.sessionLoaded = true;
      })
      .addCase(loadSession.rejected, (state) => {
        state.sessionLoaded = true;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
