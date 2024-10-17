import { Link } from "react-router-dom";


const SideBarRight = () => {

  
  return (
    <div className="w-[15%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#000000] h-[15%] rounded flex  gap-4 items-center justify-around">
      <p>Friend Activity</p>
      <div className="flex items-center">
        <img src="./img/userProfile.svg" alt="User" />
        <img src="./img/Back.svg" alt="Back" />
      </div>
      </div>
      <div className="">
        <p>Let friends and followers on Spotify see what you’re listening to.</p>
      </div>
      <div className="flex flex-col gap-3">
        <img className="w-[9rem]" src="./img/Ghost.svg" alt="" />
        <img className="w-[9rem]" src="./img/Ghost.svg" alt="" />
        <img className="w-[9rem]"  src="./img/Ghost.svg" alt="" />
      </div>
      <div>
        <p className="">Go to Settings > Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time.</p>
      </div>
      <div>
        <a href="https://developer.spotify.com/dashboard"><button  className="bg-white text-black w-[12.688rem] h-[3rem] rounded-2xl text-center">SETING</button></a>
        
      </div>
        
      <div className="bg-[#000000] h-[80%] rounded mt-4">
        
      </div>
    </div>
  );
};

export default SideBarRight;
