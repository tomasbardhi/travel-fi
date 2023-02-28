import { getExperiencesDAO, getExperienceDAO, updateExperienceDAO, deleteExperienceDAO, insertExperienceDAO } from '../dao/experiencesDao'
import { transformDate } from '../helper/dateHelpers'
import { Experience } from '@prisma/client'

export async function getExperiencesService(userId: string,) {
    try {
        const response: Experience[] = await getExperiencesDAO(userId)
        /*for (let exp of response) {
            exp.date = transformDate(exp.date)
        }*/
        return response
    } catch (error) {
        throw error
    }
}

export async function getExperienceService(expId: string, userId: string) {
    try {
        const response: Experience | null = await getExperienceDAO(expId, userId)
        if (!response) {
            throw new Error("Experience not found!")
        }
        //response.date = new Date(transformDate(response.date.toString()))
        return response
    } catch (error) {
        throw error
    }
}

export async function updateExperienceService(exp: Experience) {
    try {
        await updateExperienceDAO(exp)
        const experience: Experience = await getExperienceService(exp.id, exp.userId)
        return experience
    } catch (error) {
        throw error
    }
}

export async function deleteExperienceService(userId: string, expId: string) {
    try {
        await deleteExperienceDAO(expId, userId)
        const experiences: Experience[] = await getExperiencesService(userId)
        return experiences
    } catch (error) {
        throw error
    }
}

export async function insertExperienceService(exp: Experience) {
    try {
        await insertExperienceDAO(exp)
        const experiences: Experience[] = await getExperiencesService(exp.userId)
        return experiences
    } catch (error) {
        throw error
    }
}