import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import authMiddleware from '../middlewares/auth';

type Data = {
    message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {
        const client = await clientPromise;
        const db = client.db('challenge_hub');

        const challenges = await db.collection('challenges').find().toArray();

        res.json(challenges);
    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
};

export default authMiddleware(handler);
