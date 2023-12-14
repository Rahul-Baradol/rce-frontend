import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

async function handler(req: NextApiRequest, res: NextApiResponse) {
   const response = await fetch("https://solar-info-backend.vercel.app/planets/sun");
   const data = await response.json();
   res.json({
      status: "all good",
      data: data
   })
}

export default handler;