import { setCurrentPlaylist } from "../playlistSlice";
import {
  resetIndex,
  playerSetActivePlaylist,
  setPlayState,
} from "../playerSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const playPlaylist = createAsyncThunk(
  "player/playPlaylist",
  async (playlistId, { dispatch }) => {
    await dispatch(setCurrentPlaylist(playlistId)).unwrap();

    dispatch(playerSetActivePlaylist(playlistId));

    dispatch(resetIndex());

    dispatch(setPlayState(true));
  }
);
