import { FormEvent, useState } from "react"
import { WideButton } from "../../components/Button"
import { Heading } from "../../components/Heading"
import { Sidebar } from "../../components/Sidebar"
import { ICategory } from "../../libs/interfaces/ICategory"

const create = () => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const category: ICategory = {
      name,
      description
    }

    console.log(category)
  }

  return (
    <main className='lg:flex pt-20'>
      <Sidebar view='Categories' create='Category' viewLink='/category' createLink='/category/create' />
        <div className="mt-5 w-full lg:w-10/12">
          <Heading heading='Create Category' />

          <div className="grid">
              <form onSubmit={handleSubmit} action="POST" className="text-gray-700 font-semibold mx-auto w-6/12">
                  <div className="grid gap-3 w-full my-5">
                    <label htmlFor="name">Category Name:</label>
                    <input className="p-2 w-full rounded border-2" type={"text"} id="name" placeholder="Category Name" value={name} onChange={(e)=> {setName(e.target.value)}} required/>
                  </div>

                  <div className="grid gap-3 w-full my-5">
                    <label htmlFor="description">Category Description:</label>
                    <textarea className="p-3  w-full rounded border-2" id="description" placeholder="Product description" value={description} onChange={(e)=>{setDescription(e.target.value)}} required></textarea>
                  </div>
              
                <WideButton name="Create Category" />

              </form>
            </div>
        </div>
    </main>
  )
}

export default create