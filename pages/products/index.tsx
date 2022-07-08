import axios from 'axios'
import Link from 'next/link'
import { dehydrate, QueryClient, useQuery, UseQueryResult } from 'react-query'
import { DelButton, EditButton } from '../../components/Button'
import { Card } from '../../components/Card'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'
import { IProducts } from '../../libs/interfaces/IProducts'

const getProducts = async () => {
  const res = await fetch('http://api.madcuisines.com/product/get-products')
  const data = await res.json()
  return data.data
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<IProducts>('products')

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const products = () => {
  const { data: products, isLoading, isError, error } = useQuery(
    'product',
    getProducts,
  )
  console.log(products)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return alert(error)
  }

  return (
    <main className="lg:flex pt-20">
      <Sidebar
        view="Products"
        create="Product"
        viewLink="/products"
        createLink="/products/create"
      />
      <div className="mt-5 w-full lg:w-10/12">
        <Heading heading="Products" />

        <div className="grid md:grid-cols-4 gap-6 mx-5">
          {products &&
            products.map((product: IProducts) => (
              <div key={product?.productId} className="mx-auto">
                <Card
                  image="/img/rice.jpeg"
                  description={product?.description}
                  heading={product?.name}
                  link={`/products/${product?.productId}`}
                  alt={product?.name}
                />
                <div className="flex justify-start items-center py-3">
                  <Link href={`/products/${product?.productId}`}>
                    <a className="mr-2">
                      <EditButton name="edit" />
                    </a>
                  </Link>
                  <Link href={`/products/${product?.productId}`}>
                    <a className="">
                      <DelButton name="delete" />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className="my-5 flex justify-center">
          <button className="mx-3 py-2 px-3 capitalize bg-gray-200 text-gray-700 border-2 rounded font-semibold">
            Previous
          </button>
          <button className="mx-3 py-2 px-6 capitalize bg-gray-200 text-gray-700 border-2 rounded font-semibold">
            Next
          </button>
        </div>
      </div>
    </main>
  )
}

export default products
