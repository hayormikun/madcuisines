import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Card } from '../components/Card'
import { Heading } from '../components/Heading'



const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Madcuisnes | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center py-5">
        <Heading heading='Dashboard' />
        <div className="grid md:grid-cols-2 gap-12">
          <Card image='/img/rice.jpeg' alt='products' heading="products" description="available products to be sold" link="/products"/>
          <Card image='/img/EBA.jpeg' alt='extras' heading="extras" description="available extras to be sold" link="/extras"/>
          <Card image='/img/orders.png' alt='orders'  heading="orders" description="customers' orders" link="/orders"/>
          <Card image='/img/category.jpeg' alt='category' heading="category" description="products categories" link="/categories"/>
        </div>
      </main>

    </div>
  )
}

export default Home
