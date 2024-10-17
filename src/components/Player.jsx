import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaHeart, FaRandom } from "react-icons/fa"; // Для иконок

const Player = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null); 

  // Проверка перед рендером на наличие источника
  useEffect(() => {
    if (!track.src) {
      console.error("No audio source provided. Check the track.src property.");
    } else {
      console.log("Audio source: ", track.src); // Лог для проверки источника
    }
  }, [track.src]);

  // Проверка на наличие источника и переключение воспроизведения
  const togglePlay = () => {
    if (!audioRef.current.src) {
      console.error("No audio source provided.");
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Обновление текущего времени трека
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // После загрузки метаданных устанавливаем продолжительность трека
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
    if (!audioRef.current.duration) {
      console.error("Failed to load audio metadata");
    }
  };

  // Форматирование времени в минуты и секунды
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Обработка ошибки загрузки источника аудио
  const handleAudioError = () => {
    console.error("Error loading audio source. Please check the file format and URL.");
  };

  return (
    <div className="fixed bottom-0 w-full bg-black text-white p-4 flex items-center justify-between">
      {/* Левая часть плеера: обложка и название трека */}
      <div className="flex items-center">
        <div>
          <p>{track.title}</p>
          <p className="text-sm text-gray-400">{track.artist}</p>
        </div>
        <FaHeart className="text-green-500 ml-4" />
      </div>

      {/* Центральная часть плеера: элементы управления */}
      <div className="flex items-center gap-4">
        <FaRandom />
        {isPlaying ? (
          <FaPause onClick={togglePlay} className="cursor-pointer" size={30} />
        ) : (
          <FaPlay onClick={togglePlay} className="cursor-pointer" size={30} />
        )}

        {/* Полоса времени и текущий прогресс */}
        <div className="flex items-center gap-2">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => (audioRef.current.currentTime = e.target.value)}
            className="w-40"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Правая часть: громкость */}
      <div className="flex items-center gap-2">
        <FaVolumeUp />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={(e) => (audioRef.current.volume = e.target.value)}
          className="w-20"
        />
      </div>

      {/* Элемент аудио (скрытый) */}
      <audio
  ref={audioRef}
  src={track.src || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}  // Тестовый аудиофайл
  onTimeUpdate={handleTimeUpdate}
  onLoadedMetadata={handleLoadedMetadata}
  onError={handleAudioError} 
/>
    </div>
  );
};

export default Player;
