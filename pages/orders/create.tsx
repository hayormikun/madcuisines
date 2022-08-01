import axios from 'axios'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, UseMutationResult, useQuery } from 'react-query'
import { WideButton } from '../../components/Button'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Success } from '../../components/Success'
import { ErrorPrompt } from '../../components/ErrorPrompt'
import { IOrder } from '../../libs/interfaces/IOrders'
import { IProducts } from '../../libs/interfaces/IProducts'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Loading } from '../../components/Loading'

const createItem = async (item: FormData): Promise<FormData> => {
  return await axios.post(`${process.env.Base_Url}/order/place-order`, item)
}

const getProducts = async () => {
  const res = await fetch(`${process.env.Base_Url}/product/get-products`)
  const data = await res.json()
  return data.data
}

const schema = yup.object().shape({
  userId: yup.string().required("user Id is a required"),
  productId: yup.string().required("Select a product"),
  quantity: yup.number().positive().integer().required()
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
  } = useForm<IOrder>({
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

  const { data: products } = useQuery('products', getProducts)

  const onSubmit: SubmitHandler<FormInputs | IOrder> = (
    item: FormInputs | IOrder,
  ) => {
    const { userId, productId, quantity, } = item
    const products = [{
      productId,
      quantity: quantity.toString()
    }]

    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('products', JSON.stringify(products))

    mutate(formData)
  }

  if (status === 'authenticated'){
    return (
      <main className="lg:flex pt-20">
        <Sidebar
          view="Orders"
          create="Order"
          viewLink="/orders"
          createLink="/orders/create"
        />
        <div className="mt-5 w-full lg:w-10/12">
          <Heading heading="Create Order" />
  
          <div className="grid">
            {isError ? (
              <ErrorPrompt item="order" msg={error.message.toLowerCase()} />
            ) : (
              ''
            )}
            {isSuccess ? <Success item="order" /> : ''}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-gray-700 font-semibold mx-auto w-6/12"
            >
              <div className="grid gap-3 w-full my-5">
                <label htmlFor="userId">User Id :</label>
                <input
                  className="p-2 w-full rounded border-2"
                  type={'text'}
                  {...register('userId')}
                  id="userId"
                  placeholder="User Id"
                />
                {errors.userId && (
                  <span className="text-red-500">{errors.userId.message}</span>
                )}
              </div>
  
              <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                <label htmlFor="product">Select Product:</label>
                <select
                  className="p-2 rounded border-2"
                  id="product"
                  placeholder="Select product"
                  {...register('productId')}
                >
                  {products?.map((product: IProducts) => (
                    <option
                      className="h-fit w-fit"
                      key={product.productId}
                      value={product.productId}
                    >
                      {product.name}
                    </option>
                  ))}
                </select>
                {errors.productId && (
                  <span className="text-red-500">{errors.productId.message}</span>
                )}
              </div>
  
              <div className="grid gap-3 my-3 w-full h-fit">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    className="p-2 rounded border-2 h-fit"
                    type={'number'}
                    id="quantity"
                    placeholder="Quantity"
                    {...register('quantity')}
                  />
                  {errors.quantity && (
                    <span className="text-red-500">
                      {errors.quantity.message}
                    </span>
                  )}
                </div>
  
              {isLoading ? (
                <WideButton name="Creating Order... " />
              ) : (
                <WideButton name="Create Order" />
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
