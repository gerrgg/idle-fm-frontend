import { setCurrentPlaylist } from "../playlistSlice";
import { startPlayback, resetIndex } from "../playerSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const playPlaylist = createAsyncThunk(
  "player/playPlaylist",
  async (playlistId, { dispatch }) => {
    // 1) select playlist
    await dispatch(setCurrentPlaylist(playlistId)).unwrap();

    // 2) reset playback position
    dispatch(resetIndex());

    // 3) start playing
    dispatch(setPlayState(true));
  }
);
