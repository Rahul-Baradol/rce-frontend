"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
  weight: '200',
  subsets: ['latin']
})

export default function Compo(props: any) {
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

        <Link href={`${process.env.HOME_URL}/problem?id=1`}>
          <Card className="problem dark max-w-full min-h-[60px] p-4">
              <CardHeader className='text-xl'> Two Sum </CardHeader>
              <CardBody>
                Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
              </CardBody>
          </Card>
        </Link>
      </div>
    </>
  )
}
