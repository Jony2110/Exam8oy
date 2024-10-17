import { createSlice } from '@reduxjs/toolkit';

const likedSongsSlice = createSlice({
  name: 'likedSongs',
  initialState: [],
  reducers: {
    addSong: (state, action) => {
      state.push(action.payload);
    },
    removeSong: (state, action) => {
      return state.filter(song => song.id !== action.payload.id);
    }
  }
});

export const { addSong, removeSong } = likedSongsSlice.actions;
export default likedSongsSlice.reducer;
