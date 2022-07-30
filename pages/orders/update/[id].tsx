import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import { useMutation, UseMutationResult } from "react-query"
import { WideButton } from "../../../components/Button"
import { Heading } from "../../../components/Heading"
import { Loading } from "../../../components/Loading"
import { Sidebar } from "../../../components/Sidebar"
import { IOrder } from "../../../libs/interfaces/IOrders"

const createOrder = async (order: IOrder): Promise<IOrder> => {
  return await axios.post('http://api.madcuisines.com/order/place-order', order)
}

const update = () => {
  const { status, data } = useSession()
  
  const router = useRouter()
  useEffect(()=>{
    if (status === 'unauthenticated')
    router.replace('/auth/login')
  }, [status])

  const [userId, setUserId] = useState<string>('')
  const [productId, setProductId] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(0)

  const {
    mutate,
    isLoading,
    isError,
    error,
    isSuccess,
  }: UseMutationResult<IOrder, Error, IOrder> = useMutation<
    IOrder,
    Error,
    IOrder
  >(createOrder)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const order: IOrder = {
      userId,
      products: [{ productId, quantity }],
    }

    console.log(order)
    mutate(order)
  }

  if (status === 'authenticated') {
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
            {isError
              ? `Error encountered while creating order delivery: ${error.message}`
              : ''}
            {isSuccess ? 'Order delivery created successfully' : ''}
            <form
              onSubmit={handleSubmit}
              action="POST"
              className="text-gray-700 font-semibold mx-auto w-6/12"
            >
              <div className="grid gap-3 w-full my-3">
                <label htmlFor="userId">UserId:</label>
                <input
                  className="p-2 w-full rounded border-2"
                  type={'text'}
                  placeholder="Enter userId"
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value)
                  }}
                  required
                />
              </div>
  
              <div className="grid gap-3 w-full my-3">
                <label htmlFor="productId">ProductId:</label>
                <input
                  className="p-2 w-full rounded border-2"
                  type={'text'}
                  placeholder="Enter productId"
                  value={productId}
                  onChange={(e) => {
                    setProductId(e.target.value)
                  }}
                  required
                />
              </div>
  
              <div className="grid gap-3 w-full my-3">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  className="p-2 rounded w-full border-2"
                  type={'number'}
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.valueAsNumber)
                  }}
                />
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

export default update
