import { Route, Routes, useLocation } from "react-router-dom"
import DisplayHome from "./DisplayHome"
import DisplayAlbum from "./DisplayAlbum"
import { useEffect, useRef } from "react"
import { albumsData } from "../assets/assets"

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const bgColor = albumsData[Number(albumId)].bgColor;

  const getToken = async () => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            "dea6433532084d309e6ca31d96d1f2db" +
              ":" +
              "1ffd35edff7f48ffa82e5b9d6767fcee"
          )}`,
        },
        body: "grant_type=client_credentials",
      });
      const auth = await response.json();
      localStorage.setItem(
        "access_token",
        `${auth.token_type} ${auth.access_token}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  getToken();


  useEffect(()=>{
    if(isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    }
    else{
      displayRef.current.style.background = "#121212";
    }
  })
  return (
    <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
        <Routes>
            <Route path="/" element={<DisplayHome/>}/>
            <Route path="/album/:id" element={<DisplayAlbum/>}/>
        </Routes>
    </div>
  )
}

export default Display