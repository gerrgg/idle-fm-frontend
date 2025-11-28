import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
  name: "tagsEntities",
  initialState: {
    byId: {}, // { [tagId]: { id, name } }
    allIds: [], // [tagId, tagId, ...]
  },
  reducers: {
    upsertTag(state, action) {
      const tag = action.payload;
      state.byId[tag.id] = tag;

      if (!state.allIds.includes(tag.id)) {
        state.allIds.push(tag.id);
      }
    },
    upsertMany(state, action) {
      const tags = action.payload;

      tags.forEach((tag) => {
        state.byId[tag.id] = tag;

        if (!state.allIds.includes(tag.id)) {
          state.allIds.push(tag.id);
        }
      });
    },
  },
});

export const { upsertTag, upsertMany } = tagsSlice.actions;
export default tagsSlice.reducer;
