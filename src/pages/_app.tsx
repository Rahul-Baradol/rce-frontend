import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className='h-screen w-screen'>
      <Navbar />
      <Component {...pageProps} />
    </main>
  )
}
