import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[15%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#000000] h-[15%] rounded flex flex-col gap-4 justify-around">
        <div onClick={()=>navigate('/')} className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-7 h-7" src="./img/home.svg" alt="" />
          <p className="font-b old">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src="./img/serch.svg" alt="" />
          <p className="font-b old">Search</p>
        </div>
          <div className="flex items-center gap-3">
            <img className="w-8 ml-7" src="./img/3.svg" alt="stack_icon" />
            <p className="font-semibold">Your Libary</p>
          </div>
      </div>

      <div className="bg-[#000000] flex flex-col gap-5 h-[80%] rounded mt-4">
          <div className=" mt-4 flex items-center gap-3">
            <img className="w-8  rounded-md ml-7" src="./img/plus.svg" alt="stack_icon" />
            <p className="font-semibold">Create Playlist</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-8  ml-7" src="./img/Liked.svg" alt="stack_icon" />
            <p className="font-semibold">Liked songs</p>
          </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
