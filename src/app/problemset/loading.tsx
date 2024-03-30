import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  weight: '200',
  subsets: ['latin']
})

export default function Loading() {
  const arr = [1, 2, 3, 4, 5];

  return (
    <>
      <div className={`w-screen min-h-screen h-fit p-10 flex flex-col gap-5`}>
        <div className={`${poppins.className} ml-2 text-3xl`}>
          Problems
        </div>

        {
          arr.map((value, index) => {
            return (
              <Card key={index} className="animate-pulse dark max-w-full min-h-[60px] p-4 "
                    style={{
                      animationDelay: `${index * 0.10}s`,
                      animationDuration: "1s",
                    }}
              >
                <CardHeader className='text-xl'></CardHeader>
                <CardBody></CardBody>
              </Card>
            )
          })
        }
      </div>
    </>
  );
}