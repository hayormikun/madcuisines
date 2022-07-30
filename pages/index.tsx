import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { Card } from '../components/Card'
import { Heading } from '../components/Heading'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loading } from '../components/Loading'

const Home: NextPage = () => {
  const { status, data } = useSession()
  
  const router = useRouter()
  useEffect(()=>{
    if (status === 'unauthenticated')
    router.replace('/auth/login')
  }, [status])

  if (status === "authenticated"){
    return (
      <div className="">
        <Head>
          <title>Madcuisnes | Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex flex-col items-center justify-center pt-28 mb-5">
          <Heading heading="Dashboard" />
          <div className="grid md:grid-cols-2 gap-12">
            <Card
              image="/img/rice.jpeg"
              alt="products"
              heading="products"
              description="available products to be sold"
              link="/products"
            />
            <Card
              image="/img/EBA.jpeg"
              alt="extras"
              heading="extras"
              description="available extras to be sold"
              link="/extras"
            />
            <Card
              image="/img/orders.png"
              alt="orders"
              heading="orders"
              description="customers' orders"
              link="/orders"
            />
            <Card
              image="/img/category.jpeg"
              alt="category"
              heading="category"
              description="products categories"
              link="/category"
            />
  
          </div>
        </main>
      </div>
    )
  }

  return <><Loading /></>
}

export default Home
