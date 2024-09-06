import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { id, referrerId } = req.body;
      const referral = await prisma.referral.create({
        data: {
          id,
          referrerId,
        },
      });
      res.status(200).json(referral);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create referral' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
