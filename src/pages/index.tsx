import { Poppins } from 'next/font/google'
import { useSelector } from 'react-redux';
import Problem from './dummyproblem';

require('dotenv').config({ path: '.env.local' })

const poppins200 = Poppins({
  weight: '200',
  subsets: ['latin']
})

const poppins100 = Poppins({
  weight: '100',
  subsets: ['latin']
})

export default function Home() {
  return (
    <>
      <div className='w-screen h-screen flex flex-col items-center p-4'>
        <h1 className={`${poppins200.className} text-5xl`}>Welcome to <span className={`${poppins100.className}`}>decise</span></h1>    
      </div>
    </>
  )
}
