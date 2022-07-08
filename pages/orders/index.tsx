import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'

const orders = () => {
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

        <div className="grid md:grid-cols-4 gap-6 mx-5">
          <div className="order mx-auto">
            deliveryld orderld dispatcher priority receiver receiverPhone note
          </div>
        </div>
      </div>
    </main>
  )
}

export default orders
