import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useMutation, UseMutationResult } from 'react-query'
import { WideButton } from '../../components/Button'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'
import { ICategory } from '../../libs/interfaces/ICategory'

const createCategory = async (category: ICategory): Promise<ICategory> => {
  return await axios.post(
    'http://api.madcuisines.com/category/create',
    category,
  )
}

const create = () => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const {
    mutate,
    isLoading,
    isError,
    error,
    isSuccess,
  }: UseMutationResult<ICategory, Error, ICategory> = useMutation<
    ICategory,
    Error,
    ICategory
  >(createCategory)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const category: ICategory = {
      name,
      description,
    }

    mutate(category)
    console.log(category)
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
        <Heading heading="Create Category" />

        <div className="grid">
          {isError
            ? `Error encountered while creating Category: ${error.message}`
            : ''}
          {isSuccess ? 'Category created successfully' : ''}
          <form
            onSubmit={handleSubmit}
            action="POST"
            className="text-gray-700 font-semibold mx-auto w-6/12"
          >
            <div className="grid gap-3 w-full my-5">
              <label htmlFor="name">Category Name:</label>
              <input
                className="p-2 w-full rounded border-2"
                type={'text'}
                id="name"
                placeholder="Category Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                required
              />
            </div>

            <div className="grid gap-3 w-full my-5">
              <label htmlFor="description">Category Description:</label>
              <textarea
                className="p-3  w-full rounded border-2"
                id="description"
                placeholder="Product description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                required
              ></textarea>
            </div>

            {isLoading ? (
              <WideButton name="Creating Category... " />
            ) : (
              <WideButton name="Create Category" />
            )}
          </form>
        </div>
      </div>
    </main>
  )
}

export default create
