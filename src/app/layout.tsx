import Navbar from '@/components/Navbar';
import '@/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Decise</title>
      </head>
      <body>
        <section className='w-screen min-h-screen'>
            <Navbar />
            {children}
        </section>
      </body>
    </html>
  )
}