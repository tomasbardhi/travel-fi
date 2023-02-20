import db from '../db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { QueryResult } from 'pg'

/*
    api/experiences/            --> returns all experiences
    api/experiences?expId=1     --> returns experience by expId
*/
export async function getExperiences(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { expId } = req.query
        let response: QueryResult
        if (expId) {
            response = await db.query('SELECT * FROM experiences WHERE exp_id = $1', [expId])
        } else {
            response = await db.query('SELECT * FROM experiences')
        }
        res.json(response.rows)
    } catch (error) {
        res.json({ error: "Fetching data failed" })
    }
}

/*
    api/experiences/1           --> returns experience by expId
    api/experiences?expId=1     --> returns experience by expId
*/
export async function getExperience(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { expId } = req.query
        const response = await db.query('SELECT * FROM experiences WHERE exp_id = $1', [expId])
        res.json(response.rows)
    } catch (error) {
        res.json({ error: "Fetching data failed" })
    }
}