import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LogOutButton, WideButton } from './Button'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

export const Navbar = () => {
  const { status, data } = useSession()
  
  const router = useRouter()
  useEffect(()=>{
    if (status === 'unauthenticated')
    router.replace('/auth/login')
  }, [status])


  const [isOpen, setIsOpen] = useState(false)
  const handleHamburger = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  if (status === "authenticated") {
  return (
    <nav className="w-screen bg-gray-100 h-[100px] z-20 fixed">
      <div className="flex justify-between py-5 mx-7 items-center">
        <Link href={'/'}>
          <a onClick={handleClose}>
            <Image
              src={'/img/logo.png'}
              height={50}
              width={50}
              alt="logo"
            />
          </a>
        </Link>

        <ul
          className="hidden md:flex justify-evenly font-semibold text-gray-600"
          id="menu"
        >
          <Link href={'/products'}>
            <a className="mx-5 py-2 hover:text-teal-500">Products</a>
          </Link>
          <Link href={'/extras'}>
            <a className="mx-5 py-2 hover:text-teal-500">Extras</a>
          </Link>
          <Link href={'/orders'}>
            <a className="mx-5 py-2 hover:text-teal-500">Orders</a>
          </Link>
          <Link href={'/category'}>
            <a className="mx-5 py-2 hover:text-teal-500">Category</a>
          </Link>
          <a onClick={()=>{
            signOut()
          }} className="mx-5">
            <LogOutButton name="log out" />
          </a>
        </ul>

        <div
          className="relative md:hidden py-2 px-3 bg-gray-300 hover:cursor-pointer"
          onClick={handleHamburger}
        >
          {!isOpen ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
        </div>
      </div>
      <ul
        className={
          !isOpen
            ? 'hidden'
            : 'absolute top-24 flex flex-col py-3 font-semibold bg-gray-300 text-teal-500 w-full px-8 md:hidden'
        }
      >
        <Link href={'/products'}>
          <a
            onClick={handleClose}
            className="py-3 border-b-2 border-teal-500  hover:text-teal-700 hover:border-teal-700"
          >
            Products
          </a>
        </Link>
        <Link href={'/extras'}>
          <a
            onClick={handleClose}
            className="py-3 border-b-2 border-teal-500 hover:text-teal-700 hover:border-teal-700"
          >
            Extras
          </a>
        </Link>
        <Link href={'/orders'}>
          <a
            onClick={handleClose}
            className="py-3 border-b-2 border-teal-500 hover:text-teal-700 hover:border-teal-700"
          >
            Orders
          </a>
        </Link>
        <Link href={'/category'}>
          <a
            onClick={handleClose}
            className="py-3 border-b-2 border-teal-500 hover:text-teal-700 hover:border-teal-700"
          >
            Category
          </a>
        </Link>

        <a onClick={()=>{
            setIsOpen(false)
            signOut()
          }} className="py-3">
          <WideButton name="logout" />
        </a>
      </ul>
    </nav>
  )
  }
}
