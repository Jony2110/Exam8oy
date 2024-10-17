import { createContext, useState, useEffect } from "react";

// Создаем контекст
export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  // Функция для воспроизведения трека по ID
  const playWithId = async (trackId) => {
    const token = localStorage.getItem("access_token"); // Получаем токен из localStorage
    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: "PUT",
        headers: {
          Authorization: token, // Добавляем токен в заголовки
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [`spotify:track:${trackId}`], // Указываем ID трека в запросе
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to play track");
      }

      setCurrentTrackId(trackId); // Сохраняем ID текущего трека
      setIsPlaying(true); // Устанавливаем флаг воспроизведения
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  // Функция для паузы
  const pauseTrack = async () => {
    const token = localStorage.getItem("access_token"); // Получаем токен из localStorage
    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/pause`, {
        method: "PUT",
        headers: {
          Authorization: token, // Добавляем токен в заголовки
        },
      });

      if (!response.ok) {
        throw new Error("Failed to pause track");
      }

      setIsPlaying(false); // Устанавливаем флаг паузы
    } catch (error) {
      console.error("Error pausing track:", error);
    }
  };

  // Проверяем текущее состояние воспроизведения
  const checkPlaybackState = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch playback state");
      }

      const data = await response.json();
      setCurrentTrackId(data.item?.id || null);
      setIsPlaying(data.is_playing);
    } catch (error) {
      console.error("Error fetching playback state:", error);
    }
  };

  // Используем useEffect для проверки состояния плеера при загрузке
  useEffect(() => {
    checkPlaybackState();
  }, []);

  return (
    <PlayerContext.Provider value={{ playWithId, pauseTrack, currentTrackId, isPlaying }}>
      {children}
    </PlayerContext.Provider>
  );
};
