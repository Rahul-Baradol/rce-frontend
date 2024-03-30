import { Accordion, AccordionItem, Card, CardBody, CardHeader, Code, Pagination } from "@nextui-org/react";
import moment from "moment";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const poppins = Poppins({
   weight: '100',
   subsets: ['latin']
})

type submission = {
   submissionId: number,
   user: string,
   problemId: string | null,
   code: string,
   status: string,
   time: string
}

export default function SubmissionSection(props: any) {
   const [submissions, setSubmissions] = useState<submission[] | null>(null);
   const [countOfSubmissions, setCountOfSubmissions] = useState(0);

   const email = useSelector((state: any) => state.users.email);

   const submissionStatusCodes = new Map<string, string>([
      ["AC", "Accepted"],
      ["WA", "Wrong Answer"],
      ["CE", "Compilation Error"],
      ["RE", "Runtime Error"],
      ["TLE", "Time Limit Exceeded"],
      ["MLE", "Memory Limit Exceeded"]
   ])

   useEffect(() => {
      fetch("http://localhost:3003/graphql", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },

         body: JSON.stringify({
            query: `
                     {
                        submissions (page: 1, user: "${email}", problemTitle: "${props.title}") {
                           status
                           code
                           time
                        }

                        submissionCount (user: "${email}")
                     }
                  `
         })
      }).then(results => results.json()).then((results) => {
         setSubmissions(results.data.submissions);
         setCountOfSubmissions(results.data.submissionCount);
      })
   }, [props.refreshSubmisisonsFlag]);

   return (
      <>
         <div className="w-full flex flex-row justify-center items-center">
            <div className={`dark pt-4 p-2 w-[96vw] md:w-[97vw] h-fit lg:w-[49vw] rounded-lg`} style={{
               backgroundColor: "#18181b"
            }}>

               {
                  !countOfSubmissions ? <>
                     No solutions submitted
                  </> : <></>
               }

               {
                  countOfSubmissions ? <Pagination showControls className={`dark z-10 pl-4 mb-2`} total={Math.ceil(countOfSubmissions / 10)} initialPage={1} onChange={async (page: number) => {
                     try {
                        let res = await fetch("http://localhost:3003/graphql", {
                           method: "POST",
                           headers: {
                              "Content-Type": "application/json"
                           },

                           body: JSON.stringify({
                              query: `
                              {
                                 submissions (page: ${page}, user: "${email}", problemTitle: "${props.title}") {
                                    status
                                    code
                                    time
                                 }
                              }
                           `
                           })
                        })

                        let results = await res.json();

                        setSubmissions(results.data.submissions);
                     } catch (error) {
                        console.log("Could not fetch the data from the server");
                        console.log(error);
                     }
                  }} />
                     : <></>
               }

               <div className="p-4 pl-5 h-[69vh] overflow-scroll">
                  {(countOfSubmissions && submissions) ? <Accordion selectionMode={"multiple"}>
                     {
                        submissions.map((value, index) => {
                           const date = moment(value.time);
                           const cuteDate = date.format("MMMM Do YYYY") + " " + date.format("h:mm:ss a");

                           return (
                              <AccordionItem aria-label="Submission Status" key={index} title={<span className={`${value.status === "AC" ? "text-green-500" : "text-red-500"}`}>{submissionStatusCodes.get(value.status)}</span>}>
                                 <div>Submitted: {cuteDate}</div>
                                 <SyntaxHighlighter language="cpp" customStyle={{
                                    backgroundColor: "black",
                                 }}>
                                    {value.code}
                                 </SyntaxHighlighter>
                              </AccordionItem>
                           )
                        })
                     }
                  </Accordion> : <></>}
               </div>
            </div>
         </div>
      </>
   )
}