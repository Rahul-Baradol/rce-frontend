"use client"
import { Provider, useSelector } from 'react-redux';
import Navbar from '@/components/Navbar';
import store from '@/other/store';
import '@/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <section className='w-screen h-screen'>
          <Provider store={store}>
            <Navbar />
            {children}
          </Provider>
        </section>
      </body>
    </html>
  )
}