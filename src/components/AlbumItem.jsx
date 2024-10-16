import { useNavigate } from "react-router-dom"


const AlbumItem = ({image,name,id}) => {

  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/album/${id}`)} className="w-[29.938rem] items-center  flex gap-4 rounded-md  h-[5.125rem] cursor-pointer bg-[#ffffff26]">
        <img className="rounded w-[5.125rem]" src={image} alt="image" />
        <p className="font-bold mt-2 mb-1">{name}</p>
        
    </div>
  )
}

export default AlbumItem