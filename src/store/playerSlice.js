import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  isPlaying: false,
  volume: 0,
  currentIndex: 0,
  activePlaylistId: null,
  currentSeconds: 0,
  durationSeconds: 0,
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
      state.currentSeconds = 0;
    },

    prevTrack(state) {
      state.currentIndex -= 1;
      state.currentSeconds = 0;
    },

    setIndex(state, action) {
      state.currentIndex = action.payload;
    },

    playerSetActivePlaylist(state, action) {
      state.activePlaylistId = action.payload;
    },

    setCurrentSeconds(state, action) {
      state.currentSeconds = action.payload;
    },

    setDurationSeconds(state, action) {
      state.durationSeconds = action.payload;
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
  setCurrentSeconds,
  setDurationSeconds,
} = playerSlice.actions;

export default playerSlice.reducer;
