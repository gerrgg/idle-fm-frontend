// src/store/entities/usersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "usersEntities",
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    upsertUser(state, action) {
      const user = action.payload;
      state.byId[user.id] = user;

      if (!state.allIds.includes(user.id)) {
        state.allIds.push(user.id);
      }
    },

    upsertMany(state, action) {
      action.payload.forEach((user) => {
        state.byId[user.id] = user;
        if (!state.allIds.includes(user.id)) {
          state.allIds.push(user.id);
        }
      });
    },
  },
});

export const { upsertUser, upsertMany } = usersSlice.actions;
export default usersSlice.reducer;
