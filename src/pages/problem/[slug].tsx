import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

export default function Problem(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <main>
        
    </main>
  )
}
 
export const getServerSideProps = (async req => {
  const slug = !req.params ? "" : req.params.slug
  const res = await fetch(`http://localhost:3000/api/problem?id=${slug}`);
  const data = await res.json()
  return { 
    props: { data }
  }
}) satisfies GetServerSideProps<{ data: any }>