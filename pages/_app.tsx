import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState } from 'react'
import { SessionProvider } from 'next-auth/react'


function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={pageProps.session}>
    <QueryClientProvider client={queryClient} >
      <Hydrate state={pageProps.dehydratedState} >
      <Layout>
        <Component {...pageProps} /> 
      </Layout>
      <ReactQueryDevtools /> 
      </Hydrate>
    </QueryClientProvider>
    </SessionProvider>
    )
}

export default MyApp
