import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useDispatch, useSelector } from 'react-redux';  
import { addSong, removeSong } from '../redux/likedSongsSlice';  

const DisplayAlbum = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTrackId, setCurrentTrackId] = useState(null); 
  const [audio, setAudio] = useState(null);  // Хранение текущего элемента аудио
  const [isPlaying, setIsPlaying] = useState(false);  // Статус воспроизведения
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.likedSongs.songs);  

  useEffect(() => {
    const fetchAlbumData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found");
        setLoading(false);
        return; 
      }

      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: token, 
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch album data");
        }

        const data = await response.json();
        setAlbumData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLike = (track, e) => {
    e.stopPropagation(); // Остановка всплытия события

    const existingSong = likedSongs.find(song => song.id === track.id);
    if (existingSong) {
      dispatch(removeSong(track)); // Удаление из избранного
    } else {
      dispatch(addSong(track)); // Добавление в избранное
    }
  };

  const handleTrackClick = (track) => {
    if (audio) {
      audio.pause();  // Остановить предыдущий трек
    }

    if (currentTrackId === track.id && isPlaying) {
      setIsPlaying(false);
      setCurrentTrackId(null);
    } else {
      const newAudio = new Audio(track.preview_url);  // Использовать preview_url для воспроизведения
      setAudio(newAudio);
      newAudio.play();
      setCurrentTrackId(track.id);  
      setIsPlaying(true);
    }
  };

  const handlePlayPause = (track) => {
    if (currentTrackId === track.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      // Если выбран другой трек, остановить текущий и начать новый
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(track.preview_url);
      setAudio(newAudio);
      newAudio.play();
      setCurrentTrackId(track.id);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 via-indigo-900 to-black h-[21rem]">
      <Navbar />
      <div className="mt-10 ml-6 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.images[0]?.url} alt={albumData.name} />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4>{albumData.description}</h4>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto ml-40 w-4" src="../../public/img/clock.svg" alt="Clock Icon" />
      </div>
      <hr />
      {albumData.tracks.items.map((item, index) => (
        <div
          key={item.track.id}
          onClick={() => handleTrackClick(item.track)}
          className={`grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center cursor-pointer ${
            item.track.id === currentTrackId ? 'bg-[#ffffff2b] text-green-500' : ''
          }`}
        >
          <div className="text-white text-sm md:text-[15px]">
            {item.track.id === currentTrackId && isPlaying ? (
              <img className="inline w-6 mb-5 mr-5" src="../../public/img/icon2110.webp" alt="Playing Icon" />
            ) : (
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            )}
            <img className="inline w-10 mb-5 mr-5" src={item.track.album.images[0]?.url} alt={item.track.name} />
            <div className="inline-block">
              <div className={item.track.id === currentTrackId ? 'text-green-500' : ''}>
                {item.track.name.slice(0, 20)}
              </div>
              <div className="text-[#a7a7a7]">{item.track.artists.map(artist => artist.name).join(", ").slice(0, 20)}</div>
            </div>
          </div>
          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <div className="flex gap-4 ml-16">
            <button 
              onClick={(e) => handleLike(item.track, e)} 
              className="text-center">
              {likedSongs.some(song => song.id === item.track.id) ? '❤️' : '🤍'} {/* Поменяли иконку на лайк или пустое сердечко */}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handlePlayPause(item.track); }} 
              className="text-green-500 text-center">
              {item.track.id === currentTrackId && isPlaying ? "⏸️" : "▶️"} {/* Кнопка play/pause */}
            </button>
            <p className="text-[15px] text-center">{(item.track.duration_ms / 60000).toFixed(2)} min</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAlbum;
