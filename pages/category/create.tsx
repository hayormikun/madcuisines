import axios from 'axios'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, UseMutationResult } from 'react-query'
import { WideButton } from '../../components/Button'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'
import { ICategory } from '../../libs/interfaces/ICategory'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Success } from '../../components/Success'
import { ErrorPrompt } from '../../components/ErrorPrompt'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Loading } from '../../components/Loading'

const createItem = async (item: FormData): Promise<FormData> => {
  return await axios.post('http://api.madcuisines.com/category/create', item)
}

const schema = yup.object().shape({
  name: yup.string().required().max(30),
  description: yup.string().required().max(200),
})

type FormInputs = yup.InferType<typeof schema>

const create = () => {
  const { status, data } = useSession()
  
  const router = useRouter()
  useEffect(()=>{
    if (status === 'unauthenticated')
    router.replace('/auth/login')
  }, [status])

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
  }: UseMutationResult<FormData, Error, FormData> = useMutation<
    FormData,
    Error,
    FormData
  >(createItem)

  const onSubmit: SubmitHandler<FormInputs | ICategory > = (item: FormInputs | ICategory) => { 
    const {
      name,
      description
    } = item

    const formData = new FormData()

    mutate(formData)
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
          <Heading heading="Create Category" />
  
          <div className="grid">
          {isError ? (
              <ErrorPrompt item="category" msg={error.message.toLowerCase()} />
            ) : (
              ''
            )}
            {isSuccess ? <Success item="category" /> : ''}
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
  return <><Loading /></>
}

export default create
