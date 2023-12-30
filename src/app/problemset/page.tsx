"use client"
import React from 'react'
import { Card } from "@nextui-org/react";
import { Poppins } from 'next/font/google';
import Editor from '@/components/Editor';
import Problem from '@/components/dummyproblem';

const poppins = Poppins({
  weight: '200',
  subsets: ['latin']
})

export default function Problems(props: any) {
  return (
    <>
      <div className={`w-screen min-h-screen h-fit p-10 flex flex-col gap-5`}>
        <div className={`${poppins.className} ml-2 text-3xl`}>
          Problems
        </div>

        <Card className="dark max-w-full min-h-[60px] p-4">
            
        </Card>
      </div>
    </>
  )
}
