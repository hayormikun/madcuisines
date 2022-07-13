import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'
import { IExtras } from '../../libs/interfaces/IExtras'

const fetchExtra = async (
  id: string | string[] | undefined,
) => {
  if (typeof id === 'string') {
    const res = await fetch(`http://api.madcuisines.com/extra/get-extra/${id}`)
    if (res.ok) {
      return res.json()
    }
    throw new Error('error fetching user with id')
  }

  throw new Error('invalid id')
}

const Details = () => {
  const {
    query: { id },
  } = useRouter()

  let baseUrl = 'http://api.madcuisines.com'
  let imageSrc = ''

  const { data: extra, isLoading, isError, error } = useQuery(['extra', id], () => fetchExtra(id), {
    enabled: !!id,
  })
  console.log(extra)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return alert(error)
  }

  return (
    <main className="lg:flex pt-20">
      <Sidebar
        view="Extras"
        create="Extra"
        viewLink="/extras"
        createLink="/extras/create"
      />
      <div className="mt-5 w-full lg:w-10/12">
        <Heading heading="Extras" />

        {extra && (
          <div className="w-10/12 mx-auto">
            <div className="flex flex-col md:grid grid-cols-3">
              <div className="col-span-2 ">
                <div className="hidden">
                  {(imageSrc = baseUrl + extra?.data.images[0].imageUrl)}
                </div>
                <img src={imageSrc} alt={extra?.data.name} className="w-full md:h-[36.25em]"/>
              </div>
              <div className="col-span-1 bg-white pl-10">
                <h2 className="text-lg text-gray-800 font-bold mt-3">
                  {extra?.data.name}
                </h2>
                <div>
                  <h3 className="text-md text-gray-600 font-semibold mt-3">
                    Description
                  </h3>
                  <p>{extra?.data.description}</p>
                </div>
                <ul className="text-md text-gray-600 font-medium mt-3">
                  <li>
                    Product Category: <span>{extra?.data.category.name}</span>
                  </li>
                  <li>
                    Measurement: <span>{extra?.data.unitOfMeasurement}</span>
                  </li>
                  <li>
                    Available Quantity: <span>{extra?.data.quantityAvailable}</span>
                  </li>
                  <li>
                    Price: <span>${extra?.data.unitPrice}</span>
                  </li>
                  <li>
                    Bonus Price: <span>${extra?.data.falsePrice}</span>
                  </li>
                  <li>
                    Date Created: <span>{extra?.data.dateCreated}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Details
