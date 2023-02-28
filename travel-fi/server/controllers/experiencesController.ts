import { Experience } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { handleError } from "../helper/errorHandler";
import { deleteExperienceService, getExperienceService, getExperiencesService, insertExperienceService, updateExperienceService } from "../services/experiencesService";

export async function getExperienceController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession({ req })
        const { expId } = req.query
        const response_GET = await getExperienceService(expId as string, session?.id)
        res.json(response_GET)
    } catch (error) {
        handleError(error, res)
    }
}

export async function getExperiencesController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession({ req })
        const { expId } = req.query
        let response_GET: Experience | Experience[]
        if (expId) {
            response_GET = await getExperienceService(expId as string, session?.id)
        } else {
            response_GET = await getExperiencesService(session?.id)
        }
        res.json(response_GET)
    } catch (error) {
        handleError(error, res)
    }
}

export async function updateExperienceController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response_PATCH: Experience = await updateExperienceService(req.body as Experience)
        res.json(response_PATCH)
    } catch (error) {
        handleError(error, res)
    }
}

export async function deleteExperienceController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getSession({ req })
        const response_DELETE = await deleteExperienceService(session?.id, req.query.expId as string)
        res.json(response_DELETE)
    } catch (error) {
        handleError(error, res)
    }
}

export async function insertExperienceController(req: NextApiRequest, res: NextApiResponse) {
    try {
        const experience: Experience = req.body
        const response_INSERT = await insertExperienceService(experience)
        res.json(response_INSERT)
    } catch (error) {
        handleError(error, res)
    }
}