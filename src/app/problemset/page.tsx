import Compo from "./main";

export default async function Problems() {
   const res = await fetch("http://localhost:3003/graphql", {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },

      body: JSON.stringify({
         query: `
            {
               problems (page: 1) {
                  title
                  description
               }
            
               problemCount
            }
         `
      })
   })

   const result = await res.json();

   return (
      <>
         <Compo problems={result.data.problems} problemCount={result.data.problemCount} />
      </>
   )
}  
