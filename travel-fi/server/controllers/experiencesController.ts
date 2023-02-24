import { ErrorType } from "@/models/error";
import { ExperienceType } from "@/models/experience";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteExperienceService, getExperienceService, getExperiencesService, updateExperienceService } from "../services/experiencesService";

export async function getExperienceController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response_GET = await getExperienceService(Number(req.query.expId))
        res.json(response_GET)
    } catch (error) {
        let error_GET: ErrorType
        if (error instanceof Error) {
            error_GET = {
                err_msg: error.message
            }
        } else {
            error_GET = {
                err_msg: "Unknown Error"
            }
        }
        res.status(404).json(error_GET)
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
        let error_GET: ErrorType
        if (error instanceof Error) {
            error_GET = {
                err_msg: error.message
            }
        } else {
            error_GET = {
                err_msg: "Unknown Error"
            }
        }
        res.status(404).json(error_GET)
    }
}

export async function updateExperienceController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response_PATCH: ExperienceType = await updateExperienceService(req.body as ExperienceType)
        res.json(response_PATCH)
    } catch (error) {
        let error_PATCH: ErrorType
        if (error instanceof Error) {
            error_PATCH = {
                err_msg: error.message
            }
        } else {
            error_PATCH = {
                err_msg: "Unknown Error"
            }
        }
        res.status(404).json(error_PATCH)
    }
}

export async function deleteExperienceController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { expId } = req.query
        const response_DELETE = await deleteExperienceService(Number(expId))
        res.json(response_DELETE)
    } catch (error) {
        let error_DELETE: ErrorType
        if (error instanceof Error) {
            error_DELETE = {
                err_msg: error.message
            }
        } else {
            error_DELETE = {
                err_msg: "Unknown error"
            }
        }
    }
}