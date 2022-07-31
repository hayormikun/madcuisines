import { CheckCircleIcon } from '@heroicons/react/outline'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'
import { Status } from '../../components/Status'
import { IOrders } from '../../libs/interfaces/IOrders'
import { format } from 'date-fns'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Loading } from '../../components/Loading'

const getOrders = async () => {
  const res = await fetch(`${process.env.Base_Url}/order/get-orders`)
  const data = await res.json()
  return data.data
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<IOrders>('orders')

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const orders = () => {
  const { status, data } = useSession()
  
  const router = useRouter()
  useEffect(()=>{
    if (status === 'unauthenticated')
    router.replace('/auth/login')
  }, [status])

  const { data: orders, isLoading, isError, error } = useQuery(
    'orders',
    getOrders,
  )

  console.log(orders)

  if (isLoading) {
    return <><Loading /></>
  }

  if (isError) {
    return alert(error)
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
          <Heading heading="Orders" />
  
          <div className="grid md:grid-cols-3 gap-6 mx-5">
            {orders &&
              orders.map((order: IOrders) => (
                <Link href={`/orders/${order.orderId}`}>
                  <a key={order.orderId}>
                    <div
                      className="mx-auto text-gray-400 p-5 shadow border border-teal-500 rounded bg-gray-200"
                    >
                      <span className="flex py-2 justify-end items-center text-teal-500">
                        <CheckCircleIcon className="w-10" />{' '}
                      </span>
                      <div>
                        <p>
                          name:{' '}
                          {`${order.user.firstName} ${order.user.lastName} `}
                        </p>
                        <span>
                          <Status status={order.status} />
                        </span>
                        <p className="flex items-center">
                          Total:
                          {order.totalAmount}
                        </p>
                        {/* <div className="flex justify-between">
                          <p>{format(order.orderDate, 'dd/mm/yyyy')}</p>
                          <p className="text-red-400">
                            {format(order.dueDate, 'dd/mm/yyyy')}
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
          </div>
        </div>
      </main>
    )
  }

  return <><Loading /></>
}

export default orders
