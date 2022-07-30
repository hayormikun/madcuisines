import { ClipLoader } from "react-spinners"


export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-[rgba()] z-50">
      <ClipLoader color={'#94b8a3'} size={40} />
      <p className="mt-3 text-md font-bold text-[#94b8a3]">Loading...</p>
    </div>
  )
}
