import store from '@/other/store'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <main className='h-screen w-screen'>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </main>
  )
}