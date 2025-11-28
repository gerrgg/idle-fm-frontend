import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import authReducer from "./authSlice";
import dashboardReducer from "./dashboardSlice";
import playlistReducer from "./playlistSlice";
import tagsReducer from "./tagsSlice";
import youtubeReducer from "./youtubeSlice";

import playlistsEntitiesReducer from "./entities/playlistsSlice";
import videosEntitiesReducer from "./entities/videosSlice";
import tagsEntitiesReducer from "./entities/tagsSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    auth: authReducer,
    // dashboard: dashboardReducer,
    // playlists: playlistReducer,
    // tags: tagsReducer,
    youtube: youtubeReducer,
    playlistsEntities: playlistsEntitiesReducer,
    videosEntities: videosEntitiesReducer,
    tagsEntities: tagsEntitiesReducer,
  },
});
