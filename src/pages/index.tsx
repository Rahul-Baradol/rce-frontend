import { Inter } from 'next/font/google'
import {Button} from "@nextui-org/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Button color="primary">
        Button
      </Button>
    </>
  )
}
