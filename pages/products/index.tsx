import Link from "next/link"
import { Button } from "../../components/Button"
import { Card } from "../../components/Card"
import { Heading } from "../../components/Heading"
import { Sidebar } from "../../components/Sidebar"

const products = () => {
  
  return (
    <main className="lg:flex">
      <Sidebar view="Products" create="Product" viewLink="/products" createLink="/products/create" />
      <div className="mt-5 w-full lg:w-10/12">
        <Heading heading='Products'/>
        
        <div className="grid md:grid-cols-4 gap-6 mx-5">
          <div className="product mx-auto">
            <Card image='/img/rice.jpeg' description='rice is sweet' heading='big rice' link='/products/1' alt='rice' />
            <div className="flex justify-start items-center py-3">
              <Link href={"/"}>
                <a className="mr-2">
                <Button name="edit" color="teal"/>
                </a>
              </Link>
              <Link href={"/"}>
                <a className="">
                <Button name="delete" color="red"/>
                </a>
              </Link>
            </div>
          </div>

          <div className="product mx-auto">
            <Card image='/img/rice.jpeg' description='rice is sweet' heading='big rice' link='/products/1' alt='rice' />
            <div className="flex justify-start items-center py-3">
              <Link href={"/"}>
                <a className="mr-2">
                <Button name="edit" color="teal"/>
                </a>
              </Link>
              <Link href={"/"}>
                <a className="">
                <Button name="delete" color="red"/>
                </a>
              </Link>
            </div>
          </div>

          <div className="product mx-auto">
            <Card image='/img/rice.jpeg' description='rice is sweet' heading='big rice' link='/products/1' alt='rice' />
            <div className="flex justify-start items-center py-3">
              <Link href={"/"}>
                <a className="mr-2">
                <Button name="edit" color="teal"/>
                </a>
              </Link>
              <Link href={"/"}>
                <a className="">
                <Button name="delete" color="red"/>
                </a>
              </Link>
            </div>
          </div>

          <div className="product mx-auto">
            <Card image='/img/rice.jpeg' description='rice is sweet' heading='big rice' link='/products/1' alt='rice' />
            <div className="flex justify-start items-center py-3">
              <Link href={"/"}>
                <a className="mr-2">
                <Button name="edit" color="teal"/>
                </a>
              </Link>
              <Link href={"/"}>
                <a className="">
                <Button name="delete" color="red"/>
                </a>
              </Link>
            </div>
          </div>

          <div className="product mx-auto">
            <Card image='/img/rice.jpeg' description='rice is sweet' heading='big rice' link='/products/1' alt='rice' />
            <div className="flex justify-start items-center py-3">
              <Link href={"/"}>
                <a className="mr-2">
                <Button name="edit" color="teal"/>
                </a>
              </Link>
              <Link href={"/"}>
                <a className="">
                <Button name="delete" color="red"/>
                </a>
              </Link>
            </div>
          </div>

          <div className="product mx-auto">
            <Card image='/img/rice.jpeg' description='rice is sweet' heading='big rice' link='/products/1' alt='rice' />
            <div className="flex justify-start items-center py-3">
              <Link href={"/"}>
                <a className="mr-2">
                <Button name="edit" color="teal"/>
                </a>
              </Link>
              <Link href={"/"}>
                <a className="">
                <Button name="delete" color="red"/>
                </a>
              </Link>
            </div>
          </div>

          <div className="product mx-auto">
            <Card image='/img/rice.jpeg' description='rice is sweet' heading='big rice' link='/products/1' alt='rice' />
            <div className="flex justify-start items-center py-3">
              <Link href={"/"}>
                <a className="mr-2">
                <Button name="edit" color="teal"/>
                </a>
              </Link>
              <Link href={"/"}>
                <a className="">
                <Button name="delete" color="red"/>
                </a>
              </Link>
            </div>
          </div>

          <div className="product mx-auto">
            <Card image='/img/rice.jpeg' description='rice is sweet' heading='big rice' link='/products/1' alt='rice' />
            <div className="flex justify-start items-center py-3">
              <Link href={"/"}>
                <a className="mr-2">
                <Button name="edit" color="teal"/>
                </a>
              </Link>
              <Link href={"/"}>
                <a className="">
                <Button name="delete" color="red"/>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="my-5 flex justify-center">
          <button className="mx-3 py-2 px-3 capitalize bg-gray-200 text-gray-700 border-2 rounded font-semibold">Previous</button>
          <button className="mx-3 py-2 px-6 capitalize bg-gray-200 text-gray-700 border-2 rounded font-semibold">Next</button>
        </div>
      </div>
    </main>
  )
}

export default products
