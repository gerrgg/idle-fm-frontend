import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videosEntities",
  initialState: {
    byId: {}, // { [videoId]: videoObject }
    allIds: [], // [videoId...]
  },
  reducers: {
    upsertVideo(state, action) {
      const v = action.payload;

      state.byId[v.id] = v;

      if (!state.allIds.includes(v.id)) {
        state.allIds.push(v.id);
      }
    },
    upsertMany(state, action) {
      const videos = action.payload;

      videos.forEach((v) => {
        state.byId[v.id] = v;

        if (!state.allIds.includes(v.id)) {
          state.allIds.push(v.id);
        }
      });
    },
  },
});

export const { upsertVideo, upsertMany } = videosSlice.actions;

export default videosSlice.reducer;
