import { XCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'


type ErrorProps = {
  item: string
  msg: string
}

export const ErrorPrompt = ({ item, msg }: ErrorProps) => {
  const [isopen, setIsopen] = useState(true)

  return (
    <div
      onClick={() => {
        setIsopen(false)
      }}
      className={
        isopen
          ? 'bg-red-500 text-center text-white text-md font-light p-5 w-full h-fit flex items-center hover:cursor-pointer hover:bg-red-700'
          : 'hidden'
      }
    >
      <XCircleIcon className="w-5 mr-2" />
      <p>
        Error encountered while creating {item} : {msg}
      </p>
    </div>
  )
}
