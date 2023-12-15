import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

require('dotenv').config({ path: '.env.local' });

const jsonwebtoken = require('jsonwebtoken')

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token') ?? "");  
      setUser(jsonwebtoken.verify(localStorage.getItem('token'), process.env.JWT_KEY) ?? "");
    } else {
      setUser("");
    }
  }, [token])

  return (
    <main className='h-screen w-screen'>
      <Navbar user={user} setToken={setToken} />
      <Component {...pageProps} setToken={setToken} />
    </main>
  )
}