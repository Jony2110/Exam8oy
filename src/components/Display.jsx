import { Route, Routes} from "react-router-dom"
import DisplayHome from "./DisplayHome"
import DisplayAlbum from "./DisplayAlbum"
import {useRef} from "react"


const Display = () => {
  const displayRef = useRef();
 
  

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


  
  return (
    <div ref={displayRef} className="w-[100%]   rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
        <Routes>
            <Route path="/" element={<DisplayHome/>}/>
            <Route path="/album/:id" element={<DisplayAlbum/>}/>
        </Routes>
    </div>
  )
}

export default Display