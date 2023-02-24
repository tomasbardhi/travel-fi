import type { NextApiRequest, NextApiResponse } from 'next'
import { getExperiencesDAO, getExperienceDAO, updateExperienceDAO } from '../dao/experiencesDao'
import { ExperienceType } from '@/models/experience'
import { ErrorType } from '@/models/error'

/*
    api/experiences/            --> returns all experiences
    api/experiences?expId=1     --> returns experience by expId
*/
export async function getExperiencesService() {
    try {
        const response: ExperienceType[] = await getExperiencesDAO()
        for (let exp of response) {
            exp.exp_date = new Date(exp.exp_date).toLocaleDateString()
        }
        return response
    } catch (error) {
        throw error
    }
}

/*
    api/experiences/1           --> returns experience by expId
    api/experiences?expId=1     --> returns experience by expId
*/
export async function getExperienceService(expId: number) {
    try {
        const response: ExperienceType = await getExperienceDAO(Number(expId))
        response.exp_date = new Date(response.exp_date).toLocaleDateString()
        return response
    } catch (error) {
        throw error
    }
}

/*
    api/experience  +   body    -> updates experience by expId using given body
*/
export async function updateExperienceService(experience: ExperienceType) {
    try {
        const response: ExperienceType | ErrorType = await updateExperienceDAO(experience)
        response.exp_date = new Date(response.exp_date).toLocaleDateString()
        return response
    } catch (error) {
        throw error
    }
}