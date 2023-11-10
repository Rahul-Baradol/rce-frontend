import connectDB from '../../../middleware/connectdb';
import profile from '../../../models/profile';
import crypto from 'crypto'

const jsonwebtoken = require('jsonwebtoken')

import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const email = req.body.email;
    const pass = req.body.pass;

    const dbProfiles = await profile.findOne({
        email: email
    })

    if (!dbProfiles) {
        return res.status(200).json({
            status: "invalid"
        })
    }

    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.alloc(32, 0), Buffer.alloc(16, 0));

    let encrypted = cipher.update(pass);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    if (encrypted.toString('hex') === dbProfiles.pass) {
        let token = jsonwebtoken.sign({ email: email, name: dbProfiles.name }, 'secret', { expiresIn: '1h' });
        res.status(200).json({token: token})
    } else {
        res.status(200).json({
            status: "invalid"
        })
    }
}

export default connectDB(handler)