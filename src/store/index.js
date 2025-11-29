import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import authReducer from "./authSlice";
import youtubeReducer from "./youtubeSlice";

import playlistsEntitiesReducer from "./entities/playlistsSlice";
import videosEntitiesReducer from "./entities/videosSlice";
import tagsEntitiesReducer from "./entities/tagsSlice";
import usersEntitiesReducer from "./entities/usersSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    auth: authReducer,
    youtube: youtubeReducer,
    playlistsEntities: playlistsEntitiesReducer,
    videosEntities: videosEntitiesReducer,
    tagsEntities: tagsEntitiesReducer,
    usersEntities: usersEntitiesReducer,
  },
});
