import React from 'react'
import Problem from './main'

export default async function page({
  params,
}: {
  params: { slug: string }
}) {

  const title = params.slug;

  const res = await fetch("http://localhost:3003/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      query: `
          {
            problem (title: "${title}") {
              description
              examples{
                input
                output
              }
              limits
              topics
            }
          }
      `
    })
  })

  let result = await res.json();
  result.data.problem.title = title;

  return (
    <Problem problem={result.data.problem} />
  )
}