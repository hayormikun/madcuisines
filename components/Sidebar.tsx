import { HomeIcon, PencilAltIcon, ShoppingCartIcon } from "@heroicons/react/outline"
import Link from "next/link"


export interface SidebarProps {
  view: string
  create: string
  createLink: string
  viewLink: string 
}

export const Sidebar = ({view, create, viewLink, createLink}: SidebarProps) => {
  return (
    <aside className="h-auto lg:min-h-[90vh] bg-teal-700 shadow-md w-full lg:w-2/12">
        <ul className="flex justify-center mt-10 pt-5 lg:block lg:text-center  lg:p-5">
          <Link href="/">
          <a className="hidden md:flex mb-5 text-gray-100 font-bold text-md p-4 lg:border-b-2 border-gray-200"><HomeIcon className="mr-2 w-5"/> Dashboard</a>
          </Link>
          <Link href={viewLink}>
          <a className="flex mb-5 text-gray-100 font-bold text-md p-4 lg:border-b-2 border-gray-200"><ShoppingCartIcon className="mr-2 w-5"/> All {view}</a>
          </Link>
          <Link href={createLink}>
          <a className="flex mb-5 text-gray-100 font-bold text-md p-4 lg:border-b-2 border-gray-200"><PencilAltIcon className="mr-2 w-5"/> Create {create}</a>
          </Link>
        </ul>
     
    </aside>
  )
}
