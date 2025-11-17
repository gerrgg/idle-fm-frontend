import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import authReducer from "./authSlice";
import dashboardReducer from "./dashboardSlice";
import playlistReducer from "./playlistSlice";
import tagsReducer from "./tagsSlice";
import youtubeReducer from "./youtubeSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    playlist: playlistReducer,
    tags: tagsReducer,
    youtube: youtubeReducer,
  },
});
