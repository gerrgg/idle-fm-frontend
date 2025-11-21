import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  isPlaying: false,
  volume: 0.25,
  currentIndex: 0,
  activePlaylistId: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },

    setPlayState(state, action) {
      state.isPlaying = action.payload;
    },

    setVolume(state, action) {
      state.volume = action.payload;
    },

    startPlayback(state) {
      state.isPlaying = true;
    },

    pausePlayback(state) {
      state.isPlaying = false;
    },

    resetIndex(state) {
      state.currentIndex = 0;
    },

    nextTrack(state) {
      state.currentIndex += 1;
    },

    prevTrack(state) {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },

    setIndex(state, action) {
      state.currentIndex = action.payload;
    },
    playerSetActivePlaylist(state, action) {
      state.activePlaylistId = action.payload;
    },
  },
});

export const {
  togglePlay,
  setPlayState,
  setVolume,
  resetIndex,
  nextTrack,
  prevTrack,
  setIndex,
  startPlayback,
  playerSetActivePlaylist,
} = playerSlice.actions;

export default playerSlice.reducer;
