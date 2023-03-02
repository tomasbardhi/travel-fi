import prisma from '../../server/db/prismadb'
import { Experience } from '.prisma/client'
import { Prisma } from '@prisma/client'

export async function getExperiencesDAO(userId: string): Promise<Experience[]> {
    try {
        if (!userId) {
            throw new Error("ID missing")
        }
        const queryResult = await prisma.experience.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                date: 'desc'
            }
        })
        return JSON.parse(JSON.stringify(queryResult))
    } catch (error) {
        throw error
    }
}

export async function getExperienceDAO(expId: string, userId: string): Promise<Experience | null> {
    try {
        if (!userId || !expId) {
            throw new Error("IDs missing")
        }
        const queryResult = await prisma.experience.findFirst({
            where: {
                id: expId,
                userId: userId
            }
        })
        return JSON.parse(JSON.stringify(queryResult))
    } catch (error) {
        throw error
    }
}

export async function updateExperienceDAO(exp: Experience) {
    try {
        const queryResult = await prisma.experience.update({
            where: {
                id: exp.id,
            },
            data: {
                name: exp.name,
                price: exp.price,
                currency: exp.currency,
                date: exp.date
            }
        })
        return JSON.parse(JSON.stringify(queryResult))
    } catch (error) {
        throw error
    }
}

export async function deleteExperienceDAO(expId: string, userId: string) {
    try {
        const queryResult = await prisma.$queryRaw(Prisma.sql
            `DELETE FROM "Experience" WHERE "id"=${expId} AND "userId"=${userId}`
        )
        return JSON.parse(JSON.stringify(queryResult))
    } catch (error) {
        throw error
    }
}

export async function insertExperienceDAO(exp: Experience) {
    try {
        const userByUserId = await prisma.user.findUnique({
            where: {
                id: exp.userId
            }
        })
        if (!userByUserId) {
            throw new Error("Couldn't find user to assign experience!")
        }
        const queryResult = await prisma.experience.create({
            data: {
                userId: exp.userId,
                name: exp.name,
                price: exp.price,
                currency: exp.currency,
                date: exp.date
            }
        })
        return JSON.parse(JSON.stringify(queryResult))
    } catch (error) {
        throw error
    }
}
