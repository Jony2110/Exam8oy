import { createSlice } from '@reduxjs/toolkit';

// Получаем данные из localStorage, если они существуют, иначе возвращаем пустой массив
const initialState = {
  songs: JSON.parse(localStorage.getItem('likedSongs')) || []
};

const likedSongsSlice = createSlice({
  name: 'likedSongs',
  initialState,
  reducers: {
    addSong: (state, action) => {
      // Проверяем, есть ли уже песня в лайках
      const existingSong = state.songs.find(song => song.id === action.payload.id);
      if (!existingSong) {
        state.songs.push(action.payload);
        // Сохраняем обновленные лайки в localStorage
        localStorage.setItem('likedSongs', JSON.stringify(state.songs));
      }
    },
    removeSong: (state, action) => {
      // Удаляем песню из лайков
      state.songs = state.songs.filter(song => song.id !== action.payload.id);
      // Обновляем localStorage после удаления
      localStorage.setItem('likedSongs', JSON.stringify(state.songs));
    },
  },
});

// Экспортируем действия для использования в компонентах
export const { addSong, removeSong } = likedSongsSlice.actions;
export default likedSongsSlice.reducer;
