
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

const LikedSongsPage = () => {
  const likedSongs = useSelector((state) => state.likedSongs);

  return (
    <div className="bg-gradient-to-b from-blue-900 via-indigo-900 to-black h-[21rem]">
      <Navbar />
      <h2 className="text-5xl font-bold mt-10">Liked Songs</h2>
      {likedSongs.length === 0 ? (
        <p className="mt-5 text-white">You have no liked songs yet.</p>
      ) : (
        <div className="mt-5">
          {likedSongs.map((song, index) => (
            <div key={song.id} className="p-2 text-white">
              <b>{index + 1}</b> - {song.name} by {song.artists.map(artist => artist.name).join(", ")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedSongsPage;
