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
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Loading } from '../../../components/Loading'

const updateItem = async (item: FormData): Promise<FormData> => {
  return await axios.post('http://api.madcuisines.com/category/create', item)
}

const fetchCategory = async (id: string | string[] | undefined) => {
  if (typeof id === 'string') {
    const res = await fetch(
      `http://api.madcuisines.com/category/get-category/${id}`,
    )
    if (res.ok) {
      return res.json()
    }
    throw new Error('error fetching product with id')
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

const schema = yup.object().shape({
  name: yup.string().required().max(30),
  description: yup.string().required().max(200),
})

type FormInputs = yup.InferType<typeof schema>

const update = () => {
  const { status, data } = useSession()
  
  const router = useRouter()
  useEffect(()=>{
    if (status === 'unauthenticated')
    router.replace('/auth/login')
  }, [status])

  const {
    query: { id },
  } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: yupResolver(schema),
  })

  const { data: category } = useQuery(
    ['category', id],
    () => fetchCategory(id),
    {
      enabled: !!id,
    },
  )

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

  const onSubmit: SubmitHandler<FormInputs | ICategory> = (item: FormInputs | ICategory) => {
    const {
      name,
      description
    } = item

    const formData =  new FormData()
    formData.append('name', name)
    formData.append('description', description)

    mutate(formData)
  }

  if (status === "authenticated"){
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
                  placeholder={category.name}
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
                  placeholder={category.description}
                  {...register('description')}
                ></textarea>
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description.message}
                  </span>
                )}
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

  return <><Loading /></>
}

export default update
