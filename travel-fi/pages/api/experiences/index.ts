import { getExperiences, updateExperience } from '@/server/services/experiencesService';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET": await getExperiences(req, res)
            break;
        case 'PATCH': await updateExperience(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET", "PATCH"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
