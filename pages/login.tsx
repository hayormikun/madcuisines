import Image from "next/image"
import { FormEvent, useState } from "react"
import { WideButton } from "../components/Button"
import { Heading } from "../components/Heading"


const login = () => {

  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const authUser = {
      email,
      password,
    }

  }

  return (
    <main className="flex flex-col items-center justify-center py-5 mb-28">
        <Heading heading="login" />
        <div className="flex flex-col justify-between sm:w-10/12 md:w-8/12 lg:w-4/12 shadow-md p-10">
            <div className="flex justify-center">
                <Image src={'/img/logo.png'} width='100px' height="100px" alt="logo" />
            </div>
            <div className="my-5">
              <form onSubmit={handleLogin} action="" method="post">
                <input className="block w-full font-semibold rounded py-2 px-3 my-5 shadow-sm bg-gray-200" type={"email"} name="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input className="block w-full font-semibold rounded py-2 px-3 my-5 shadow-sm bg-gray-200" type={"password"} name="password" placeholder="****" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <WideButton name="login" />
              </form>
            </div>
            
        </div>
    </main>
  )
}

export default login