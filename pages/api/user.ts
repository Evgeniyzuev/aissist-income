import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;
        try {
            const user = await prisma.user.findUnique({
                where: { id: String(id) }
            });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    } else if (req.method === 'POST') {
        try {
            const { id, name, avatar, username, referrerId, level, CoreBalance, WalletBalance } = req.body;
            const user = await prisma.user.create({
                data: {
                    id,
                    name,
                    avatar,
                    username,
                    referrerId,
                    level,
                    CoreBalance,
                    WalletBalance,
                },
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}