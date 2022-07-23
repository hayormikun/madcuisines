type SuccessProp = {
  item: string
}

export const Success = ({ item }: SuccessProp) => {
  return (
    <div className="bg-teal-400 text-center text-white font-light text-md p-5 w-full h-fit">
      ${item} was created succesfully{' '}
    </div>
  )
}
