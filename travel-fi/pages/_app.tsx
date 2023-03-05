import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Travel-Fi</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
