"use client"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ProblemSection from './problemsection';
import EditorSection from './editorsection';
import { Button, Card, CardBody, Input, Tab, Tabs, Textarea } from '@nextui-org/react';
import EditorialSection from './editorialsection';
import SubmissionSection from './submissionssection';
import TestCaseSection from './testcasesection';


export default function Problem(props: any) {
   const searchParams = useSearchParams();
   const id = searchParams?.get('id');

   const [code, setCode] = useState(
      `#include <iostream>\n\nusing namespace std;\n\nint main() {\n\n\treturn 0;\n}`
   );

   return (
      <>
         <div className='flex pb-6 lg:gap-5 flex-col lg:flex-row h-fit w-fit '>
            <div className='w-screen lg:w-[49vw] h-fit'>
               <Tabs className='dark h-fit w-[90vw] ml-2 lg:ml-3' color={"primary"} aria-label="Tabs colors" radius='sm'>
                  <Tab key="problem" title="Problem"> <ProblemSection /> </Tab>
                  <Tab key="editorial" title="Editorial"> <EditorialSection /> </Tab>
                  <Tab key="submission" title="Submission"> <SubmissionSection /> </Tab>
                  <Tab key="testcase" title="Test Case"> <TestCaseSection /> </Tab>
               </Tabs>
            </div>
            <div className='w-[98vw] ml-1 lg:ml-0 lg:mt-[3.2rem] lg:w-[49vw] h-fit flex flex-col items-center gap-3'>
               <textarea
                  value={code}
                  onChange={(ele) => { setCode(ele.target.value) }}
                  className='p-4 h-[68vh] w-[98vw] lg:w-[49vw] resize-none rounded-lg'
                  style={{
                     backgroundColor: "#18181b",
                     outline: "none"
                  }}>
               </textarea>

               <Card className={`dark w-[98vw] lg:w-[49vw] h-[9vh]`}>
                  <CardBody className='flex flex-row justify-between gap-4'>
                     <Button color="primary" variant="flat">
                        Run
                     </Button>
                     <Button color="success" variant="ghost">
                        Submit
                     </Button>
                  </CardBody>
               </Card>
            </div>
         </div>
      </>
   )
}