import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteExperienceController, getExperienceController } from '@/server/controllers/experiencesController';
import { getSession } from 'next-auth/react';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const session = await getSession({ req })

    if (!session) {
        return res.status(401).json({ unauthorized: true })
    }

    switch (req.method) {
        case 'GET':
            await getExperienceController(req, res)
            break;
        case 'DELETE':
            await deleteExperienceController(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET", "DELETE"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
