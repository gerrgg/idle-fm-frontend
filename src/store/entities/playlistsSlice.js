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
      const id = incoming.id;

      if (!id) return;

      const existing = state.byId[id];

      // Initialize object if it doesn't exist
      if (!existing) {
        state.byId[id] = incoming;
        if (!state.allIds.includes(id)) state.allIds.push(id);
        return;
      }

      // Merge basic fields FIRST
      const updated = { ...existing, ...incoming };

      // Apply deltas correctly
      if (incoming.viewsDelta != null) {
        updated.views = Math.max(
          0,
          (existing.views || 0) + incoming.viewsDelta
        );
      }

      if (incoming.likesDelta != null) {
        updated.likes = Math.max(
          0,
          (existing.likes || 0) + incoming.likesDelta
        );
      }

      if (incoming.sharesDelta != null) {
        updated.shares = Math.max(
          0,
          (existing.shares || 0) + incoming.sharesDelta
        );
      }

      // Save back
      state.byId[id] = updated;

      // Ensure IDs list is complete
      if (!state.allIds.includes(id)) {
        state.allIds.push(id);
      }
    },

    updatePlaylistVideoIds(state, action) {
      const { playlistId, videoIds } = action.payload;

      if (state.byId[playlistId]) {
        state.byId[playlistId] = {
          ...state.byId[playlistId],
          videoIds,
        };
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
  updatePlaylistVideoIds,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
