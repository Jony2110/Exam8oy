// likedSongsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const likedSongsSlice = createSlice({
  name: 'likedSongs',
  initialState: {
    songs: [],
  },
  reducers: {
    addSong: (state, action) => {
      const existingSong = state.songs.find(song => song.id === action.payload.id);
      if (!existingSong) {
        state.songs.push(action.payload);
      }
    },
    removeSong: (state, action) => {
      state.songs = state.songs.filter(song => song.id !== action.payload.id);
    },
  },
});

export const { addSong, removeSong } = likedSongsSlice.actions;
export default likedSongsSlice.reducer;
