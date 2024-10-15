import Navbar from "./Navbar"
import { albumsData } from "../assets/assets"
import AlbumItem from "./AlbumItem"
import { songsData } from "../assets/assets"
import SongItem from "./SongItem"
import { useEffect, useState } from "react"
import axios from 'axios';

const DisplayHome = () => {
  const [error, setError] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [visiblePlaylists, setVisiblePlaylists] = useState(6); // Initially show only 6 playlists
  
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); 

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
      console.log(playlists)
    };
    
    fetchPlaylists();
  }, []);
  return (
    <>
    <Navbar/>
    <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
        {albumsData.map((item,index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} id={item.id}
        image={item.image}/>))}
        </div>
    </div>
    <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today&apos;s biggest hits</h1>
        <div className="flex overflow-auto">
      {songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item.id}
        image={item.image}/>))}
        </div>
    </div>
    </>
  )
}

export default DisplayHome