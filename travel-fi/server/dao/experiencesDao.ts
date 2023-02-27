import { ExperienceType } from '@/models/experience'
import db from '../db'

export async function getExperiencesDAO(userId: number): Promise<ExperienceType[]> {
    try {
        const queryResult = await db.query('SELECT * FROM experiences WHERE exp_user_id = $1', [userId])
        return queryResult.rows
    } catch (error) {
        throw error
    }
}

export async function getExperienceDAO(userId: number, expId: number): Promise<ExperienceType> {
    try {
        const queryResult = await db.query('SELECT * FROM experiences WHERE exp_user_id = $1 AND exp_id = $2', [userId, expId])
        return queryResult.rows[0]
    } catch (error) {
        throw error
    }
}

export async function updateExperienceDAO({ exp_id, exp_name, exp_price, exp_currency, exp_date }: ExperienceType) {
    try {
        const queryResult = await db.query(
            'UPDATE experiences SET exp_name = $1, exp_price = $2, exp_currency = $3, exp_date = $4 WHERE exp_id = $5', [exp_name, exp_price, exp_currency, exp_date, exp_id]
        )
        return queryResult
    } catch (error) {
        throw error
    }
}

export async function deleteExperienceDAO(userId: number, expId: number) {
    try {
        const queryResult = await db.query('DELETE FROM experiences WHERE exp_user_id = $1 AND exp_id = $2', [userId, expId])
        return queryResult
    } catch (error) {
        throw error
    }
}

export async function insertExperienceDAO({ exp_user_id, exp_name, exp_price, exp_currency, exp_date }: ExperienceType) {
    try {
        const queryResult = await db.query('INSERT INTO experiences (exp_user_id, exp_name, exp_price, exp_currency, exp_date) VALUES ($1, $2, $3, $4, $5)', [exp_user_id, exp_name, exp_price, exp_currency, exp_date])
        return queryResult
    } catch (error) {
        throw error
    }
}
