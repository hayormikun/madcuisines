import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'


const category = () => {
  return (
    <main className='lg:flex pt-20'>
      <Sidebar view='Categories' create='Category' viewLink='/category' createLink='/category/create' />
        <div className="mt-5 w-full lg:w-10/12">
          <Heading heading='Categories' />

          
          <table className="table-auto text-left w-11/12 mx-auto">
            <thead className='border-b-2 border-gray-200'>
              <tr className='text-gray-500 font-semibold text-sm'>
                <th className='p-3'>CATEGORY</th>
                <th className='p-3'>DESCRIPTION</th>
                <th className='p-3'>UPDATE</th>
                <th className='p-3'>DELETE</th>
              </tr>
            </thead>
            <tbody className='text-gray-700 font-light'>
              <tr className='border-b-2 border-gray-200 '>
                <td><span className='p-3 '>Malcolm Lockyer</span></td>
                <td><span className='p-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</span></td>
                <td><span className='p-3 flex'>Edit <PencilAltIcon className='ml-2 w-5'/></span> </td>
                <td><span className='p-3 flex'>Delete <TrashIcon className='ml-2 w-5'/></span></td>
              </tr>
              <tr className='border-b-2 border-gray-200 '>
                <td><span className='p-3 '>Malcolm Lockyer</span></td>
                <td><span className='p-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</span></td>
                <td><span className='p-3 flex'>Edit <PencilAltIcon className='ml-2 w-5'/></span> </td>
                <td><span className='p-3 flex'>Delete <TrashIcon className='ml-2 w-5'/></span></td>
              </tr>
              <tr className='border-b-2 border-gray-200 '>
                <td><span className='p-3 '>Malcolm Lockyer</span></td>
                <td><span className='p-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</span></td>
                <td><span className='p-3 flex'>Edit <PencilAltIcon className='ml-2 w-5'/></span> </td>
                <td><span className='p-3 flex'>Delete <TrashIcon className='ml-2 w-5'/></span></td>
              </tr>
              <tr className='border-b-2 border-gray-200 '>
                <td><span className='p-3 '>Malcolm Lockyer</span></td>
                <td><span className='p-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</span></td>
                <td><span className='p-3 flex'>Edit <PencilAltIcon className='ml-2 w-5'/></span> </td>
                <td><span className='p-3 flex'>Delete <TrashIcon className='ml-2 w-5'/></span></td>
              </tr>
            </tbody>
          </table>

          <div className="my-5 flex justify-center">
          <button className="mx-3 py-2 px-3 capitalize bg-gray-200 text-gray-700 border-2 rounded font-semibold">Previous</button>
          <button className="mx-3 py-2 px-6 capitalize bg-gray-200 text-gray-700 border-2 rounded font-semibold">Next</button>
        </div>
        </div>
    </main>
  )
}

export default category