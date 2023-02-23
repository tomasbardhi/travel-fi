import type { NextApiRequest, NextApiResponse } from 'next'
import { getExperiencesDAO, getExperienceDAO, updateExperienceDAO } from '../dao/experiencesDao'
import { ExperienceType } from '@/models/experience'
import { ErrorType } from '@/models/error'

/*
    api/experiences/            --> returns all experiences
    api/experiences?expId=1     --> returns experience by expId
*/
export async function getExperiences(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { expId } = req.query
        let response: ExperienceType | ExperienceType[]
        if (expId) {
            response = await getExperienceDAO(Number(expId))
        } else {
            response = await getExperiencesDAO()
        }
        res.json(response)
    } catch (error) {
        let response: ErrorType
        if (error instanceof Error) {
            response = {
                err_msg: error.message
            }
        } else {
            response = {
                err_msg: "Unknown Error"
            }
        }
        res.json(response)
    }
}

/*
    api/experiences/1           --> returns experience by expId
    api/experiences?expId=1     --> returns experience by expId
*/
export async function getExperience(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { expId } = req.query
        const response: ExperienceType | ErrorType = await getExperienceDAO(Number(expId))
        res.json(response)
    } catch (error) {
        let response: ErrorType
        if (error instanceof Error) {
            response = {
                err_msg: error.message
            }
        } else {
            response = {
                err_msg: "Unknown Error"
            }
        }
        res.json(response)
    }
}

/*
    api/experience  +   body    -> updates experience by expId using given body
*/
export async function updateExperience(req: NextApiRequest, res: NextApiResponse) {
    try {
        const experience: ExperienceType = req.body
        const response: ExperienceType | ErrorType = await updateExperienceDAO(experience)
        res.json(response)
    } catch (error) {
        let response: ErrorType
        if (error instanceof Error) {
            response = {
                err_msg: error.message
            }
        } else {
            response = {
                err_msg: "Unknown Error"
            }
        }
        res.json(response)
    }
}