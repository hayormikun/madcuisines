import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { Card } from '../../components/Card'
import { Heading } from '../../components/Heading'
import { Loading } from '../../components/Loading'
import { Sidebar } from '../../components/Sidebar'
import { IExtras } from '../../libs/interfaces/IExtras'

const getExtras = async () => {
  const res = await fetch('http://api.madcuisines.com/extra/get-extras')
  const data = await res.json()
  return data.data
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<IExtras>('extras')

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const extras = () => {
  const { status, data } = useSession()
  
  const router = useRouter()
  useEffect(()=>{
    if (status === 'unauthenticated')
    router.replace('/auth/login')
  }, [status])

  const { data: extras, isLoading, isError, error } = useQuery(
    'extras',
    getExtras,
  )


  let baseUrl = 'http://api.madcuisines.com'
  let imageSrc = ''

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
          view="Extras"
          create="Extra"
          viewLink="/extras"
          createLink="/extras/create"
        />
  
        <div className="mt-5 w-full lg:w-10/12">
          <Heading heading="Extras" />
  
          <div className="grid md:grid-cols-4 gap-6 mx-5">
            {extras &&
              extras.map((extra: IExtras) => (
                <div key={extra.extraId} className="extra mx-auto">
                  <div className="hidden">
                    {(imageSrc = baseUrl + extra.images[0].imageUrl)}
                  </div>
                  <Card
                    image={imageSrc}
                    description={extra.description}
                    heading={extra.name}
                    link={`/extras/${extra.extraId}`}
                    alt={extra.name}
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

  return <><Loading /></>
}

export default extras
