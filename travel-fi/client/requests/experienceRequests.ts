import { ExperienceType } from "@/models/experience"

const BASE_URL = "http://localhost:3000"

export async function getExperiences() {
    try {
        const response = await fetch(`${BASE_URL}/api/experiences`)
        return response.json()
    } catch (error) {
        return { error: "Error fetching data" }
    }
}

export async function getExperience(expId: number) {
    try {
        const response = await fetch(`${BASE_URL}/api/experiences/${expId}`)
        return response.json()
    } catch (error) {
        return { error: "Error fetching data" }
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
        return response.json()
    } catch (error) {
        return { error: "Error updating data" }
    }
}