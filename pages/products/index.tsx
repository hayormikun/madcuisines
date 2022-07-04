import axios from "axios"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useQuery, UseQueryResult } from "react-query"
import { DelButton } from "../../components/Button"
import { Card } from "../../components/Card"
import { Heading } from "../../components/Heading"
import { Sidebar } from "../../components/Sidebar"
import { IProducts } from "../../libs/interfaces/IProducts"

export interface ProductProps {
  initialData: IProducts[];
}

const fetchProducts = async()=>{
  const res = await axios.get('http://api.madcuisines.com/product/get-products')
  return res.data
}

export const getServerSideProps: GetServerSideProps<ProductProps> = async (context) => {

  return {
    props: {
      initialData:  await fetchProducts()
    }
  }
}

const products = ({initialData}: ProductProps) => {
  const {data: products, isLoading, isError, error} = useQuery('product', fetchProducts, {
    initialData: initialData
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if(isError){
    return alert(error)
  }

  return (
    <main className="lg:flex pt-20">
      <Sidebar view="Products" create="Product" viewLink="/products" createLink="/products/create" />
      <div className="mt-5 w-full lg:w-10/12">
        <Heading heading='Products'/>
        
        {/* <div className="grid md:grid-cols-4 gap-6 mx-5">
          {products.map((product: IProducts)=>(
            <div key={product?.id} className="mx-auto">
            <Card image={product?.images} description={product?.description} heading={product?.name} link={`/products/${product?.id}`} alt={product?.name} />
            <div className="flex justify-start items-center py-3">
              <Link href={"/"}>
                <a className="mr-2">
                <Button name="edit"/>
                </a>
              </Link>
              <Link href={"/"}>
                <a className="">
                <DelButton name="delete"/>
                </a>
              </Link>
            </div>
          </div>
          ))}

        </div> */}
        <div className="my-5 flex justify-center">
          <button className="mx-3 py-2 px-3 capitalize bg-gray-200 text-gray-700 border-2 rounded font-semibold">Previous</button>
          <button className="mx-3 py-2 px-6 capitalize bg-gray-200 text-gray-700 border-2 rounded font-semibold">Next</button>
        </div>
      </div>
    </main>
  )
}

export default products
