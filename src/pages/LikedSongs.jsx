import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSong } from '../redux/likedSongsSlice';

const LikedSongs = () => {
  const likedSongs = useSelector((state) => state.likedSongs.songs || []);
  const dispatch = useDispatch();

  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [audio, setAudio] = useState(null); // Хранение текущего аудио-элемента
  const [isPlaying, setIsPlaying] = useState(false); // Статус воспроизведения

  const handleRemoveSong = (song) => {
    dispatch(removeSong(song));
  };

  const handlePlayPause = (song) => {
    if (currentTrackId === song.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      if (audio) {
        audio.pause(); // Остановить предыдущий трек
      }
      const newAudio = new Audio(song.preview_url); // Используем preview_url для воспроизведения
      setAudio(newAudio);
      newAudio.play();
      setCurrentTrackId(song.id);
      setIsPlaying(true);
    }
  };

  if (likedSongs.length === 0) {
    return <div className="bg-gradient-to-b from-blue-900 via-indigo-900 to-black h-full p-6 text-white text-center">No liked songs yet!</div>;
  }

  return (
    <div className="bg-gradient-to-b from-blue-900 via-indigo-900 to-black h-screen p-6">
      <h2 className="text-4xl font-bold text-white mb-6">Liked Songs</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] mb-4">
        <p>#</p>
        <p>Title</p>
        <p>Album</p>
        <p>Date Added</p>
      </div>
      {likedSongs.map((song, index) => (
        <div
          key={song.id}
          className={`grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center cursor-pointer ${
            song.id === currentTrackId ? 'bg-[#ffffff2b] text-green-500' : 'text-white'
          } mb-4`}
        >
          <div className="flex items-center">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img className="inline w-10 mb-5 mr-5" src={song.album.images[0]?.url} alt={song.name} />
            <div className="inline-block">
              <div className={song.id === currentTrackId ? 'text-green-500' : ''}>
                {song.name}
              </div>
              <div className="text-[#a7a7a7]">{song.artists.map(artist => artist.name).join(", ")}</div>
            </div>
          </div>
          <p className="text-[15px]">{song.album.name}</p>
          <p className="text-[15px]">5 days ago</p>
          <div className="flex gap-4 ml-16">
            <button 
              onClick={() => handleRemoveSong(song)} 
              className="text-red-500 text-center">
              ❤️
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handlePlayPause(song); }} 
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                song.id === currentTrackId && isPlaying ? 'bg-red-500' : 'bg-green-500'
              } text-white`}
            >
              {song.id === currentTrackId && isPlaying ? (
                <span>⏸️</span>
              ) : (
                <span>▶️</span>
              )}
            </button>
            <p className="text-[15px] text-center">{(song.duration_ms / 60000).toFixed(2)} min</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikedSongs;
