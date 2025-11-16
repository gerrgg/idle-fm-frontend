import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  volume: 0.5,
  currentTrack: null,
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
  },
});

export const { togglePlay, setPlayState, setVolume } = playerSlice.actions;
export default playerSlice.reducer;
