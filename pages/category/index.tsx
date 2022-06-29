
import { Card } from '../../components/Card'
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
                <td className='p-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td className='p-3 '>Malcolm Lockyer</td>
                <td className='p-3 '>1961</td>
                <td className='p-3'>1961</td>
              </tr>
              <tr className='border-b-2 border-gray-200 '>
                <td className='p-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td className='p-3'>Malcolm Lockyer</td>
                <td className='p-3'>1961</td>
                <td className='p-3'>1961</td>
              </tr>
              <tr className='border-b-2 border-gray-200 '>
                <td className='p-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td className='p-3'>Malcolm Lockyer</td>
                <td className='p-3'>1961</td>
                <td className='p-3'>1961</td>
              </tr>
            </tbody>
          </table>
        </div>
    </main>
  )
}

export default category