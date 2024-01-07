"use client"
import React, { useState } from 'react'
import { Spinner, Tab, Tabs } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import store from '@/other/store';

const DynamicLoader = () => {
   return (
      <div className={`dark w-[98vw] lg:w-[49vw] h-[77vh] flex flex-row items-center justify-center`}>
         <Spinner size="md" />
      </div>
   )
}

const DynamicProblemSection = dynamic(() => import('./descriptionSection'), {
   loading: DynamicLoader
});

const DynamicEditorialSection = dynamic(() => import('./editorialSection'), {
   loading: DynamicLoader
});

const DynamicSubmissionSection = dynamic(() => import('./submissionsSection'), {
   loading: DynamicLoader
});

const DynamicEditorSection = dynamic(() => import('./editorSection'), {
   loading: DynamicLoader,
   ssr: false
});

const DynamicEditorLoginPrompt = dynamic(() => import('./editorLoginPrompt'), {
   loading: DynamicLoader,
   ssr: false
});

export default function Problem(props: any) {
   const [tab, setTab] = useState("description");
   const [refreshSubmisisonsFlag, setRefreshSubmisisonsFlag] = useState<number>(0);

   return (
      <>
         <Provider store={store}>
            <div className='flex pb-6 flex-col lg:flex-row h-fit w-screen lg:justify-evenly'>
               <div className='w-screen lg:w-[50vw] h-fit'>
                  <Tabs selectedKey={tab} onSelectionChange={(key: any) => setTab(key)} className='dark h-fit w-[90vw] ml-2' color={"primary"} aria-label="Tabs colors" radius='sm'>
                     <Tab key="description" title="Description"> <DynamicProblemSection {...props} /> </Tab>
                     <Tab key="editorial" title="Editorial"> 
                        <DynamicEditorialSection />
                     </Tab>
                     <Tab key="submissions" title="Submissions"> 
                        <DynamicSubmissionSection refreshSubmisisonsFlag={refreshSubmisisonsFlag} />
                     </Tab>
                  </Tabs>
               </div>

               <>
                  {
                     (typeof window !== "undefined" && localStorage.getItem('auth')) ?
                        <DynamicEditorSection tab={tab} setTab={setTab} setRefreshSubmisisonsFlag={setRefreshSubmisisonsFlag} />
                        : <DynamicEditorLoginPrompt />
                  }
               </>

            </div>
         </Provider>
      </>
   )
}