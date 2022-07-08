import { LogoutIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'

export interface ButtonProps {
  name: string
}

export const LogOutButton = ({ name }: ButtonProps) => {
  return (
    <button
      type="button"
      className="flex text-sm capitalize font-semibold text-teal-500 rounded-full border-2 border-teal-500 py-2 px-3 tracking-wider hover:text-gray-100 hover:bg-teal-500"
    >
      {name} <LogoutIcon className="ml-2 w-5" />
    </button>
  )
}

export const EditButton = ({ name }: ButtonProps) => {
  return (
    <button
      type="button"
      className="flex text-sm capitalize font-semibold rounded py-2 px-3 tracking-wider  text-gray-100 bg-teal-500"
    >
      {name} <PencilAltIcon className="ml-2 w-5" />
    </button>
  )
}

export const DelButton = ({ name }: ButtonProps) => {
  return (
    <button
      type="button"
      className="flex text-sm capitalize font-semibold rounded  py-2 px-3 tracking-wider  text-gray-100 bg-red-500"
    >
      {name} <TrashIcon className="ml-2 w-5" />
    </button>
  )
}

export const WideButton = ({ name }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="block my-5 w-full text-md capitalize font-semibold shadow-sm text-teal-500 rounded border-2 border-teal-500 py-2 px-3 tracking-wider hover:text-gray-100 hover:bg-teal-500"
    >
      {name}
    </button>
  )
}
