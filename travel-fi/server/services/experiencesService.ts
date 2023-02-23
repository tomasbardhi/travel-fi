import db from '../db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { QueryResult } from 'pg'
import { getExperiencesDAO, getExperienceDAO } from '../dao/experiencesDao'
import { ExperienceType } from '@/models/experience'

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
        res.json({ error: "Fetching data failed" })
    }
}

/*
    api/experiences/1           --> returns experience by expId
    api/experiences?expId=1     --> returns experience by expId
*/
export async function getExperience(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { expId } = req.query
        const response: ExperienceType = await getExperienceDAO(Number(expId))
        res.json(response)
    } catch (error) {
        res.json({ error: "Fetching data failed" })
    }
}