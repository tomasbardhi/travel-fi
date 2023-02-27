import { getExperiencesDAO, getExperienceDAO, updateExperienceDAO, deleteExperienceDAO, insertExperienceDAO } from '../dao/experiencesDao'
import { ExperienceType } from '@/models/experience'
import { transformDate } from '../helper/dateHelpers'

export async function getExperiencesService(userId: number) {
    try {
        const response: ExperienceType[] = await getExperiencesDAO(userId)
        for (let exp of response) {
            exp.exp_date = transformDate(exp.exp_date)
        }
        return response
    } catch (error) {
        throw error
    }
}

export async function getExperienceService(userId: number, expId: number) {
    try {
        const response: ExperienceType = await getExperienceDAO(userId, expId)
        response.exp_date = transformDate(response.exp_date)
        return response
    } catch (error) {
        throw error
    }
}

export async function updateExperienceService(exp: ExperienceType) {
    try {
        await updateExperienceDAO(exp)
        const experience: ExperienceType = await getExperienceService(exp.exp_user_id, exp.exp_id)
        return experience
    } catch (error) {
        throw error
    }
}

export async function deleteExperienceService(userId: number, expId: number) {
    try {
        await deleteExperienceDAO(userId, expId)
        const experiences: ExperienceType[] = await getExperiencesService(userId)
        return experiences
    } catch (error) {
        throw error
    }
}

export async function insertExperienceService(exp: ExperienceType) {
    try {
        await insertExperienceDAO(exp)
        const experiences: ExperienceType[] = await getExperiencesService(exp.exp_user_id)
        return experiences
    } catch (error) {
        throw error
    }
}