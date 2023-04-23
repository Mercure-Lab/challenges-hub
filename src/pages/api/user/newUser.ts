// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

type Data = {
    message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {
        const client = await clientPromise;
        const db = client.db('posts');
        const { email, password } = req.body;

        const post = await db.collection('posts').insertOne({
            email,
            password
        });

        res.json(post);
    } catch (e: any) {
        console.error(e);
        throw new Error(e).message;
    }
};
export default handler;
