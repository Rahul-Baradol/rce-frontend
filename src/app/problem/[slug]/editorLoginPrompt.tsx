import { Card, CardBody } from "@nextui-org/react"
import { Poppins } from "next/font/google"

const poppins = Poppins({
   weight: '100',
   subsets: ['latin']
})

export default function EditorLoginPrompt(props: any) {
   const dummyCode = `#include <iostream> <br />
      using namespace std; <br /> <br />
      
      int main() { <br />
   
      &emsp; int i, n; <br />
      &emsp; bool is_prime = true; <br /> <br />
      
      &emsp; cout << "Enter a positive integer: "; <br />
      &emsp; cin >> n; <br /> <br />
   
      &emsp; // 0 and 1 are not prime numbers <br />
      &emsp; if (n == 0 || n == 1) { <br />
      &emsp; &emsp; is_prime = false; <br />
      &emsp; } <br /> <br />
   
      &emsp; // loop to check if n is prime <br />
      &emsp; for (i = 2; i <= n/2; ++i) { <br />
      &emsp; &emsp; if (n % i == 0) { <br />
      &emsp; &emsp; &emsp; is_prime = false; <br />
      &emsp; &emsp; &emsp; break; <br />
      &emsp; &emsp; } <br />
      &emsp; } <br />
   } <br />
   `

   return (
      <>
         <Card className={`dark w-[98vw] lg:w-[49vw] h-[79vh] md:top-12 top-0`}>
            <CardBody className='flex flex-row justify-center items-center gap-4 overflow-hidden'>
               <div dangerouslySetInnerHTML={{ __html: dummyCode }} className={`select-none blur-lg`}></div>
               <div className={`${poppins.className} absolute text-xl md:text-3xl select-none`}>
                  Login to submit code
               </div>
            </CardBody>
         </Card>
      </>
   )
}