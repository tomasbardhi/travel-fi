import { ExperienceType } from '@/models/experience'
import db from '../db'

export async function getExperiencesDAO(): Promise<ExperienceType[]> {
    const queryResult = await db.query('SELECT * FROM experiences')
    return queryResult.rows
}

export async function getExperienceDAO(expId: number): Promise<ExperienceType> {
    const queryResult = await db.query('SELECT * FROM experiences WHERE exp_id = $1', [expId])
    return queryResult.rows[0]
}