import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const naviagte = useNavigate()
  return (
    <>
      <div className=" w-full flex bg-blue-900 justify-between items-center font-semibold">
        <div className="  ml-[2.563rem] flex items-center gap-2">
          <img
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src="./img/Left.svg"
            alt=""
          
            onClick={()=>naviagte(-1)}
          />
          <img
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src="./img/Right.svg"
            alt=""
            onClick={()=>naviagte(+1)}
          />
        </div>
        
      </div>
     
    </>
  );
};

export default Navbar;
