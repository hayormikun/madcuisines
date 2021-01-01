type ButtonProps = {
    name: string
    color: 'teal' | 'red'
}

type WideButtonProps = {
  name: string
}

export const Button = ({name, color}: ButtonProps) => {
  let textcolor
  let bordercolor
  let bgcolor

  if (color === 'teal') {
   textcolor = 'text-teal-500'
   bordercolor = 'border-teal-500' 
   bgcolor = 'bg-teal-500'
  } 
  
  if (color === 'red') {
    textcolor = 'text-red-500'
    bordercolor = 'border-red-500'
    bgcolor = 'bg-red-500'
  }


  return (
    <button type="button" className={`text-sm capitalize font-semibold ${textcolor} rounded-full border-2 ${bordercolor} py-2 px-3 tracking-wider hover:text-gray-100 hover:${bgcolor}`}>{name}</button>
  )
}

export const WideButton = ({name}: WideButtonProps) => {
  return (
    <button type="submit" className="block my-5 w-full text-md capitalize font-semibold shadow-sm text-teal-500 rounded border-2 border-teal-500 py-2 px-3 tracking-wider hover:text-gray-100 hover:bg-teal-500">{name}</button>
  )
}
