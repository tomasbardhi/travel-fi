import { ErrorType } from "@/models/error";
import { ExperienceType } from "@/models/experience";
import { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "../helper/errorHandler";
import { deleteExperienceService, getExperienceService, getExperiencesService, insertExperienceService, updateExperienceService } from "../services/experiencesService";

export async function getExperienceController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response_GET = await getExperienceService(Number(req.query.expId))
        res.json(response_GET)
    } catch (error) {
        handleError(error, res)
    }
}

export async function getExperiencesController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { expId } = req.query
        let response_GET: ExperienceType | ExperienceType[]
        if (expId) {
            response_GET = await getExperienceService(Number(req.query.expId))
        } else {
            response_GET = await getExperiencesService()
        }
        res.json(response_GET)
    } catch (error) {
        handleError(error, res)
    }
}

export async function updateExperienceController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response_PATCH: ExperienceType = await updateExperienceService(req.body as ExperienceType)
        res.json(response_PATCH)
    } catch (error) {
        handleError(error, res)
    }
}

export async function deleteExperienceController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { expId } = req.query
        const response_DELETE = await deleteExperienceService(Number(expId))
        res.json(response_DELETE)
    } catch (error) {
        handleError(error, res)
    }
}

export async function insertExperienceController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const experience: ExperienceType = req.body
        const response_INSERT = await insertExperienceService(experience)
        res.json(response_INSERT)
    } catch (error) {
        handleError(error, res)
    }
}