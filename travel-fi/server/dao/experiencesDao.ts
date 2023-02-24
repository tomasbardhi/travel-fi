import { ExperienceType } from '@/models/experience'
import db from '../db'

export async function getExperiencesDAO(): Promise<ExperienceType[]> {
    try {
        const queryResult = await db.query('SELECT * FROM experiences')
        return queryResult.rows
    } catch (error) {
        throw error
    }
}

export async function getExperienceDAO(expId: number): Promise<ExperienceType> {
    try {
        const queryResult = await db.query('SELECT * FROM experiences WHERE exp_id = $1', [expId])
        return queryResult.rows[0]
    } catch (error) {
        throw error
    }
}

export async function updateExperienceDAO({ exp_id, exp_name, exp_price, exp_currency, exp_date }: ExperienceType): Promise<ExperienceType> {
    try {
        await db.query(
            'UPDATE experiences SET exp_name = $1, exp_price = $2, exp_currency = $3, exp_date = $4 WHERE exp_id = $5', [exp_name, exp_price, exp_currency, exp_date, exp_id]
        )
        const experience: ExperienceType = await getExperienceDAO(exp_id)
        return experience
    } catch (error) {
        throw error
    }

}
