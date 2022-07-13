import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, UseMutationResult, useQuery } from 'react-query'
import { WideButton } from '../../components/Button'
import { Heading } from '../../components/Heading'
import { Sidebar } from '../../components/Sidebar'
import { IProduct } from '../../libs/interfaces/IProducts'
import { ICategories } from '../../libs/interfaces/ICategory'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRef } from 'react'

const getCategories = async () => {
  const res = await fetch('http://api.madcuisines.com/category/get-categories')
  const data = await res.json()
  return data.data
}

const createItem = async (item: FormInputs): Promise<FormInputs> => {
  return await axios.post('http://api.madcuisines.com/product/create', item)
}

const schema = yup.object().shape({
  name: yup.string().required().max(30),
  category: yup.string().required('Select a category').max(20),
  description: yup.string().required('Product description is required').max(200),
  unitOfMeasurement: yup.string().required('Unit of measurement is required').max(20),
  quantityAvailable: yup.number().positive("Quantity must be greater than zero").integer('Quantity must be a whole number').required('Available Quantity is required'),
  unitPrice: yup.number().positive('Price must be greater than zero').required('Product price is required'),
  falsePrice: yup.string(),
  minOrder: yup.number().positive('Order must be greater than zero').integer('Quantity must be a whole number').required('Minimum order is required'),
})

type FormInputs = yup.InferType<typeof schema>

const create = () => {
  const imageRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: yupResolver(schema),
  })
  const { data: categories } = useQuery('categories', getCategories)

  const {
    mutate,
    isLoading,
    isError,
    error,
    isSuccess,
  }: UseMutationResult<FormInputs, Error, FormInputs> = useMutation<
    FormInputs,
    Error,
    FormInputs
  >(createItem)

  const onSubmit: SubmitHandler<FormInputs> = (item: FormInputs) => {
    console.log(item)
    console.table(imageRef.current?.files)
    mutate(item)
  }
  return (
    <main className="lg:flex pt-20">
      <Sidebar
        view="Products"
        create="Product"
        viewLink="/products"
        createLink="/products/create"
      />

      <div className="mt-5 w-full lg:w-10/12">
        <Heading heading="Create Product" />

        <div className="grid">
          {isError
            ? `Error encountered while creating extra: ${error.message}`
            : ''}
          {isSuccess ? 'Product created successfully' : ''}
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="POST"
            encType="multipart/formdata"
            className="text-gray-700 font-semibold mx-auto w-6/12"
          >
            <div className="grid my-3 gap-3">
              <label htmlFor="name">Product Name:</label>
              <input
                className="p-2 w-full rounded border-2"
                type={'text'}
                id="name"
                placeholder="Product name"
                {...register('name')}
              />

              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div className="lg:flex lg:justify-between my-3 overflow-hidden">
              <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                <label htmlFor="category">Categories:</label>
                <select
                  className="p-2 rounded border-2"
                  id="category"
                  placeholder="Select Category"
                  {...register('category')}
                >
                  {categories?.map((category: ICategories) => (
                    <option className='h-fit w-fit' key={category.categoryId} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-red-500">
                    {errors.category.message}
                  </span>
                )}
              </div>

              <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                <label htmlFor="measurement">Measuring Unit:</label>
                <input
                  className="p-2 w-full rounded border-2 h-fit"
                  type={'text'}
                  id="measurement"
                  placeholder="Measuring unit"
                  {...register('unitOfMeasurement')}
                />
                {errors.unitOfMeasurement && (
                  <span className="text-red-500">
                    {errors.unitOfMeasurement.message}
                  </span>
                )}
              </div>

              <div className="grid gap-3 my-3 w-full h-fit">
                <label htmlFor="quantity">Available Quantity:</label>
                <input
                  className="p-2 rounded border-2 h-fit"
                  type={'number'}
                  id="quantity"
                  placeholder="Available Quantity"
                  {...register('quantityAvailable')}
                />
                {errors.quantityAvailable && (
                  <span className="text-red-500">
                    {errors.quantityAvailable.message}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:flex lg:justify-between my-3 overflow-hidden">
              <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                <label htmlFor="price">Price:</label>
                <input
                  className="p-2 rounded w-full border-2 h-fit"
                  type={'number'}
                  id="price"
                  placeholder="Unit price"
                  {...register('unitPrice')}
                />
                {errors.unitPrice && (
                  <span className="text-red-500">
                    {errors.unitPrice.message}
                  </span>
                )}
              </div>

              <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                <label htmlFor="bonus">Discount Price:</label>
                <input
                  className="p-2 rounded w-full border-2 h-fit"
                  type={'number'}
                  id="bonus"
                  placeholder="Discount price"
                  {...register('falsePrice')}
                />
                {errors.falsePrice && (
                  <span className="text-red-500">
                    {errors.falsePrice.message}
                  </span>
                )}
              </div>

              <div className="grid gap-3 my-3 w-full h-fit">
                <label htmlFor="order" className="font-semibold">
                  Min Order:
                </label>
                <input
                  className="p-2 rounded w-full border-2 h-fit"
                  type={'number'}
                  id="order"
                  placeholder="Minimum order"
                  {...register('minOrder')}
                />
                {errors.minOrder && (
                  <span className="text-red-500">
                    {errors.minOrder.message}
                  </span>
                )}
              </div>
            </div>
            <div className="lg:flex lg:justify-between">
              <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                <label htmlFor="description">Description:</label>
                <textarea
                  className="p-3  w-full rounded border-2 h-fit"
                  id="description"
                  placeholder="Product description"
                  {...register('description')}
                ></textarea>
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>

              {/* <div className="grid gap-3 my-3 w-full">
                <label htmlFor="note">Note:</label>
                <textarea
                  className="p-3  w-full rounded border-2"
                  id="note"
                  placeholder="Product Note"
                  {...register('note')}
                ></textarea>
              </div> */}
            </div>

            <div className="lg:flex lg:justify-between my-3">
              {/* <div className="grid gap-3 my-3 w-full mr-3">
                <label htmlFor="material">Material:</label>
                <input
                  className="p-2 w-full rounded border-2"
                  type={'text'}
                  id="material"
                  placeholder="Product Material"
                  {...register('material')}
                />
                {errors.material && (
                  <span className="text-red-500">
                    {errors.material.message}
                  </span>
                )}
              </div> */}

              <div className="grid gap-3 my-3 w-full">
                <label htmlFor="images">Choose an image or images:</label>
                <input
                  className="p-2  w-full rounded border-2"
                  type={'file'}
                  id="images"
                  ref={imageRef}
                  multiple
                />
              </div>
            </div>

            {isLoading ? (
              <WideButton name="Creating Product... " />
            ) : (
              <WideButton name="Create Product" />
            )}
          </form>
        </div>
      </div>
    </main>
  )
}

export default create
