import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useMutation, UseMutationResult } from 'react-query'
import { WideButton } from '../../components/Button'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'
import { IExtra } from '../../libs/interfaces/IExtras'

const createExtra = async (extra: IExtra): Promise<IExtra> => {
  return await axios.post('madcuisne', extra)
}

const create = () => {
  const [name, setName] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [measurement, setMeasurement] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [bonus, setBonus] = useState<number>(0)
  const [order, setOrder] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [note, setNote] = useState<string>('')
  const [material, setMaterial] = useState<string>('')
  const [images, setImages] = useState<File[] | undefined>(undefined)

  const {
    mutate,
    isLoading,
    isError,
    error,
    isSuccess,
  }: UseMutationResult<IExtra, Error, IExtra> = useMutation<
    IExtra,
    Error,
    IExtra
  >(createExtra)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const extra: IExtra = {
      name,
      category,
      measurement,
      quantity,
      price,
      bonus,
      order,
      description,
      note,
      material,
      images,
    }

    // console.log(extra)
    // mutate(extra)
  }

  return (
    <main className="lg:flex pt-20">
      <Sidebar
        view="Extras"
        create="Extra"
        viewLink="/extras"
        createLink="/extras/create"
      />

      <div className="mt-5 w-full lg:w-10/12">
        <Heading heading="Create Extra" />
        <div className="grid">
          {isError
            ? `Error encountered while creating extra: ${error.message}`
            : ''}
          {isSuccess ? 'Extra created successfully' : ''}
          <form
            onSubmit={handleSubmit}
            action="POST"
            encType="multipart/formdata"
            className="text-gray-700 font-semibold mx-auto w-6/12"
          >
            <div className="grid my-3 gap-3">
              <label htmlFor="name">Extra Name:</label>
              <input
                className="p-2 w-full rounded border-2"
                type={'text'}
                id="name"
                placeholder="Extra name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                required
              />
            </div>

            <div className="lg:flex lg:justify-between my-3 overflow-hidden">
              <div className="grid gap-3 w-full my-3 mr-3">
                <label htmlFor="category">Categories:</label>
                <select
                  className="p-2 rounded border-2"
                  id="category"
                  placeholder="Select Category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value)
                  }}
                  required
                >
                  <option value="Native">Native</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>

              <div className="grid gap-3 w-full my-3 mr-3">
                <label htmlFor="measurement">Measuring Unit:</label>
                <input
                  className="p-2 w-full rounded border-2"
                  type={'text'}
                  id="measurement"
                  placeholder="Measuring unit"
                  value={measurement}
                  onChange={(e) => {
                    setMeasurement(e.target.value)
                  }}
                  required
                />
              </div>

              <div className="grid gap-3 my-3 w-full">
                <label htmlFor="quantity">Available Quantity:</label>
                <input
                  className="p-2 rounded border-2"
                  type={'number'}
                  id="quantity"
                  placeholder="Extra quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.valueAsNumber)
                  }}
                />
              </div>
            </div>

            <div className="lg:flex lg:justify-between my-3 overflow-hidden">
              <div className="grid gap-3 w-full my-3 mr-3">
                <label htmlFor="price">Price:</label>
                <input
                  className="p-2 rounded w-full border-2"
                  type={'number'}
                  id="price"
                  placeholder="Unit price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.valueAsNumber)
                  }}
                />
              </div>

              <div className="grid gap-3 w-full my-3 mr-3">
                <label htmlFor="bonus">Bonus Price:</label>
                <input
                  className="p-2 rounded w-full border-2"
                  type={'number'}
                  id="bonus"
                  placeholder="Bonus price"
                  value={bonus}
                  onChange={(e) => {
                    setBonus(e.target.valueAsNumber)
                  }}
                />
              </div>

              <div className="grid gap-3 my-3 w-full">
                <label htmlFor="order" className="font-semibold">
                  Min Order:
                </label>
                <input
                  className="p-2 rounded w-full border-2"
                  type={'number'}
                  id="order"
                  placeholder="Minimum order "
                  value={order}
                  onChange={(e) => {
                    setOrder(e.target.valueAsNumber)
                  }}
                />
              </div>
            </div>
            <div className="lg:flex lg:justify-between">
              <div className="grid gap-3 w-full my-3 mr-3">
                <label htmlFor="description">Description:</label>
                <textarea
                  className="p-3  w-full rounded border-2"
                  id="description"
                  placeholder="Extra description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                  required
                ></textarea>
              </div>

              <div className="grid gap-3 my-3 w-full">
                <label htmlFor="note">Note:</label>
                <textarea
                  className="p-3  w-full rounded border-2"
                  id="note"
                  placeholder="Extra Note"
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value)
                  }}
                  required
                ></textarea>
              </div>
            </div>

            <div className="lg:flex lg:justify-between my-3">
              <div className="grid gap-3 my-3 w-full mr-3">
                <label htmlFor="material">Material:</label>
                <input
                  className="p-2 w-full rounded border-2"
                  type={'text'}
                  id="material"
                  placeholder="Extra Material "
                  value={material}
                  onChange={(e) => {
                    setMaterial(e.target.value)
                  }}
                  required
                />
              </div>

              <div className="grid gap-3 my-3 w-full">
                <label htmlFor="images">Extra Images:</label>
                <input
                  className="p-2  w-full rounded border-2"
                  type={'file'}
                  value={images}
                  onChange={(e) => {
                    setImages(e.target.files)
                  }}
                  multiple
                  required
                />
              </div>
            </div>

            {isLoading ? (
              <WideButton name="Creating Extra... " />
            ) : (
              <WideButton name="Create Extra" />
            )}
          </form>
        </div>
      </div>
    </main>
  )
}

export default create
