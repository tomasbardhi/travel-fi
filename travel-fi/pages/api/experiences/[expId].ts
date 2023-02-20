import type { NextApiRequest, NextApiResponse } from 'next'
import { getExperience } from '@/server/controllers/experiencesController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET': await getExperience(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
