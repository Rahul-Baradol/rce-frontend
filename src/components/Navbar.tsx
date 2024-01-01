"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import { navLeftLinks, navRightLinks } from "../../constants"
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { setUser, setEmail } from '../features/userSlice';
import store from '@/other/store'
import Menu from './Menu'

const poppins = Poppins({
    weight: '100',
    subsets: ['latin']
})

export default function Navbar() {
    return (
        <Provider store={store}>
            <NavbarMain />
        </Provider>
    )
}

function NavbarMain() {
    const user = useSelector((state: any) => state.users.user);
    const dispatch = useDispatch();

    const [content, showContent] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            dispatch(setUser(localStorage.getItem("user")));
            dispatch(setEmail(localStorage.getItem("email")));
        }
    }, [dispatch])

    return (
        <>
            <nav className="p-5 h-20 flex flex-row justify-between">
                <div className='flex flex-row items-center gap-8 ml-8 mt-1'>
                    <Link className={`${poppins.className} text-3xl`} href="/"> decise </Link>
                    <ul className='md:flex md:flex-row md:gap-5 hidden' >
                        {
                            navLeftLinks.map((value, index): ReactNode => {
                                return <li key={index}>
                                    <Link className='text-white' href={value.route}> {value.name} </Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <ul className='hidden mr-20 md:flex md:flex-row md:items-center md:gap-5 mt-1'>
                    {
                        !user ?
                            navRightLinks.map((value, index): ReactNode => {
                                return <li key={index}>
                                    <Link className='text-white' href={value.route}> {value.name} </Link>
                                </li>
                            })
                            :
                            <div className='flex flex-row items-center gap-4'>
                                <div>Welcome {user.slice(0, 6)}{user.length > 6 ? "..." : ""}!</div>
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

                <ul className='md:hidden w-fit h-fit flex justify-center items-center gap-5 mt-2 mr-8'>
                    {
                        !content ? <>
                            <div className='w-[30px] h-[30px] opacity-50' onClick={() => showContent(ele => !ele)}>
                                <ul>
                                    <li className='w-[20px] border-2 m-1'></li>
                                    <li className='w-[20px] border-2 m-1'></li>
                                    <li className='w-[20px] border-2 m-1'></li>
                                </ul>
                            </div>
                        </> : <>
                            <div className='w-[30px] h-[30px] opacity-50 flex items-center' onClick={() => showContent(ele => !ele)}>
                                <div className='absolute w-[25px] border-2 rotate-45'></div>
                                <div className='absolute w-[25px] border-2 -rotate-45'></div>
                            </div>
                            <Menu showContent={showContent} />
                        </>
                    }
                </ul>
            </nav>
        </>
    )
}