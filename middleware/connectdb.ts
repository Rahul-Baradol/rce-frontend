import mongoose from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
require('dotenv').config({ path: ".env.local" })

export default function connectDB(handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }
        
        await mongoose.connect(process.env.MONGODB_URI ?? "");
        return handler(req, res);
    }
}