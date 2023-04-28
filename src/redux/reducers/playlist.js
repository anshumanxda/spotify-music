import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPlaylist: {
    playlist: "For You",
    playlistid: 1,
  },
};

const playlistSlice = createSlice({
  name: "playlistSlice",
  initialState,
  reducers: {
    setCurrentPlaylist(state, { payload }) {
      state.currentPlaylist = payload;
    },
  },
});

export const { setCurrentPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
