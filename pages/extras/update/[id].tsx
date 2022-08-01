import axios from 'axios'
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
import { IExtra } from '../../../libs/interfaces/IExtras'
import { ICategories } from '../../../libs/interfaces/ICategory'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Success } from '../../../components/Success'
import { ErrorPrompt } from '../../../components/ErrorPrompt'
import { IProducts } from '../../../libs/interfaces/IProducts'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Loading } from '../../../components/Loading'

const updateItem = async (item: FormData): Promise<FormData> => {
  return await axios.post(`${process.env.Base_Url}/extra/update-extra`, item)
}

const fetchExtra = async (id: string | string[] | undefined) => {
  if (typeof id === 'string') {
    const res = await fetch(`${process.env.Base_Url}/extra/get-extra/${id}`)
    if (res.ok) {
      return res.json()
    }
    throw new Error('error fetching product with id')
  }

  throw new Error('invalid id')
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<IExtra>('extra')

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const getCategories = async () => {
  const res = await fetch(`${process.env.Base_Url}/category/get-categories`)
  const data = await res.json()
  return data.data
}

const getProducts = async () => {
  const res = await fetch(`${process.env.Base_Url}/product/get-products`)
  const data = await res.json()
  return data.data
}

const schema = yup.object().shape({
  name: yup.string().required().max(30),
  productId: yup.string().required('Select a product'),
  categoryId: yup.string().required('Select a category'),
  material: yup.string().required('Extra material is required').max(30),
  description: yup.string().required('Extra description is required').max(200),
  note: yup.string().required('Extra note is required').max(150),
  unitOfMeasurement: yup
    .string()
    .required('Unit of measurement is required')
    .max(20),
  quantityAvailable: yup
    .number()
    .positive('Quantity must be greater than zero')
    .integer('Quantity must be a whole number')
    .required('Available Quantity is required'),
  unitPrice: yup
    .number()
    .positive('Price must be greater than zero')
    .required('Extra price is required'),
  unitSale: yup
    .number()
    .positive('Unit sale must be greater than zero')
    .required('Unit sale is required'),
  falsePrice: yup.number().required('Discount price is required'),

  minOrder: yup
    .number()
    .positive('Order must be greater than zero')
    .integer('Quantity must be a whole number')
    .required('Minimum order is required'),
})

type FormInputs = yup.InferType<typeof schema>

const update = () => {
  const { status, data } = useSession()

  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth/login')
  }, [status])

  const {
    query: { id },
  } = useRouter()

  const { data: extra } = useQuery(['extra', id], () => fetchExtra(id), {
    enabled: !!id,
  })

  const imageRef = useRef<HTMLInputElement>(extra.images)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IExtra>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: extra.name,
      description: extra.description,
      productId: extra.productId,
      categoryId: extra.categoryId,
      unitOfMeasurement: extra.unitOfMeasurement,
      quantityAvailable: extra.quantityAvailable,
      unitPrice: extra.unitPrice,
      unitSale: extra.unitSale,
      material: extra.material,
      note: extra.note,
      falsePrice: extra.falsePrice,
      minOrder: extra.minOrder,
    },
  })
  const { data: categories } = useQuery('categories', getCategories)
  const { data: products } = useQuery('products', getProducts)

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

  const onSubmit: SubmitHandler<FormInputs | IExtra> = (
    item: FormInputs | IExtra,
  ) => {
    const {
      name,
      description,
      productId,
      categoryId,
      unitOfMeasurement,
      quantityAvailable,
      unitPrice,
      unitSale,
      material,
      note,
      falsePrice,
      minOrder,
    } = item

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('productId', productId)
    formData.append('categoryId', categoryId)
    formData.append('unitOfMeasurement', unitOfMeasurement)
    formData.append('quantityAvailable', quantityAvailable.toString())
    formData.append('unitPrice', unitPrice.toString())
    formData.append('unitSale', unitSale.toString())
    formData.append('material', material)
    formData.append('note', note)
    formData.append('falsePrice', falsePrice.toString())
    formData.append('minOrder', minOrder.toString())

    if (imageRef.current?.files != undefined) {
      const imgLen = imageRef.current.files.length

      for (let i = 0; i < imgLen; i++) {
        formData.append('images', imageRef.current.files[i])
      }
    }

    formData.forEach((key) => {
      console.log(key)
    })
    mutate(formData)
  }

  if (status === 'authenticated') {
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
            {isError ? (
              <ErrorPrompt item="extra" msg={error.message.toLowerCase()} />
            ) : (
              ''
            )}
            {isSuccess ? <Success item="extra" /> : ''}
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/formdata"
              className="text-gray-700 font-semibold mx-auto w-6/12"
            >
              <div className="grid my-3 gap-3">
                <label htmlFor="name">Extra Name:</label>
                <input
                  className="p-2 w-full rounded border-2"
                  type={'text'}
                  {...register('name')}
                  name="name"
                  id="name"
                  placeholder="Extra name"
                  onChange={(e) => {
                    setValue('name', e.target.value, { shouldValidate: true })
                  }}
                />

                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>

              <div className="lg:flex lg:justify-between my-3 overflow-hidden">
                <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                  <label htmlFor="category">Select Category:</label>
                  <select
                    className="p-2 rounded border-2"
                    {...register('categoryId')}
                    id="category"
                    name="categotyId"
                    placeholder="Select Category"
                    onChange={(e) => {
                      setValue('categoryId', e.target.value, {
                        shouldValidate: true,
                      })
                    }}
                  >
                    {categories?.map((category: ICategories) => (
                      <option
                        className="h-fit w-fit"
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <span className="text-red-500">
                      {errors.categoryId.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                  <label htmlFor="product">Select Product:</label>
                  <select
                    className="p-2 rounded border-2"
                    {...register('productId')}
                    id="product"
                    name="productId"
                    placeholder="Select product"
                    onChange={(e) => {
                      setValue('productId', e.target.value, {
                        shouldValidate: true,
                      })
                    }}
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
                    <span className="text-red-500">
                      {errors.productId.message}
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
                    {...register('unitPrice')}
                    id="price"
                    name="unitPrice"
                    placeholder="Unit price"
                    onChange={(e) => {
                      setValue('unitPrice', e.target.value, {
                        shouldValidate: true,
                      })
                    }}
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
                    {...register('falsePrice')}
                    id="bonus"
                    name="falsePrice"
                    placeholder="Discount price"
                    onChange={(e) => {
                      setValue('falsePrice', e.target.value, {
                        shouldValidate: true,
                      })
                    }}
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
                    {...register('minOrder')}
                    id="order"
                    name="minOrder"
                    placeholder="Minimum order"
                    onChange={(e) => {
                      setValue('minOrder', e.target.value, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  {errors.minOrder && (
                    <span className="text-red-500">
                      {errors.minOrder.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="lg:flex lg:justify-between my-3 overflow-hidden">
                <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                  <label htmlFor="measurement">Measuring Unit:</label>
                  <input
                    className="p-2 w-full rounded border-2 h-fit"
                    type={'text'}
                    {...register('unitOfMeasurement')}
                    id="measurement"
                    name="unitOfMeasurement"
                    placeholder="Measuring unit"
                    onChange={(e) => {
                      setValue('unitOfMeasurement', e.target.value, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  {errors.unitOfMeasurement && (
                    <span className="text-red-500">
                      {errors.unitOfMeasurement.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-3 my-3 mr-3 w-full h-fit">
                  <label htmlFor="quantity">Available Quantity:</label>
                  <input
                    className="p-2 rounded border-2 h-fit"
                    type={'number'}
                    {...register('quantityAvailable')}
                    id="quantity"
                    name="quantityAvailable"
                    placeholder="Available Quantity"
                    onChange={(e) => {
                      setValue('quantityAvailable', e.target.value, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  {errors.quantityAvailable && (
                    <span className="text-red-500">
                      {errors.quantityAvailable.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-3 my-3 w-full h-fit">
                  <label htmlFor="sale" className="font-semibold">
                    Unit Sale:
                  </label>
                  <input
                    className="p-2 rounded w-full border-2 h-fit"
                    type={'number'}
                    {...register('unitSale')}
                    id="sale"
                    name="unitSale"
                    placeholder="Unit sale"
                    onChange={(e) => {
                      setValue('unitSale', e.target.value, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  {errors.unitSale && (
                    <span className="text-red-500">
                      {errors.unitSale.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="lg:flex lg:justify-between">
                <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    className="p-3  w-full rounded border-2 h-fit"
                    {...register('description')}
                    id="description"
                    name="description"
                    placeholder="Extra description"
                    onChange={(e) => {
                      setValue('description', e.target.value, {
                        shouldValidate: true,
                      })
                    }}
                  ></textarea>
                  {errors.description && (
                    <span className="text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-3 my-3 w-full">
                  <label htmlFor="note">Note:</label>
                  <textarea
                    className="p-3  w-full rounded border-2"
                    {...register('note')}
                    id="note"
                    name="note"
                    placeholder="Extra Note"
                    onChange={(e) => {
                      setValue('note', e.target.value, { shouldValidate: true })
                    }}
                  ></textarea>
                </div>
              </div>

              <div className="lg:flex lg:justify-between my-3">
                <div className="grid gap-3 my-3 w-full mr-3">
                  <label htmlFor="material">Material:</label>
                  <input
                    className="p-2 w-full rounded border-2"
                    type={'text'}
                    {...register('material')}
                    id="material"
                    name="material"
                    placeholder="Extra Material"
                    onChange={(e) => {
                      setValue('material', e.target.value, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  {errors.material && (
                    <span className="text-red-500">
                      {errors.material.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-3 my-3 w-full">
                  <label htmlFor="images">Choose an image or images:</label>
                  <input
                    className="p-2  w-full rounded border-2"
                    type={'file'}
                    id="images"
                    ref={imageRef}
                    multiple
                    required
                  />
                </div>
              </div>

              {isLoading ? (
                <WideButton name="Updating Extra... " />
              ) : (
                <WideButton name="Update Extra" />
              )}
            </form>
          </div>
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

export default update
