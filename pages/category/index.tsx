import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'
import { ICategories } from '../../libs/interfaces/ICategory'

const getCategories = async()=>{
  const res = await fetch('http://api.madcuisines.com/category/get-categories')
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
  const {data: categories, isLoading, isError, error} = useQuery('categories', getCategories)
  console.log(categories)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if(isError){
    return alert(error)
  }


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
                <span className="p-3 flex">
                  Edit <PencilAltIcon className="ml-2 w-5" />
                </span>{' '}
              </td>
              <td>
                <span className="p-3 flex">
                  Delete <TrashIcon className="ml-2 w-5" />
                </span>
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

export default category
