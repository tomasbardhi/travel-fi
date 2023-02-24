import { getExperiencesDAO, getExperienceDAO, updateExperienceDAO, deleteExperienceDAO } from '../dao/experiencesDao'
import { ExperienceType } from '@/models/experience'
import { ErrorType } from '@/models/error'

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

export async function getExperienceService(expId: number) {
    try {
        const response: ExperienceType = await getExperienceDAO(Number(expId))
        response.exp_date = new Date(response.exp_date).toLocaleDateString()
        return response
    } catch (error) {
        throw error
    }
}

export async function updateExperienceService(experience: ExperienceType) {
    try {
        const response: ExperienceType | ErrorType = await updateExperienceDAO(experience)
        response.exp_date = new Date(response.exp_date).toLocaleDateString()
        return response
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