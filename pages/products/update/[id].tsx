import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
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
import { IProduct, IProducts } from '../../../libs/interfaces/IProducts'
import { ICategories } from '../../../libs/interfaces/ICategory'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { HtmlHTMLAttributes, useEffect, useRef } from 'react'
import { Success } from '../../../components/Success'
import { ErrorPrompt } from '../../../components/ErrorPrompt'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Loading } from '../../../components/Loading'
import Image from 'next/image'

const updateItem = async (item: FormData): Promise<FormData> => {
  return await axios.post(
    `${process.env.Base_Url}/product/update-product`,
    item,
  )
}

const fetchProduct = async (id: string | string[] | undefined) => {
  if (typeof id === 'string') {
    const res = await fetch(`${process.env.Base_Url}/product/get-product/${id}`)
    if (res.ok) {
      const data = await res.json()
      return data.data
    }
    throw new Error('error fetching product with id')
  }

  throw new Error('invalid id')
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<IProducts, ICategories>('product')

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const getCategories = async () => {
  const res = await fetch(`${process.env.Base_Url}/get-categories`)
  const data = await res.json()
  return data.data
}

const update = () => {
  const { status, data } = useSession()

  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth/login')
  }, [status])

  const {
    query: { id },
  } = useRouter()

  const { data: product } = useQuery(['product', id], () => fetchProduct(id), {
    enabled: !!id,
  })

  const { data: categories } = useQuery('categories', getCategories)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
  
    shouldUseNativeValidation: true,

    defaultValues: {
      name: product?.name,
      description: product?.description,
      categoryId: product?.categoryId,
      unitOfMeasurement: product?.unitOfMeasurement,
      quantityAvailable: product?.quantityAvailable,
      unitPrice: product?.unitPrice,
      unitSale: product?.unitSale,
      material: product?.material,
      note: product?.note,
      falsePrice: product?.falsePrice,
      minOrder: product?.minOrder,
    },
  })

  const nameRef = useRef<HTMLInputElement>(product?.name)
  const descRef = useRef<HTMLTextAreaElement>(product?.description)
  const catIdRef = useRef<HTMLSelectElement>(product?.categoryId)
  const uomRef = useRef<HTMLInputElement>(product?.unitOfMeasurement)
  const quantityRef = useRef<HTMLInputElement>(product?.quantityAvailable)
  const priceRef = useRef<HTMLInputElement>(product?.unitPrice)
  const saleRef = useRef<HTMLInputElement>(product?.saleRef)
  const materialRef = useRef<HTMLInputElement>(product?.material)
  const noteRef = useRef<HTMLTextAreaElement>(product?.note)
  const fPriceRef = useRef<HTMLInputElement>(product?.falsePrice)
  const minOrderRef = useRef<HTMLInputElement>(product?.minOrder)
  const imageRef = useRef<HTMLInputElement>(null)

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

  console.log(product)

  const onSubmit: SubmitHandler<IProduct> = (
    item: IProduct,
  ) => {
    // const {
    //   name,
    //   description,
    //   categoryId,
    //   unitOfMeasurement,
    //   quantityAvailable,
    //   unitPrice,
    //   unitSale,
    //   material,
    //   note,
    //   falsePrice,
    //   minOrder,
    // } = item

    console.log(nameRef.current.value, descRef.current.value, catIdRef.current.value )
    const formData = new FormData()
    formData.append('name', nameRef.current.value)
    formData.append('description', descRef.current.value)
    formData.append('categoryId', catIdRef.current.value)
    formData.append('unitOfMeasurement', uomRef.current.value)
    formData.append('quantityAvailable', quantityRef.current.value)
    formData.append('unitPrice', priceRef.current.value)
    formData.append('unitSale', saleRef.current.value)
    formData.append('material', materialRef.current.value)
    formData.append('note', noteRef.current.value)
    formData.append('falsePrice', fPriceRef.current.value)
    formData.append('minOrder', minOrderRef.current.value)

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

  if (status === 'authenticated' && product) {
    return (
      <main className="lg:flex pt-20">
        <Sidebar
          view="Products"
          create="Product"
          viewLink="/products"
          createLink="/products/create"
        />

        <div className="mt-5 w-full lg:w-10/12">
          <Heading heading={'Update product'} />

          <div className="grid">
            {isError ? (
              <ErrorPrompt item="product" msg={error.message.toLowerCase()} />
            ) : (
              ''
            )}
            {isSuccess ? <Success item="product" /> : ''}
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/formdata"
              className="text-gray-700 font-semibold mx-auto w-6/12"
            >
              <div className="grid my-3 gap-3">
                <label htmlFor="name">Product Name:</label>
                <input
                  className="p-2 w-full rounded border-2"
                  {...register('name')}
                  name="name"
                  id="name"
                  ref={nameRef}
                  placeholder={product.name}
                />
              </div>

              <div className="lg:flex lg:justify-between my-3 overflow-hidden">
                <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                  <label htmlFor="category">Categories:</label>
                  <select
                    className="p-2 rounded border-2"
                    {...register('categoryId')}
                    id="category"
                    name="categoryId"
                    ref={catIdRef}
                  >
                    <option disabled>Select category</option>
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
                </div>

                <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                  <label htmlFor="measurement">Measuring Unit:</label>
                  <input
                    className="p-2 w-full rounded border-2 h-fit"
                    type={'text'}
                    {...register('unitOfMeasurement')}
                    id="measurement"
                    name="unitOfMeasurement"
                    ref={uomRef}
                  placeholder={product.unitOfMeasurement}
                  />
                </div>

                <div className="grid gap-3 my-3 w-full h-fit">
                  <label htmlFor="quantity">Available Quantity:</label>
                  <input
                    className="p-2 rounded border-2 h-fit"
                    type={'number'}
                    {...register('quantityAvailable')}
                    id="quantity"
                    name='quantityAvailable'
                    ref={quantityRef}
                    placeholder={product.quantityAvailable}
                  />
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
                    ref={priceRef}
                    placeholder={product.unitPrice}
                  />
                </div>

                <div className="grid gap-3 w-full my-3 mr-3 h-fit">
                  <label htmlFor="bonus">Discount Price:</label>
                  <input
                    className="p-2 rounded w-full border-2 h-fit"
                    type={'number'}
                    {...register('falsePrice')}
                    id="bonus"
                    name="falsePrice"
                    ref={fPriceRef}
                    placeholder={product.falsePrice}
                  />
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
                    ref={minOrderRef}
                    placeholder={product.minOrder}
                  />
                </div>
              </div>

              <div className="lg:flex lg:justify-between my-3 overflow-hidden">
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
                    ref={saleRef}
                    placeholder={product.unitSale}
                  />
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
                    ref={descRef}
                    placeholder={product.description}
                  ></textarea>
                </div>

                <div className="grid gap-3 my-3 w-full">
                  <label htmlFor="note">Note:</label>
                  <textarea
                    className="p-3  w-full rounded border-2"
                    {...register('note')}
                    id="note"
                    name="note"
                    ref={noteRef}
                    placeholder={product.note}
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
                    ref={materialRef}
                    placeholder={product.material}
                  />
                </div>

                <div className="grid gap-3 my-3 w-full">
                  <label htmlFor="images">Choose an image or images:</label>
                  <input
                    className="p-2  w-full rounded border-2"
                    type={'file'}
                    id="images"
                    defaultValue={product.images}
                    ref={imageRef}
                    multiple
                  />
                  {product.images.map((image: any) => {
                    ;<div className="grid grid-cols-2">
                      <Image
                        src={`${process.env.Base_Url}/${image.imageUrl}`}
                        alt={product.name}
                        width={250}
                        height={250}
                      />
                    </div>
                  })}
                </div>
              </div>

              {isLoading ? (
                <WideButton name="Updating Product... " />
              ) : (
                <WideButton name="Update Product" />
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
