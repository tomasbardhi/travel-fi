import { ExperienceType } from "@/models/experience"

const BASE_URL = "http://localhost:3000"

export async function getExperiences() {
    try {
        const response = await fetch(`${BASE_URL}/api/experiences`)
        if (!response.ok) {
            throw new Error(response.status.toString().concat(": " + response.statusText))
        }
        return response.json()
    } catch (error) {
        throw error
    }
}

export async function getExperience(expId: number) {
    try {
        const response = await fetch(`${BASE_URL}/api/experiences/${expId}`)
        if (!response.ok) {
            throw new Error(response.status.toString().concat(": " + response.statusText))
        }
        return response.json()
    } catch (error) {
        throw error
    }
}

export async function updateExperience(experience: ExperienceType) {
    try {
        const response = await fetch(`${BASE_URL}/api/experiences`, {
            method: 'PATCH',
            body: JSON.stringify(experience),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        if (!response.ok) {
            throw new Error(response.status.toString().concat(": " + response.statusText))
        }
        return response.json()
    } catch (error) {
        throw error
    }
}