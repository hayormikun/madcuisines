type ButtonProps = {
    name: string
}

type DelButtonProps = {
  name: string
}

type WideButtonProps = {
  name: string
}

export const Button = ({name}: ButtonProps) => {  
  return (
    <button type="button" className='text-sm capitalize font-semibold text-teal-500 rounded-full border-2 border-teal-500 py-2 px-3 tracking-wider hover:text-gray-100 hover:bg-teal-500'>{name}</button>
  )
}


export const DelButton = ({name}: DelButtonProps) => {
  return (
    <button type="button" className='text-sm capitalize font-semibold text-red-500 rounded-full border-2 border-red-500 py-2 px-3 tracking-wider hover:text-gray-100 hover:bg-red-500'>{name}</button>
  )
}


export const WideButton = ({name}: WideButtonProps) => {
  return (
    <button type="submit" className="block my-5 w-full text-md capitalize font-semibold shadow-sm text-teal-500 rounded border-2 border-teal-500 py-2 px-3 tracking-wider hover:text-gray-100 hover:bg-teal-500">{name}</button>
  )
}
