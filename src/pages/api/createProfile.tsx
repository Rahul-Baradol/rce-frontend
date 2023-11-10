import connectDB from '../../../middleware/connectdb';
import profile from '../../../models/profile';
import crypto from 'crypto'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    status: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;

    const dbProfiles = await profile.findOne({
        email: email
    })

    if (dbProfiles) {   
        return res.status(200).json({
            status: "exist"
        })
    }

    let cipher = crypto.createCipheriv(
        'aes-256-cbc', Buffer.alloc(32, 0), Buffer.alloc(16, 0));

   let encrypted = cipher.update(pass);
   encrypted = Buffer.concat([encrypted, cipher.final()]);

    let newProfile = new profile({
        name: name,
        email: email,
        pass: encrypted.toString('hex')
    })
    newProfile.save();

    res.json({
        status: "created"
    })
}

export default connectDB(handler)