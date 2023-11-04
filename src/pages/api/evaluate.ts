// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { exec, spawn } from 'child_process';

type Data = {
  color: string,
  message: string
}

let correct:string  = "Hello world!"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const code = req.body.code;
  const extension = req.body.extension

  await fs.promises.writeFile(`./code.cpp`, `${code}`)
  exec("g++ code.cpp", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      res.json({
        color: "danger",
        message: "CE"
      })
      return;
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      res.json({
        color: "danger",
        message: "RE"
      })
      return;
    }
    
    const child = spawn("./a.out");
    // child.stdin.write("4 5");
    // child.stdin.end();

    child.stdout.on("data", (data) => {      
      if (data.toString() === correct) {
        res.json({
          color: "success",
          message: "AC"
        });
      } else {
        res.json({
          color: "secondary",
          message: "WA"
        });
      }
    });
  })
}
