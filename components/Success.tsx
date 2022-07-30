import { CheckCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'


type SuccessProp = {
  item: string
}

export const Success = ({ item }: SuccessProp) => {
  const [isopen, setIsopen] = useState(true)
  

  return (
    <div
      onClick={() => {
        setIsopen(false)
      }}
      className={
        isopen
          ? 'bg-green-500 text-center text-white font-light text-md p-5 w-full h-fit flex items-center hover:cursor-pointer'
          : 'hidden'
      }
    >
      <CheckCircleIcon className="w-5 mr-2" />

      <p>{item} was created succesfully </p>
    </div>
  )
}
