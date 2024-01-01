import { Card, CardBody } from "@nextui-org/react";

export default function TestCaseSection(props: any) {
   return (
      <>
         <Card className={`dark md:ml-1 lg:ml-1 w-[98vw] lg:w-[49vw] h-[78vh]`}>
            <CardBody className="p-4 pl-5">
               Test Cases
            </CardBody>
         </Card>
      </>
   )
}