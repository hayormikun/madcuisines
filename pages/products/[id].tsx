import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { QueryCache, useQuery } from 'react-query'
import { DelButton, EditButton } from '../../components/Button'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'

const fetchProduct = async (id: string | string[] | undefined) => {
  if (typeof id === 'string') {
    const res = await fetch(
      `http://api.madcuisines.com/product/get-product/${id}`,
    )
    if (res.ok) {
      return res.json()
    }
    throw new Error('error fetching product with id')
  }

  throw new Error('invalid id')
}

const Details = () => {
  const queryCahce = new QueryCache()

  const {
    query: { id },
  } = useRouter()

  let baseUrl = 'http://api.madcuisines.com'
  let imageSrc = ''

  const { data: product, isLoading, isError, error } = useQuery(
    ['product', id],
    () => fetchProduct(id),
    {
      enabled: !!id,
    },
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return alert(error)
  }

  const router = useRouter()

  const handleDelete = async () => {
    await axios
      .post(`/product/delete-product/${id}`)
      .then(() => {
        router.push('/products/index')
      })
      .catch(() => {
        throw new Error('unable to delete')
      })
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

        {product && (
          <div className="w-10/12 mx-auto">
            <div className="flex flex-col md:grid grid-cols-3 shadow-md">
              <div className="col-span-2 overflow-hidden h-auto">
                <div className="hidden">
                  {(imageSrc = baseUrl + product?.data.images[0].imageUrl)}
                </div>
                <img
                  src={imageSrc}
                  alt={product?.data.name}
                  className="w-auto md:w-full h-auto md:h-[600px]"
                />
              </div>
              <div className="col-span-1 bg-white pl-10 py-10 h-auto">
                <h2 className="text-3xl capitalize text-gray-700 font-bold my-3">
                  {product?.data.name}
                </h2>

                <div className="my-3">
                  <h3 className="text-md text-gray-700 font-semibold">
                    Description:
                  </h3>
                  <p className="text-gray-600">{product?.data.description}</p>
                </div>
                <ul className="text-md text-gray-700 font-semibold my-3">
                  <li className="mb-3">
                    Category:{' '}
                    <span className="text-gray-600">
                      {product?.data.category.name}
                    </span>
                  </li>
                  <li className="mb-3">
                    Measurement:{' '}
                    <span className="text-gray-600">
                      {product?.data.unitOfMeasurement}
                    </span>
                  </li>
                  <li className="mb-3">
                    Available Quantity:
                    <span className="text-gray-600">
                      {product?.data.quantityAvailable}
                    </span>
                  </li>
                  <li className="mb-3">
                    Price:{' '}
                    <span className="text-gray-600">
                      ${product?.data.unitPrice}
                    </span>
                  </li>
                  <li className="mb-3">
                    Discount Price:{' '}
                    <span className="text-gray-600">
                      ${product?.data.falsePrice}
                    </span>
                  </li>
                  <li className="mb-3">
                    Date Created:{' '}
                    <span className="text-gray-600">
                      {product?.data.dateCreated}
                    </span>
                  </li>
                </ul>

                <div className="flex justify-start items-center my-3">
                  <Link href={`/products/update/${IDBKeyRange}`}>
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

export default Details
