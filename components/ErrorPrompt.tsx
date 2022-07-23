type ErrorProps = {
    item: string
    msg: string
}

export const ErrorPrompt = ({item, msg}: ErrorProps) => {
  return (
    <div className="bg-red-400 text-center text-white text-md font-light p-5 w-full h-fit">
        Error encountered while creating {item} : {msg}
    </div>
  )
}
