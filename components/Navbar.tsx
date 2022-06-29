import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button, WideButton } from "./Button"
import { MenuIcon, XIcon } from '@heroicons/react/outline'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleHamburger = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = ()=>{
    setIsOpen(!isOpen)
  }
  
  return (
    <nav className="w-screen h-[80px] z-20 fixed drop-shadow-sm">
      <div className="flex justify-between pt-3 mx-7 items-center">
        <Link href={'/'}>
            <a>
                <Image src={'/img/logo.png'} height="70px" width="70px" alt="logo" />
            </a>
        </Link>
        
        <ul className="hidden md:flex justify-evenly font-semibold text-teal-500" id="menu">
            <Link href={"/products"}>
              <a className="mx-5 py-2 hover:text-gray-800">Products</a>
            </Link>
            <Link href={"/extras"}>
              <a className="mx-5 py-2 hover:text-gray-800">Extras</a>
            </Link>     
            <Link href={"/orders"}>
              <a className="mx-5 py-2 hover:text-gray-800">Orders</a>
            </Link>       
            <Link href={"/category"}>
              <a className="mx-5 py-2 hover:text-gray-800">Category</a>
            </Link>
            <a className="mx-5"><Button name="log out" color="teal"/></a>
        </ul>

        <div className="relative md:hidden py-2 px-3 bg-gray-300 hover:cursor-pointer" onClick={handleHamburger}>
          {!isOpen ? <MenuIcon className="w-5" /> : <XIcon className="w-5"/>} 
        </div>
      </div>
      <ul className={!isOpen ? "hidden" : "absolute flex flex-col mt-3 py-3 font-semibold bg-gray-300 text-teal-500 w-full px-8 md:hidden"}>
      <Link href={"/products"}>
              <a onClick={handleClose} className="py-3 border-b-2 border-teal-500  hover:text-teal-700 hover:border-teal-700">Products</a>
            </Link>
            <Link href={"/extras"}>
              <a onClick={handleClose} className="py-3 border-b-2 border-teal-500 hover:text-teal-700 hover:border-teal-700">Extras</a>
            </Link>     
            <Link href={"/orders"}>
              <a onClick={handleClose} className="py-3 border-b-2 border-teal-500 hover:text-teal-700 hover:border-teal-700">Orders</a>
            </Link>       
            <Link onClick={handleClose} href={"/category"}>
              <a onClick={handleClose} className="py-3 border-b-2 border-teal-500 hover:text-teal-700 hover:border-teal-700">Category</a>
            </Link>

            <a onClick={handleClose} className="py-3"><WideButton name="logout" /></a>
      </ul>
    </nav>
  )
}