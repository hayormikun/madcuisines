import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { Card } from '../../components/Card'
import { Heading } from '../../components/Heading'
import { Loading } from '../../components/Loading'
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
  const { status, data } = useSession()
  
  const router = useRouter()
  useEffect(()=>{
    if (status === 'unauthenticated')
    router.replace('/auth/login')
  }, [status])

  let baseUrl = 'http://api.madcuisines.com'
  let imageSrc = ''
  
  const { data: products, isLoading, isError, error } = useQuery(
    'product',
    getProducts,
  )

  if (isLoading) {
    return <><Loading /></>
  }

  if (isError) {
    return alert(error)
  }

  if (status === 'authenticated'){
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
                  <div className="hidden">
                    {(imageSrc = baseUrl + product.images[0].imageUrl)}
                  </div>
                  <Card
                    image={imageSrc}
                    description={product?.description}
                    heading={product?.name}
                    link={`/products/${product?.productId}`}
                    alt={product?.name}
                  />
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

  return  
}

export default products
