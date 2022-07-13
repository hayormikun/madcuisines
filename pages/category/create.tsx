import axios from 'axios'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, UseMutationResult } from 'react-query'
import { WideButton } from '../../components/Button'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'
import { ICategory } from '../../libs/interfaces/ICategory'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const createItem = async (item: FormInputs): Promise<FormInputs> => {
  return await axios.post('http://api.madcuisines.com/category/create', item)
}

const schema = yup.object().shape({
  name: yup.string().required().max(30),
  description: yup.string().required().max(200),
})

type FormInputs = yup.InferType<typeof schema>

const create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: yupResolver(schema),
  })

  const {
    mutate,
    isLoading,
    isError,
    error,
    isSuccess,
  }: UseMutationResult<FormInputs, Error, FormInputs> = useMutation<
    FormInputs,
    Error,
    FormInputs
  >(createItem)

  const onSubmit: SubmitHandler<FormInputs> = (item: FormInputs) => {
    mutate(item)
    console.log(item)
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
            onSubmit={handleSubmit(onSubmit)}
            className="text-gray-700 font-semibold mx-auto w-6/12"
          >
            <div className="grid gap-3 w-full my-5">
              <label htmlFor="name">Category Name:</label>
              <input
                className="p-2 w-full rounded border-2"
                type={'text'}
                {...register('name')}
                id="name"
                placeholder="Category Name"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div className="grid gap-3 w-full my-5">
              <label htmlFor="description">Category Description:</label>
              <textarea
                className="p-3  w-full rounded border-2"
                id="description"
                placeholder="Product description"
                {...register('description')}
              ></textarea>
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
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
