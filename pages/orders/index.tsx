import { Heading } from "../../components/Heading"
import { Sidebar } from "../../components/Sidebar"


const orders = () => {
  return (
    <main className="lg:flex">
        <Sidebar view="Orders" create="Order" viewLink="/orders" createLink="/orders/create" />

        <div className="mt-5 w-full lg:w-10/12">
          <Heading heading='Orders' />
        </div>
    </main>
  )
}

export default orders