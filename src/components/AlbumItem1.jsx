import { useNavigate } from "react-router-dom"


const AlbumItem1 = ({image,name,id , desc}) => {

  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/album/${id}`)} className="w-[14rem] mt-7 items-center   flex flex-col gap-4 rounded-md   cursor-pointer bg-[#ffffff26]">
        <img className="rounded mt-4 w-[11.375rem] h-[11.375rem]" src={image} alt="image" />
        <p className="font-bold mt-2 max-w-[11.375] mb-1">{name}</p>
        <p className="text-gray-300 text-center mt-2 max-w-[11.375] mb-1">{desc}</p>
    </div>
  )
}

export default AlbumItem1