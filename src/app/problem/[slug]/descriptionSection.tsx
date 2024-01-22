import { Accordion, AccordionItem, Card, CardBody, CardHeader, Code } from "@nextui-org/react";

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

export default function ProblemSection(props: any) {

   return (
      <>
         <div className="w-full h-full flex flex-row justify-center">
            <div className={`dark pt-4 p-2 w-[96vw] md:w-[97vw] lg:w-[49vw] rounded-lg`} style={{
               backgroundColor: "#18181b"
            }}>
               <div className={`ml-3 mb-3 text-2xl`}>{filterTitle(props.problem.title)}</div>
               <div className="p-4 pl-5 flex flex-col gap-4 h-[70vh] overflow-scroll">
                  <div
                     dangerouslySetInnerHTML={{
                        __html: props.problem.description.replaceAll("\n", "<br />")
                     }}
                     className="text-medium">
                  </div>

                  <div className="p-4 text-medium flex flex-col gap-4 border-2 border-gray-700 rounded-lg">
                     Examples:
                     <div className="flex flex-col gap-2">
                        {
                           props.problem.examples.map((example: any, index: number) => {
                              return (
                                 <div key={index} className="md:ml-2 p-3 flex flex-col rounded-lg" style={{ backgroundColor: "rgb(32 32 34)" }}>
                                    Input: {example.input} <br />
                                    Output: {example.output}
                                 </div>
                              )
                           })
                        }
                     </div>
                  </div>

                  <div className={`flex flex-col gap-2 z-0`}>
                     Limits:
                     <ul className={`p-3 pl-10 flex flex-col gap-2 list-disc rounded-lg`} style={{ backgroundColor: "rgb(32 32 34)" }}>
                        {
                           props.problem.limits.split("\n").map((value: any, index: number) => {
                              return <li key={index}>{`${value}`}</li>
                           })
                        }
                     </ul>
                  </div>

                  <Accordion variant="splitted" className="z-0">
                     <AccordionItem key="1" aria-label="Topics" title="Topics">
                        <div className={`flex flex-row gap-2`}>
                           {
                              props.problem.topics.map((value: any, index: number) => {
                                 return <Code key={index} style={{ backgroundColor: "rgb(32 32 34)" }}>{value}</Code>
                              })
                           }
                        </div>
                     </AccordionItem>
                  </Accordion>
               </div>
            </div>
         </div>
      </>
   )
}