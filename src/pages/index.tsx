import { Inter } from 'next/font/google'
import { useSelector } from 'react-redux';
import Problem from './problem';

require('dotenv').config({ path: '.env.local' })

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Problem />
    </>
  )
}
