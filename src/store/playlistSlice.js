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

// ----------------------------------------
// FETCH USER PLAYLISTS
// ----------------------------------------
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
// DELETE PLAYLIST
// ----------------------------------------
export const deletePlaylist = createAsyncThunk(
  "playlists/deletePlaylist",
  async (id, { rejectWithValue }) => {
    try {
      await playlistApi.delete(id);
      return id; // return the deleted playlist ID
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete playlist");
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
      .addCase(createEmptyPlaylist.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createEmptyPlaylist.fulfilled, (state, action) => {
        state.creating = false;
        state.created = action.payload;
        state.items.push(action.payload);
      })
      .addCase(createEmptyPlaylist.rejected, (state, action) => {
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

    // UPDATE
    builder
      .addCase(updatePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        state.items = state.items.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(updatePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // DELETE
    builder
      .addCase(deletePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        console.log("Action Payload (ID to delete):", typeof action.payload);
        console.log(
          "First item ID in state:",
          typeof state.items[state.items.length - 1]?.id
        );
        state.loading = false;
        state.items = state.items.filter(
          (p) => p.id !== Number(action.payload)
        );
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default playlistSlice.reducer;
