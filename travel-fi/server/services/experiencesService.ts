import { getExperiencesDAO, getExperienceDAO, updateExperienceDAO, deleteExperienceDAO, insertExperienceDAO } from '../dao/experiencesDao'
import { Experience } from '@prisma/client'

export async function getExperiencesService(userId: string,) {
    try {
        const response: Experience[] = await getExperiencesDAO(userId)
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