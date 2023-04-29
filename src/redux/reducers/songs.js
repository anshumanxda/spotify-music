import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: {
    _id: "",
    artist: "",
    duration: "",
    photo: "https://i.scdn.co/image/ab67616d0000b273f864bcdcc245f06831d17ae0",
    title: "",
    url: "",
  },
  allSongs: [],
  search: "",
};

const songsSlice = createSlice({
  name: "songsSlice",
  initialState,
  reducers: {
    setCurrentSong(state, { payload }) {
      state.currentSong = payload;
    },
    setAllSong(state, { payload }) {
      state.allSongs = payload?.getSongs;
    },
    setPreviousSong(state) {
      const currentSongIndex = allSongs.findIndex(state.currentSong._id);
      if (currentSongIndex !== 0) {
        state.currentSong = allSongs[currentSongIndex - 1];
      }
    },
    setSongSearch(state, { payload }) {
      state.search = payload;
    },
  },
});

export const { setCurrentSong, setPreviousSong, setAllSong, setSongSearch } =
  songsSlice.actions;
export default songsSlice.reducer;
