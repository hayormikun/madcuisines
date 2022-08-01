import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { QueryCache, useQuery } from 'react-query'
import { DelButton, EditButton } from '../../components/Button'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Loading } from '../../components/Loading'

const fetchProduct = async (id: string | string[] | undefined) => {
  if (typeof id === 'string') {
    const res = await fetch(
      `${process.env.Base_Url}/product/get-product/${id}`,
    )
    if (res.ok) {
      const data = await res.json()
      return data.data
    }
    throw new Error('error fetching product with id')
  }

  throw new Error('invalid id')
}

const Details = () => {
  const { status, data } = useSession()
  
  const router = useRouter()
  useEffect(()=>{
    if (status === 'unauthenticated')
    router.replace('/auth/login')
  }, [status])

  const queryCahce = new QueryCache()

  const {
    query: { id },
  } = useRouter()

  let baseUrl = `${process.env.Base_Url}`
  let imageSrc = ''

  const { data: product, isLoading, isError, error } = useQuery(
    ['product', id],
    () => fetchProduct(id),
    {
      enabled: !!id,
    },
  )

  console.log(product)

  // const createdAt = new Date(product?.dateCreated)
  // const date = format(createdAt, 'dd/mm/yyyy')

  if (isLoading) {
    return <><Loading /></>
  }

  if (isError) {
    return alert(error)
  }

  const handleDelete = async () => {
    await axios
      .post(`${process.env.Base_Url}/product/delete-product/${id}`)
      .then(() => {
        router.push('/products/index')
      })
      .catch(() => {
        throw new Error('unable to delete')
      })
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
  
          {product && (
            <div className="w-10/12 mx-auto">
              <div className="flex flex-col md:grid grid-cols-3 shadow-md">
                <div className="col-span-2 overflow-hidden h-auto">
                  <div className="hidden">
                    {(imageSrc = baseUrl + product?.images[0].imageUrl)}
                  </div>
                  <img
                    src={imageSrc}
                    alt={product?.name}
                    className="w-auto md:w-full h-auto md:h-[600px]"
                  />
                </div>
                <div className="col-span-1 bg-white pl-10 py-10 h-auto">
                  <h2 className="text-3xl capitalize text-gray-700 font-bold my-3">
                    {product?.name}
                  </h2>
  
                  <div className="my-3">
                    <h3 className="text-md text-gray-700 font-semibold">
                      Description:
                    </h3>
                    <p className="text-gray-600">{product?.description}</p>
                  </div>
                  <ul className="text-md text-gray-700 font-semibold my-3">
                    <li className="mb-3">
                      Category:{' '}
                      <span className="text-gray-600">
                        {product?.category.name}
                      </span>
                    </li>
                    <li className="mb-3">
                      Measurement:{' '}
                      <span className="text-gray-600">
                        {product?.unitOfMeasurement}
                      </span>
                    </li>
                    <li className="mb-3">
                      Available Quantity:
                      <span className="text-gray-600">
                        {product?.quantityAvailable}
                      </span>
                    </li>
                    <li className="mb-3">
                      Price:{' '}
                      <span className="text-gray-600">${product?.unitPrice}</span>
                    </li>
                    <li className="mb-3">
                      Discount Price:{' '}
                      <span className="text-gray-600">
                        ${product?.falsePrice}
                      </span>
                    </li>
                    {/* <li className="mb-3">
                      Date Created: <span className="text-gray-600">{date}</span>
                    </li> */}
                  </ul>
  
                  <div className="flex justify-start items-center my-3">
                    <Link href={`/products/update/${id}`}>
                      <a className="mr-2">
                        <EditButton name="edit" />
                      </a>
                    </Link>
  
                    <a className="mr-2" onClick={handleDelete}>
                      <DelButton name="delete" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    )
  }

  return <><Loading /></>
}

export default Details
