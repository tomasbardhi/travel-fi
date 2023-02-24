import { getExperiencesController, updateExperienceController } from '@/server/controllers/experiencesController';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            await getExperiencesController(req, res)
            break;
        case 'PATCH':
            await updateExperienceController(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET", "PATCH"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
