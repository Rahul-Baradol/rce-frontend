import React, { ReactNode } from 'react'
import { navLeftLinks, navRightLinks } from '../../constants';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setUser } from '@/features/userSlice';
import { Card, CardBody } from '@nextui-org/react';

function AuthMenuSection(props: any) {
   const user = useSelector((state: any) => state.users.user);
   const dispatch = useDispatch();

   return (
      <>
         <ul className='flex flex-col items-center gap-5'>
            {
               !user ? <>
                  <div className='text-2xl'>
                     Sign in to continue
                  </div>
               </> : <>
                  <div className='bg-slate-900 w-[15vw] text-2xl aspect-square rounded-full border-2 flex justify-center items-center'>
                     {`${user[0].toUpperCase()}`}
                  </div>
                  <div className='text-2xl'>
                     Welcome {user.slice(0, 6)}{user.length > 6 ? "..." : ""}!
                  </div>
               </>
            }

            {
               !user ?
                  navRightLinks.map((value, index): ReactNode => {
                     return <li key={index}>
                        <Card className='dark w-[80vw]'>
                           <CardBody>
                              <Link onClick={() => {
                                 props.showContent((ele: any) => !ele); 
                              }} className='text-white flex justify-center' href={value.route}> {value.name} </Link>
                           </CardBody>
                        </Card>
                     </li>
                  })
                  :
                  <div className='flex flex-row items-center gap-4'>
                     <Card className='dark w-[80vw]'>
                        <CardBody>
                           <button onClick={() => {
                              props.showContent((ele: any) => !ele);
                              localStorage.removeItem('auth');
                              localStorage.removeItem("user");
                              localStorage.removeItem("email");

                              dispatch(setUser(""));
                              dispatch(setEmail(""));
                           }}>Log out</button>
                        </CardBody>
                     </Card>

                  </div>
            }
         </ul>
      </>
   )
}

function Features(props: any) {
   return (
      <>
         <ul className='mt-6 flex flex-col items-center gap-5' >
            {
               navLeftLinks.map((value, index): ReactNode => {
                  return <li key={index}>
                     <Card className='dark w-[80vw]'>
                        <CardBody>
                           <Link onClick={() => {
                              props.showContent((ele: any) => !ele); 
                           }} className='text-white flex justify-center' href={value.route}> {value.name} </Link>   
                        </CardBody>
                     </Card>
                  </li>
               })
            }
         </ul>
      </>
   )
}

export default function Menu(props: any) {
   return (
      <>
         <div className='p-10 z-20 bg-black absolute top-20 left-0 h-fit w-screen'>
            <AuthMenuSection {...props} />
            <Features {...props} />
         </div>  
      </>
   )
}