import { createSlice } from "@reduxjs/toolkit";

const playlistsSlice = createSlice({
  name: "playlistsEntities",
  initialState: {
    byId: {},
    allIds: [],
    myIds: [],
    loading: false,
    error: null,
  },
  reducers: {
    upsertPlaylist(state, action) {
      const incoming = action.payload;
      const existing = state.byId[incoming.id];

      // If we already have a playlist, merge fields instead of overwriting
      state.byId[incoming.id] = existing
        ? { ...existing, ...incoming }
        : incoming;

      if (!state.allIds.includes(incoming.id)) {
        state.allIds.push(incoming.id);
      }
    },

    upsertMany(state, action) {
      const playlists = action.payload;

      playlists.forEach((p) => {
        state.byId[p.id] = p;

        if (!state.allIds.includes(p.id)) {
          state.allIds.push(p.id);
        }
      });
    },
    setMyPlaylistIds(state, action) {
      state.myIds = action.payload;
    },
    addMyPlaylistId(state, action) {
      const id = action.payload;
      if (!state.myIds.includes(id)) {
        state.myIds.push(id);
      }
    },
    removePlaylist(state, action) {
      const id = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter((pid) => pid !== id);
      state.myIds = state.myIds.filter((pid) => pid !== id);
    },
  },
});

export const {
  upsertPlaylist,
  upsertMany,
  setMyPlaylistIds,
  addMyPlaylistId,
  removePlaylist,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
