import { FormEvent, useState } from "react"
import { WideButton } from "../../../components/Button"
import { Heading } from "../../../components/Heading"
import { Sidebar } from "../../../components/Sidebar"
import { IOrder } from "../../../libs/interfaces/IOrders"


const update = () => {
  const [dispatcher, setDispatcher] = useState<string>('')
  const [priority, setPriority] = useState<string>('normal')
  const [receiver, setReceiver] = useState<string>('')
  const [receiverPhone, setReceiverPhone] = useState<string>('')
  const [note, setNote] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const order: IOrder = {
      dispatcher,
      priority,
      receiver,
      receiverPhone,
      note,
    }

    console.log(order)
  }

  return (
    <main className="lg:flex pt-20">
        <Sidebar view='Orders' create='Order' viewLink='/orders' createLink='/orders/create' />

      <div className="mt-5 w-full lg:w-10/12">
        <Heading heading='Update Order Delivery' />

          <div className="grid">
              <form onSubmit={handleSubmit} action="POST" className="text-gray-700 font-semibold mx-auto w-6/12">
                <div className="lg:flex lg:justify-between my-3 overflow-hidden">
                  <div className="grid gap-3 w-full my-3 mr-3">
                    <label htmlFor="dispatcher">Dispatcher:</label>
                    <input className="p-2 w-full rounded border-2" type={"text"} id="dispatcher" placeholder="Dispatcher name" value={dispatcher} onChange={(e)=> {setDispatcher(e.target.value)}} required/>
                  </div>

                  <div className="grid gap-3 w-full my-3 mr-3">
                    <label htmlFor="priority">Priority:</label>
                    <select className="p-2 rounded border-2" id="priority" placeholder="Select Category" value={priority} onChange={(e)=> {setPriority(e.target.value)}} required>
                      <option value="high">High</option>
                      <option value="normal">Normal</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="lg:flex lg:justify-between my-3 overflow-hidden">
                  <div className="grid gap-3 w-full my-3 mr-3">
                      <label htmlFor="receiver">Receiver:</label>
                      <input className="p-2 rounded w-full border-2" type={"text"} id="receiver" placeholder="Receiver Name" value={receiver} onChange={(e)=> {setReceiver(e.target.value)}}/>
                    </div>

                    <div className="grid gap-3 w-full my-3 mr-3">
                      <label htmlFor="receiverPhone">Receiver Phone:</label>
                      <input className="p-2 rounded w-full border-2" type={"text"} id="receiverPhone" placeholder="Receiver Phone" value={receiverPhone} onChange={(e)=> {setReceiverPhone(e.target.value)}}/>
                    </div>
                </div>
                  <div className="grid gap-3 my-3 w-full">
                  <label htmlFor="note">Note:</label>
                    <textarea className="p-3  w-full rounded border-2" id="note" placeholder="Order Note" value={note} onChange={(e)=>{setNote(e.target.value)}} required></textarea>
                  </div>
              
                
                <WideButton name="Update Order" />

              </form>
            </div>
      </div>
    </main>
  )
}

export default update