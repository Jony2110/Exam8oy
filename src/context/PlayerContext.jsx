import { createContext, useState, useEffect, useRef } from "react";

// Создаем контекст
export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Ссылка на аудио элемент

  // Функция для воспроизведения трека по ID
  const playWithId = (trackId) => {
    setCurrentTrackId(trackId); // Сохраняем ID текущего трека
    if (audioRef.current) {
      audioRef.current.play(); // Запускаем воспроизведение
    }
    setIsPlaying(true); // Устанавливаем флаг воспроизведения
  };

  // Функция для паузы
  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Ставим на паузу
    }
    setIsPlaying(false); // Устанавливаем флаг паузы
  };

  // Проверяем текущее состояние воспроизведения (например, можно сделать проверку в будущем)
  const checkPlaybackState = () => {
    if (audioRef.current) {
      setIsPlaying(!audioRef.current.paused); // Проверяем, играет ли аудио
    }
  };

  // Используем useEffect для проверки состояния плеера при загрузке
  useEffect(() => {
    checkPlaybackState();
  }, []);

  return (
    <PlayerContext.Provider value={{ playWithId, pauseTrack, currentTrackId, isPlaying }}>
      {children}
      {/* Аудио элемент для воспроизведения музыки */}
      <audio ref={audioRef} src={`path/to/your/music/file.mp3`} />
    </PlayerContext.Provider>
  );
};
