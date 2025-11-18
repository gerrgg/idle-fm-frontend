// src/store/playlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import playlistApi from "../api/playlistApi";

// ----------------------------------------
// CREATE PLAYLIST
// ----------------------------------------
export const createPlaylist = createAsyncThunk(
  "playlists/createPlaylist",
  async (data, { rejectWithValue }) => {
    try {
      const res = await playlistApi.create(data);
      return res.data; // playlist object from server
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create playlist");
    }
  }
);

// ----------------------------------------
// UPDATE PLAYLIST
// ----------------------------------------
export const updatePlaylist = createAsyncThunk(
  "playlists/updatePlaylist",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await playlistApi.update(id, data);
      return res.data; // updated playlist object
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update playlist");
    }
  }
);

// ----------------------------------------
// GET PLAYLIST BY ID
// ----------------------------------------
export const getPlaylistById = createAsyncThunk(
  "playlists/getPlaylistById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await playlistApi.getById(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load playlist");
    }
  }
);

// ----------------------------------------
// CREATE EMPTY PLAYLIST
// ----------------------------------------
export const createEmptyPlaylist = createAsyncThunk(
  "playlists/createEmpty",
  async (_, { rejectWithValue }) => {
    try {
      const res = await playlistApi.create({
        title: "New Playlist",
        description: "",
        is_public: true,
        tags: [],
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create playlist");
    }
  }
);

export const fetchUserPlaylists = createAsyncThunk(
  "playlists/fetchUserPlaylists",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await playlistApi.getUserPlaylists(userId);
      return res.data.playlists || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load playlists");
    }
  }
);

// ----------------------------------------
// SLICE
// ----------------------------------------
const playlistSlice = createSlice({
  name: "playlists",
  initialState: {
    creating: false,
    createError: null,
    created: null,
    loading: false,
    error: null,
    current: null,
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createPlaylist.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.creating = false;
        state.created = action.payload;
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // GET USER PLAYLISTS
      .addCase(fetchUserPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(getPlaylistById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getPlaylistById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(getPlaylistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.current = null;
      });

    // GET USER PLAYLISTS
  },
});

export default playlistSlice.reducer;
