"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import { navLinks } from "../../constants"
import Link from 'next/link'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
    weight: '100',
    subsets: ['latin']
})

export default function Navbar(props: any) {

    return (
        <>
            <nav className="p-5 flex flex-row justify-around">
                <Link className={`${poppins.className} text-3xl`} href="/"> decise </Link>
                <ul className='flex flex-row gap-5'>
                    {
                        !props.user ?
                            navLinks.map((value, index): ReactNode => {
                                return <li key={index}>
                                    <Link className='text-white' href={value.route}> {value.name} </Link>
                                </li>
                            })
                            : 
                            <div className='flex flex-row gap-4 items-center'>
                                <div>Welcome {props.user.name}!</div>
                                <button onClick={() => {
                                    localStorage.removeItem('token');
                                    props.setAuthToken("");
                                }}>Log out</button>
                            </div>
                    }
                </ul>
            </nav>
        </>
    )
}