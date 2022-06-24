import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "./Button"



export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex h-[80px] w-full items-center">
      <div className="flex justify-between pt-3 mx-7 items-center">
        <Link href={'/'}>
            <a>
                <Image src={'/img/logo.png'} height="70px" width="70px" alt="logo" />
            </a>
        </Link>
        
        <ul className="hidden md:flex justify-evenly font-semibold text-gray-600" id="menu">
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

        <div className="md:hidden">

        </div>
      </div>
      <ul className="absolute w-full md:hidden">
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
            <a className="mx-5"><Button name="logout" color="teal"/></a>
      </ul>
    </nav>
  )
}