import axios from 'axios'

import { useForm, SubmitHandler } from 'react-hook-form'
import {
  dehydrate,
  QueryClient,
  useMutation,
  UseMutationResult,
  useQuery,
} from 'react-query'
import { WideButton } from '../../../components/Button'
import { Heading } from '../../../components/Heading'
import { Sidebar } from '../../../components/Sidebar'
import { ICategories, ICategory } from '../../../libs/interfaces/ICategory'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Loading } from '../../../components/Loading'

const updateItem = async (item: FormData): Promise<FormData> => {
  return await axios.post(
    `${process.env.Base_Url}/category/update-category`,
    item,
  )
}

const fetchCategory = async (id: string | string[] | undefined) => {
  if (typeof id === 'string') {
    const res = await fetch(
      `${process.env.Base_Url}/category/get-category/${id}`,
    )
    if (res.ok) {
      const data = await res.json()
      return data.data
    }
    throw new Error('error fetching category with id')
  }

  throw new Error('invalid id')
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<ICategory>('category')

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const update = () => {
  const { status, data } = useSession()

  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth/login')
  }, [status])

  const {
    query: { id },
  } = useRouter()

  const { data: category } = useQuery(
    ['category', id],
    () => fetchCategory(id),
    {
      enabled: !!id,
    },
  )

  const nameRef = useRef(category?.name)
  const descRef = useRef(category?.description)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategories>({
    shouldUseNativeValidation: true,

    defaultValues: {
      name: category?.name,
      description: category?.description,
    },
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
  >(updateItem)

  const onSubmit: SubmitHandler<ICategory> = (item: ICategory) => {
    const formData = new FormData()
    formData.append('categoryId', category.categoryId)
    formData.append('name', nameRef.current.value)
    formData.append('description', descRef.current.value)

    formData.forEach((key) => {
      console.log(key)
    })

    mutate(formData)
  }

  if (status === 'authenticated' && category) {
    return (
      <main className="lg:flex pt-20">
        <Sidebar
          view="Categories"
          create="Category"
          viewLink="/category"
          createLink="/category/create"
        />
        <div className="mt-5 w-full lg:w-10/12">
          <Heading heading="Update Category" />

          <div className="grid">
            {isError
              ? `Error encountered while updating Category: ${error.message}`
              : ''}
            {isSuccess ? 'Category updated successfully' : ''}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-gray-700 font-semibold mx-auto w-6/12"
            >
              <div className="grid gap-3 w-full my-5">
                <label htmlFor="name">Category Id:</label>
                <input
                  className="p-2 w-full rounded border-2"
                  type={'text'}
                  {...register('categoryId')}
                  value={category.categoryId}
                  placeholder={category.name}
                  disabled
                />
              </div>

              <div className="grid gap-3 w-full my-5">
                <label htmlFor="name">Category Name:</label>
                <input
                  className="p-2 w-full rounded border-2"
                  type={'text'}
                  {...register('name')}
                  ref={nameRef}
                  id="name"
                  name='name'
                  // defaultValue={category.name}
                  placeholder={category.name}
                  required
                />
              </div>

              <div className="grid gap-3 w-full my-5">
                <label htmlFor="description">Category Description:</label>
                <textarea
                  className="p-3  w-full rounded border-2"
                  {...register('description')}
                  ref={descRef}
                  id="description"
                  name='description'
                  // defaultValue={category.description}
                  placeholder={category.description}
                  required
                ></textarea>
              </div>

              {isLoading ? (
                <WideButton name="Updating Category... " />
              ) : (
                <WideButton name="Update Category" />
              )}
            </form>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      <Loading />
    </>
  )
}

export default update
