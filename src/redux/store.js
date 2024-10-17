// store.js
import { configureStore } from '@reduxjs/toolkit';
import likedSongsReducer from './likedSongsSlice'; // путь к вашему срезу

const store = configureStore({
  reducer: {
    likedSongs: likedSongsReducer,
  },
});

export default store;
