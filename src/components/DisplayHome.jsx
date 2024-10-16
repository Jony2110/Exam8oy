import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import { useEffect, useState } from "react";
import axios from 'axios';

const DisplayHome = () => {
  const [error, setError] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [visiblePlaylists, setVisiblePlaylists] = useState(6); // Initially show only 6 playlists
  
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      setError('Access token is missing. Please log in.');
      return;
    }

    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: accessToken,  
          },
        });
        setPlaylists(response.data.playlists.items);
      } catch (err) {
        setError('Failed to fetch playlists. Please check your access token.');
      }
    };

    fetchPlaylists();
  }, []);

  const showAllPlaylists = () => {
    setVisiblePlaylists(playlists.length);
  };

  return (
    <div className=" bg-gradient-to-b from-blue-900 via-indigo-900  to-black h-screen container mx-auto" >
      <Navbar />
      <div className=" bg-gradient-to-b from-blue-900 via-indigo-900  to-black h-[25rem] ">
        <div className="ml-[2.563rem]">
        <h1 className="my-5 font-bold text-2xl">Good afternoon</h1>
        {error && <p className="text-red-500">{error}</p>}
        
        {playlists.length === 0 ? (
          <p>Loading playlists...</p>
        ) : (
          <div className="container mx-auto flex flex-wrap gap-4">
            {playlists.slice(0, visiblePlaylists).map((playlist) => (
              <AlbumItem 
                key={playlist.id} 
                name={playlist.name} 
                desc={playlist.description} 
                id={playlist.id}
                image={playlist.images[0]?.url} 
              />
            ))}
          </div>
        )}
        {playlists.length > visiblePlaylists && (
          <button onClick={showAllPlaylists} className="mt-5 bg-blue-500 text-white px-4 py-2 rounded">
            Show More
          </button>
        )}
        </div>
        
      </div>
    </div>
  );
};

export default DisplayHome;
