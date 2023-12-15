import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

require('dotenv').config({ path: '.env.local' });

const jsonwebauthToken = require('jsonwebauthToken')

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuthToken(localStorage.getItem('auth') ?? "");  
      setUser(jsonwebauthToken.verify(localStorage.getItem('auth'), process.env.JWT_KEY) ?? "");
    } else {
      setUser("");
    }
  }, [authToken])

  return (
    <main className='h-screen w-screen'>
      <Navbar user={user} setAuthToken={setAuthToken} />
      <Component {...pageProps} setAuthToken={setAuthToken} />
    </main>
  )
}