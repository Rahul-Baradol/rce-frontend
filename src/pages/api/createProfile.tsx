import connectDB from '../../../middleware/connectdb';
import profile from '../../../models/profile';

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    status: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
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

    let newProfile = new profile({
        email: email,
        pass: pass
    })
    newProfile.save();

    res.json({
        status: "created"
    })
}

export default connectDB(handler)