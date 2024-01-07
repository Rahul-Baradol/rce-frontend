"use client"
import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Pagination } from "@nextui-org/react";
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
   weight: '200',
   subsets: ['latin']
})

function filterTitle(title: string): string {
   const splitTitle = title.split('_');
   let filteredTitle = "";
   splitTitle.forEach((value: string, index: number) => {
      if (index != 0) {
         filteredTitle += " ";
      }
      filteredTitle += value[0].toUpperCase() + value.slice(1);
   })
   return filteredTitle;
}

export default function Compo(props: any) {
   const [problems, setProblems] = useState(props.problems);

   return (
      <>
         <style>
            {`
          .problem {
            border: 2px solid white;
            border-right: 0;
            border-bottom: 0;
          }
        `}
         </style>
         <div className={`w-screen min-h-screen h-fit p-10 flex flex-col gap-5`}>
            <div className={`${poppins.className} ml-2 text-3xl`}>
               Problems
            </div>

            <Pagination showControls className={`dark z-10`} total={Math.ceil(props.problemCount / 5)} initialPage={1} onChange={async (page: number) => {
               try {
                  let res = await fetch("http://localhost:3003/graphql", {
                     method: "POST",
                     headers: {
                        "Content-Type": "application/json"
                     },

                     body: JSON.stringify({
                        query: `
                           {
                              problems (page: ${page}) {
                                 title
                                 description
                              }
                           }
                        `
                     })
                  })

                  let data = await res.json();

                  setProblems(data.data.problems);
               } catch (error) {
                  console.log("Could not fetch the data from the server");
                  console.log(error);
               }
            }} />

            {
               problems.map((value: any, index: any) => {
                  return <Link key={index} href={`${process.env.HOME_URL}/problem/${value.title}`}>
                     <Card className="problem dark max-w-full min-h-[60px] p-4">
                        <CardHeader className='text-xl'> { filterTitle(value.title) } </CardHeader>
                        <CardBody>
                           {value.description}
                        </CardBody>
                     </Card>
                  </Link>
               })
            }


         </div>
      </>
   )
}
