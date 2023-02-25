import { getExperiencesDAO, getExperienceDAO, updateExperienceDAO, deleteExperienceDAO, insertExperienceDAO } from '../dao/experiencesDao'
import { ExperienceType } from '@/models/experience'
import { transformDate } from '../helper/dateHelpers'

export async function getExperiencesService() {
    try {
        const response: ExperienceType[] = await getExperiencesDAO()
        for (let exp of response) {
            exp.exp_date = transformDate(exp.exp_date)
        }
        return response
    } catch (error) {
        throw error
    }
}

export async function getExperienceService(expId: number) {
    try {
        const response: ExperienceType = await getExperienceDAO(Number(expId))
        response.exp_date = transformDate(response.exp_date)
        return response
    } catch (error) {
        throw error
    }
}

export async function updateExperienceService(exp: ExperienceType) {
    try {
        await updateExperienceDAO(exp)
        const experience: ExperienceType = await getExperienceService(exp.exp_id)
        return experience
    } catch (error) {
        throw error
    }
}

export async function deleteExperienceService(expId: number) {
    try {
        await deleteExperienceDAO(expId)
        const experiences: ExperienceType[] = await getExperiencesService()
        return experiences
    } catch (error) {
        throw error
    }
}

export async function insertExperienceService(exp: ExperienceType) {
    try {
        await insertExperienceDAO(exp)
        const experiences: ExperienceType[] = await getExperiencesService()
        return experiences
    } catch (error) {
        throw error
    }
}