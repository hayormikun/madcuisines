import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { QueryCache, useQuery } from 'react-query'
import { DelButton, EditButton } from '../../components/Button'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Loading } from '../../components/Loading'

const fetchOrder = async (id: string | string[] | undefined) => {
  if (typeof id === 'string') {
    const res = await fetch(`${process.env.Base_Url}/order/get-order/${id}`)
    if (res.ok) {
      const data = await res.json()
      return data.data
    }
    throw new Error('error fetching product with id')
  }

  throw new Error('invalid id')
}

const Details = () => {
  const { status, data } = useSession()

  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth/login')
  }, [status])

  const queryCahce = new QueryCache()

  const {
    query: { id },
  } = useRouter()

  const { data: order, isLoading, isError, error } = useQuery(
    ['product', id],
    () => fetchOrder(id),
    {
      enabled: !!id,
    },
  )

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  if (isError) {
    return alert(error)
  }

  const handleDelete = async (id: string) => {
    await axios
      .post(`${process.env.Base_Url}/order/delete-order/`, id)
      .then(() => {
        router.push('/orders/')
      })
      .catch(() => {
        alert('unable to delete')
      })
  }

  if (status === 'authenticated' && order) {
    const dateOrdered = new Date(order.orderDate)
    const orderDate = format(dateOrdered, 'dd-MM-yyyy')

    const expectedDate = new Date(order.dueDate)
    const dueDate = format(expectedDate, 'dd-MM-yyyy')

    const userDate = new Date(order.user.dateCreated)
    const userCreated = format(userDate, 'dd-MM-yyyy')

    order.deliveries?.forEach((delivery: any) => {
      let dateReceived = null
      let receivedDate = null

      let dateDispatched = null
      let dispatchedDate = null

      dateReceived = new Date(delivery.receivedDate)

      receivedDate = format(dateReceived, 'dd-MM-yyyy')

      delivery.receivedDate = receivedDate

      dateDispatched = new Date(delivery.dispatchedDate)

      dispatchedDate = format(dateReceived, 'dd-MM-yyyy')

      delivery.dispatchedDate = dispatchedDate

      console.log(delivery.dispatchedDate, delivery.receivedDate)
    })

    return (
      <main className="lg:flex pt-20">
        <Sidebar
          view="Orders"
          create="Order"
          viewLink="/orders"
          createLink="/orders/create"
        />
        <div className="mt-5 w-full lg:w-10/12">
          <Heading heading="Order Details" />

          {order && (
            <div className="w-11/12 p-7 bg-gray-200 rounded-md mx-auto">
              <div className="flex w-full my-3 mr-5 justify-end items-center gap-x-2">
                <Link href={`/orders/update/${id}`}>
                  <a className="mr-2">
                    <EditButton name="edit" />
                  </a>
                </Link>

                <a
                  className="mr-2"
                  onClick={() => {
                    handleDelete(order.orderId)
                  }}
                >
                  <DelButton name="delete" />
                </a>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col justify-left">
                  <h2 className="text-md my-3 font-semibold text-gray-500">
                    Basic Information
                  </h2>
                  <ul className="space-y-3 text-md font-medium text-gray-400">
                    <li>Order Id: {order.orderId}</li>
                    <li>User Id: {order.userId}</li>
                    <li>Order Number: {order.orderNumber}</li>
                    <li>Status: {order.status}</li>
                    <li>Total Amount: {order.totalAmount}</li>
                    <li>Order Date: {orderDate}</li>
                    <li>Due Date: {dueDate}</li>
                  </ul>
                </div>
                <div className="flex flex-col justify-left">
                  <h2 className="text-md my-3 font-semibold text-gray-500">
                    User Information
                  </h2>
                  <ul className="space-y-3 text-md font-medium text-gray-400">
                    <li>User Id: {order.user.userId}</li>
                    <li>First Name: {order.user.firstName}</li>
                    <li>Other Name(s): {order.user.otherNames}</li>
                    <li>Last Name: {order.user.lastName}</li>
                    <li>Email: {order.user.email}</li>
                    <li>Phone: {order.user.phoneNumber}</li>
                    <li>Date Created: {userCreated}</li>
                  </ul>
                </div>
                {order.details?.map((details: any) => (
                  <div className="flex flex-col justify-left">
                    <>{console.log(details.product?.name)}</>
                    <h2 className="text-md my-3 font-semibold text-gray-500">
                      Order Details
                    </h2>

                    <ul className="space-y-3 text-md font-medium text-gray-400">
                      <li>Order Details Id: {details.orderDetailsId}</li>
                      <li>Order Id: {details.orderId}</li>
                      <li>Product Id: {details.productId}</li>
                      <li>Extra Id: {details.extraId}</li>
                      <li>Product Name: {details.product?.name}</li>
                      <li>Extra: {details.extra?.name}</li>
                      <li>Quantity: {details.quantity}</li>
                      <li>Amount: {details.amount}</li>
                      <li>Status: {details.status}</li>
                      <li>VAT: {details.vat}</li>
                      <li>Tax: {details.tax}</li>
                    </ul>
                  </div>
                ))}
                {order.deliveries?.map((delivery: any) => (
                  <div className="flex flex-col justify-left">
                    <h2 className="text-md my-3 font-semibold text-gray-500">
                      Delivery Information
                    </h2>
                    <ul className="space-y-3 text-md font-medium text-gray-400">
                      <li>Delivery Id: {delivery.deliveryId}</li>
                      <li>Order Id: {delivery.orderId}</li>
                      <li>Order Tracking Id: {delivery.orderTrackingId}</li>
                      <li>Dispatcher: {delivery.dispatcher}</li>
                      <li>Amount: {delivery.amount}</li>
                      <li>Priority: {delivery.priority}</li>
                      <li>Receiver: {delivery.receiver}</li>
                      <li>Status: {delivery.status}</li>
                      <li>Receiver Phone: {delivery.receiverPhone}</li>
                      <li>Dispatched Date: {delivery.dispatchedDate}</li>
                      <li>Received Date: {delivery.receivedDate}</li>
                      <li>Rating: {delivery.rating}</li>
                      <li>Note: {delivery.note}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
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

export default Details
