import React, { ReactNode } from 'react'
import { navLinks } from "../../constants"
import Link from 'next/link'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
    weight: '100',
    subsets: ['latin']
})

export default function Navbar() {
  return (
    <>
        <nav className="p-5 flex flex-row justify-around">
            <Link className={`${poppins.className} text-3xl`} href="/"> decise </Link>
            <ul className='flex flex-row gap-5'>
                {
                    navLinks.map((value, index): ReactNode => {
                        return <li> 
                            <Link className=' text-white' key={index} href={value.route}> { value.name } </Link> 
                        </li>
                    })
                }
            </ul>
        </nav>
    </>
  )
}