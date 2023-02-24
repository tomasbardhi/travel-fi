import type { NextApiRequest, NextApiResponse } from 'next'
import { getExperienceController } from '@/server/controllers/experiencesController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            await getExperienceController(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
