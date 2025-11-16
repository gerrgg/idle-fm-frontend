import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // login sets the cookie
      const loginRes = await api.post("/auth/login", { email, password });

      // backend returns: { message: "...", user: {...} }
      const loggedInUser = loginRes.data.user;

      return loggedInUser;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

export const loadSession = createAsyncThunk(
  "auth/loadSession",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/me");
      return res.data.user; // always pull .user
    } catch {
      return rejectWithValue(null);
    }
  }
);

// Logout clears cookie on server
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await api.post("/auth/logout");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    sessionLoaded: false, // Move it here!
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.sessionLoaded = true; // Optional: mark session as loaded after login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // load session
      .addCase(loadSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.sessionLoaded = true; // Set to true on success
      })
      .addCase(loadSession.rejected, (state) => {
        state.sessionLoaded = true; // Set to true even on failure!
      })
      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
