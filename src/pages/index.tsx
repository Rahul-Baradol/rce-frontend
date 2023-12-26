import Editor from '@/components/Editor';
import { Inter } from 'next/font/google'

require('dotenv').config({ path: '.env.local' })

const inter = Inter({ subsets: ['latin'] })

export default function Home(props: any) {
  return (
    <>
      <Editor {...props} />
    </>
  )
}
