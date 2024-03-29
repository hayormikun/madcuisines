import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query'
import { Heading } from '../../components/Heading'
import { Loading } from '../../components/Loading'
import { Sidebar } from '../../components/Sidebar'
import { ICategories } from '../../libs/interfaces/ICategory'

const getCategories = async()=>{
  const res = await fetch(`${process.env.Base_Url}/category/get-categories`)
  const data = await res.json()
  return data.data
}

export async function getServerSideProps() {
  const queryClient = new QueryClient

  await queryClient.prefetchQuery<ICategories>('categories')
  
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const category = () => {
  const { status, data } = useSession()
  
  const router = useRouter()
  useEffect(()=>{
    if (status === 'unauthenticated')
    router.replace('/auth/login')
  }, [status])

  const {data: categories, isLoading, isError, error, refetch} = useQuery('categories', getCategories)


  const handleDelete = async (id: string) => {
    await axios
      .post(`${process.env.Base_Url}/category/delete-category/`, id)
      .then(() => {
        alert('deleted')
        refetch()
      })
      .catch(() => {
        alert('unable to delete extra')
      })
  } 

  if (isLoading) {
    return <><Loading /></>
  }

  if(isError){
    return alert(error)
  }

  if (status === 'authenticated') {
    return (
      <main className="lg:flex pt-20">
        <Sidebar
          view="Categories"
          create="Category"
          viewLink="/category"
          createLink="/category/create"
        />
        <div className="mt-5 w-full lg:w-10/12">
          <Heading heading="Categories" />
          <div className="grid">
          <table className="table-auto text-left w-11/12 mx-auto">
            <thead className="border-b-2 border-gray-200">
              <tr className="text-gray-500 font-semibold text-sm">
                <th className="p-3">CATEGORY</th>
                <th className="p-3">DESCRIPTION</th>
                <th className="p-3">UPDATE</th>
                <th className="p-3">DELETE</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 font-light">
              {categories && categories.map((category: ICategories) => (
                <tr key={category.categoryId} className="border-b-2 border-gray-200">
                <td>
                  <span className="p-3">{category.name}</span>
                </td>
                <td>
                  <span className="p-3">
                    {category.name}
                  </span>
                </td>
                <td>
                  <span className="p-3 flex item-center">
                    <Link href={`/category/update/${category.categoryId}`}>
                    <a className='flex items-center'>
                    Edit <PencilAltIcon className="ml-2 w-5" />
                    </a>
                    </Link>
                  </span>{' '}
                </td>
                <td>
                  <a className='hover:cursor-pointer' onClick={()=>{handleDelete(category.categoryId)}}>
                    <span className="p-3 flex" >
                      Delete <TrashIcon className="ml-2 w-5" />
                    </span>
                  </a>
                </td>
              </tr>
              ))}
              
            </tbody>
          </table>
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

export default category
