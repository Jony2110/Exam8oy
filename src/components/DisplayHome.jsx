import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import AlbumItem1 from "./AlbumItem1";
import { useEffect, useState } from "react";
import axios from 'axios';

const DisplayHome = () => {
  const [error, setError] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [toplistPlaylists, setToplistPlaylists] = useState([]);
  const [categoryPlaylists, setCategoryPlaylists] = useState([]);
  const [newCategoryPlaylists, setNewCategoryPlaylists] = useState([]);
  const [additionalCategoryPlaylists, setAdditionalCategoryPlaylists] = useState([]);
  const [moreCategoryPlaylists, setMoreCategoryPlaylists] = useState([]); // New state for additional category playlists
  const [visiblePlaylists, setVisiblePlaylists] = useState(6);
  const [visibleToplistPlaylists, setVisibleToplistPlaylists] = useState(4);
  const [visibleCategoryPlaylists, setVisibleCategoryPlaylists] = useState(4);
  const [visibleNewCategoryPlaylists, setVisibleNewCategoryPlaylists] = useState(4);
  const [visibleAdditionalCategoryPlaylists, setVisibleAdditionalCategoryPlaylists] = useState(4);
  const [visibleMoreCategoryPlaylists, setVisibleMoreCategoryPlaylists] = useState(4); // Visible number for more category

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      setError('Access token is missing. Please log in.');
      return;
    }

    const fetchPlaylists = async () => {
      try {
        // Fetch featured playlists
        const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: accessToken,
          },
        });
        setPlaylists(response.data.playlists.items);

        // Fetch toplist playlists
        const toplistResponse = await axios.get('https://api.spotify.com/v1/browse/categories/toplists/playlists', {
          headers: {
            Authorization: accessToken,
          },
        });
        setToplistPlaylists(toplistResponse.data.playlists.items);

        // Fetch category-specific playlists
        const categoryResponse = await axios.get('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists', {
          headers: {
            Authorization: accessToken,
          },
        });
        setCategoryPlaylists(categoryResponse.data.playlists.items);

        // Fetch playlists from the new category
        const newCategoryResponse = await axios.get('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists', {
          headers: {
            Authorization: accessToken,
          },
        });
        setNewCategoryPlaylists(newCategoryResponse.data.playlists.items);

        // Fetch playlists from the additional API category
        const additionalCategoryResponse = await axios.get('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists', {
          headers: {
            Authorization: accessToken,
          },
        });
        setAdditionalCategoryPlaylists(additionalCategoryResponse.data.playlists.items);

        // Fetch playlists from the new API category
        const moreCategoryResponse = await axios.get('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists', {
          headers: {
            Authorization: accessToken,
          },
        });
        setMoreCategoryPlaylists(moreCategoryResponse.data.playlists.items);
      } catch (err) {
        setError('Failed to fetch playlists. Please check your access token.');
      }
    };

    fetchPlaylists();
  }, []);

  const showAllPlaylists = () => {
    setVisiblePlaylists(playlists.length);
  };

  const showAllToplistPlaylists = () => {
    setVisibleToplistPlaylists(toplistPlaylists.length);
  };

  const showAllCategoryPlaylists = () => {
    setVisibleCategoryPlaylists(categoryPlaylists.length);
  };

  const showAllNewCategoryPlaylists = () => {
    setVisibleNewCategoryPlaylists(newCategoryPlaylists.length);
  };

  const showAllAdditionalCategoryPlaylists = () => {
    setVisibleAdditionalCategoryPlaylists(additionalCategoryPlaylists.length);
  };

  const showAllMoreCategoryPlaylists = () => {
    setVisibleMoreCategoryPlaylists(moreCategoryPlaylists.length); // Show all more category playlists
  };

  return (
    <div className="">
      <Navbar />
      <div className="bg-gradient-to-b from-blue-900 via-indigo-900 to-[#121212] h-[25rem] ">
        <div className="ml-[2.563rem] container mx-auto w-[61.813rem]">
          <div className="flex justify-between items-center">
            <h1 className="my-5 font-bold text-2xl">Good afternoon</h1>
            {error && <p className="text-red-500">{error}</p>}
            {playlists.length > visiblePlaylists && (
              <button onClick={showAllPlaylists} className="mt-5 mr-5 bg-blue-500 text-white px-4 py-2 rounded">
                SEE ALL
              </button>
            )}
          </div>
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
        </div>
      </div>

      {/* Toplist Playlists Section */}
      <div className="ml-[2.563rem] container mx-auto w-[61.813rem] mt-5">
        <div className="flex items-center justify-between mr-6">
          <h2 className="font-bold text-2xl">Your top mixes</h2>
          {toplistPlaylists.length > visibleToplistPlaylists && (
            <button onClick={showAllToplistPlaylists} className="mt-8 text-white px-4 py-2 rounded">
              SEE ALL
            </button>
          )}
        </div>

        {toplistPlaylists.length === 0 ? (
          <p>Loading toplist playlists...</p>
        ) : (
          <div>
            <div className="container mx-auto flex flex-wrap gap-4">
              {toplistPlaylists.slice(0, visibleToplistPlaylists).map((playlist) => (
                <AlbumItem1 
                  key={playlist.id} 
                  name={playlist.name} 
                  desc={playlist.description} 
                  id={playlist.id}
                  image={playlist.images[0]?.url} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category-specific Playlists Section */}
      <div className="ml-[2.563rem] container mx-auto w-[61.813rem] mt-5">
        <div className="flex items-center justify-between mr-6">
          <h2 className="font-bold text-2xl">Made for you</h2>
          {categoryPlaylists.length > visibleCategoryPlaylists && (
            <button onClick={showAllCategoryPlaylists} className="mt-5 text-white px-4 py-2 rounded">
              SEE ALL
            </button>
          )}
        </div>

        {categoryPlaylists.length === 0 ? (
          <p>Loading category playlists...</p>
        ) : (
          <div>
            <div className="container mx-auto flex flex-wrap gap-4">
              {categoryPlaylists.slice(0, visibleCategoryPlaylists).map((playlist) => (
                <AlbumItem1 
                  key={playlist.id} 
                  name={playlist.name} 
                  desc={playlist.description} 
                  id={playlist.id}
                  image={playlist.images[0]?.url} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* New Category-specific Playlists Section */}
      <div className="ml-[2.563rem] container mx-auto w-[61.813rem] mt-5">
        <div className="flex items-center justify-between mr-6">
          <h2 className="font-bold text-2xl">Recently played</h2>
          {newCategoryPlaylists.length > visibleNewCategoryPlaylists && (
            <button onClick={showAllNewCategoryPlaylists} className="mt-5 text-white px-4 py-2 rounded">
              SEE ALL
            </button>
          )}
        </div>

        {newCategoryPlaylists.length === 0 ? (
          <p>Loading new category playlists...</p>
        ) : (
          <div>
            <div className="container mx-auto flex flex-wrap gap-4">
              {newCategoryPlaylists.slice(0, visibleNewCategoryPlaylists).map((playlist) => (
                <AlbumItem1 
                  key={playlist.id} 
                  name={playlist.name} 
                  desc={playlist.description} 
                  id={playlist.id}
                  image={playlist.images[0]?.url} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Category-specific Playlists Section */}
      <div className="ml-[2.563rem] container mx-auto w-[61.813rem] mt-5">
        <div className="flex items-center justify-between mr-6">
          <h2 className="font-bold text-2xl">Jump back in</h2>
          {additionalCategoryPlaylists.length > visibleAdditionalCategoryPlaylists && (
            <button onClick={showAllAdditionalCategoryPlaylists} className="mt-5 text-white px-4 py-2 rounded">
              SEE ALL
            </button>
          )}
        </div>

        {additionalCategoryPlaylists.length === 0 ? (
          <p>Loading additional category playlists...</p>
        ) : (
          <div>
            <div className="container mx-auto flex flex-wrap gap-4">
              {additionalCategoryPlaylists.slice(0, visibleAdditionalCategoryPlaylists).map((playlist) => (
                <AlbumItem1 
                  key={playlist.id} 
                  name={playlist.name} 
                  desc={playlist.description} 
                  id={playlist.id}
                  image={playlist.images[0]?.url} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* More Category-specific Playlists Section */}
      <div className="ml-[2.563rem] container mx-auto w-[61.813rem] mt-5">
        <div className="flex items-center justify-between mr-6">
          <h2 className="font-bold text-2xl">Uniquely yours</h2>
          {moreCategoryPlaylists.length > visibleMoreCategoryPlaylists && (
            <button onClick={showAllMoreCategoryPlaylists} className="mt-5 text-white px-4 py-2 rounded">
              SEE ALL
            </button>
          )}
        </div>

        {moreCategoryPlaylists.length === 0 ? (
          <p>Loading more category playlists...</p>
        ) : (
          <div>
            <div className="container mx-auto flex flex-wrap gap-4">
              {moreCategoryPlaylists.slice(0, visibleMoreCategoryPlaylists).map((playlist) => (
                <AlbumItem1 
                  key={playlist.id} 
                  name={playlist.name} 
                  desc={playlist.description} 
                  id={playlist.id}
                  image={playlist.images[0]?.url} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayHome;
