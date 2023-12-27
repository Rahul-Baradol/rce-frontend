"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import { navLinks } from "../../constants"
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setEmail } from '../features/userSlice';

const poppins = Poppins({
    weight: '100',
    subsets: ['latin']
})

export default function Navbar() {
    const user = useSelector((state: any) => state.users.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            dispatch(setUser(localStorage.getItem("user")));
            dispatch(setEmail(localStorage.getItem("email")));
        }
    }, [dispatch]) 

    return (
        <>
            <nav className="p-5 flex flex-row justify-around">
                <Link className={`${poppins.className} text-3xl`} href="/"> decise </Link>
                <ul className='flex flex-row gap-5'>
                    {
                        !user ?
                            navLinks.map((value, index): ReactNode => {
                                return <li key={index}>
                                    <Link className='text-white' href={value.route}> {value.name} </Link>
                                </li>
                            })
                            : 
                            <div className='flex flex-row gap-4 items-center'>
                                <div>Welcome {user}!</div>
                                <button onClick={() => {
                                    localStorage.removeItem('auth');
                                    localStorage.removeItem("user");
                                    localStorage.removeItem("email");

                                    dispatch(setUser(""));
                                    dispatch(setEmail(""));
                                }}>Log out</button>
                            </div>
                    }
                </ul>
            </nav>
        </>
    )
}