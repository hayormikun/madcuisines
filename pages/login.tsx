import { LockClosedIcon, MailIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { WideButton } from '../components/Button'
import { Heading } from '../components/Heading'
import { ILogin } from '../libs/interfaces/ILogin'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useMutation, UseMutationResult } from 'react-query'

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
})

type FormInputs = yup.InferType<typeof schema>

const loginUser = async (authUser: FormData): Promise<FormData> => {
  return await axios.post('http://api.madcuisines.com/user/login', authUser)
}

const login = () => {
  const [focus, setFocus] = useState<boolean>(false)
  const [show, setShow] = useState('absolute')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(schema),
  })

  const {
    isError,
    isSuccess,
    mutate,
  }: UseMutationResult<FormData, Error, FormData> = useMutation<
    FormData,
    Error,
    FormData
  >(loginUser)

  const handleField = () => {
    setFocus(!focus)
    setShow('hidden')
  }

  const handleBlur = () => {
    setFocus(!focus)
    setShow('absolute')
  }

  const onSubmit: SubmitHandler<FormInputs | ILogin> = (
    authUser: FormInputs | ILogin,
  ) => {
    const { email, password } = authUser
    const formData = new FormData()
    formData.append('admin', email)
    formData.append('password', password)

    formData.forEach((key) => {
      console.log(key)
    })
    
    mutate(formData)

    if (isSuccess) {
      router.push('/')
    }
  }

  return (
    <main className="flex flex-col items-center justify-center pt-32 mb-28">
      <Heading heading="login" />
      <div className="flex flex-col justify-between sm:w-10/12 md:w-8/12 lg:w-4/12 shadow-md p-10">
        <div className="flex justify-center">
          <Image
            src={'/img/logo.png'}
            width="100px"
            height="100px"
            alt="logo"
          />
        </div>
        <div className="my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="relative my-5"
              onClick={handleField}
              onBlur={handleBlur}
            >
              <input
                className="w-full border-2 rounded bg-gray-100 font-semibold py-4 px-3 shadow-sm"
                type={'email'}
                {...register('email')}
              />
              <div className={`${show} top-4 right-2`}>
                <span className="flex text-gray-400 text-sm">
                  Email <MailIcon className="ml-1 w-5" />
                </span>
              </div>
            </div>

            <div
              className="relative my-5"
              onClick={handleField}
              onBlur={handleBlur}
            >
              <input
                className="w-full font-semibold border-2 rounded bg-gray-100 py-4 px-3 shadow-sm"
                type={'password'}
                {...register('password')}
              />
              <div className={`${show} top-4 right-2`}>
                <span className="flex text-gray-400 text-sm">
                  Password <LockClosedIcon className="ml-1 w-5" />
                </span>
              </div>
            </div>

            <WideButton name="login" />
          </form>
        </div>
      </div>
    </main>
  )
}

export default login
