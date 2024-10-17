
import Display from "./components/Display"
import Player from "./components/Player"
import Sidebar from "./components/Sidebar"

import SideBarRight from "./components/SideBarRight"

const App = () => {
  const track = {
    title: "Play It Safe",
    artist: "Julia Wolf",
    src: "path_to_audio_file.mp3",
    image: "path_to_image.jpg", 
  };
  console.log(track)
  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar/>
        <Display/>
        <SideBarRight/>
      </div>
      <Player track={track}/>
      

     
    </div>
  )
}

export default App