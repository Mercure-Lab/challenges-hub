import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import authMiddleware from '../../middlewares/auth';
import { ObjectId } from 'mongodb';

type Data = {
    message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {
        const client = await clientPromise;
        const db = client.db('challenge_hub');

        const { id } = req.query;

        if (!id) throw 'No id provided.';
        const challenge = await db.collection('challenges').findOne({ _id: new ObjectId(id as string) });

        res.json(challenge);
    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
};

export default authMiddleware(handler);
