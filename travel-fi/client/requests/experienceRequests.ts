import { Experience } from "@prisma/client"

const BASE_URL = "https://tomasbardhi.com"

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

export async function getExperience(expId: string) {
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

export async function updateExperience(experience: Experience) {
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

export async function deleteExperience(expId: string) {
    try {
        const response = await fetch(`${BASE_URL}/api/experiences/${expId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        if (!response.ok) {
            throw new Error(response.status.toString().concat(": " + response.statusText));
        }
        return response.json()
    } catch (error) {
        throw error
    }
}

export async function insertExperience(exp: Experience) {
    try {
        const response = await fetch(`${BASE_URL}/api/experiences`, {
            method: 'POST',
            body: JSON.stringify(exp),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        if (!response.ok) {
            throw new Error(response.status.toString().concat(": " + response.statusText));
        }
        return response.json()
    } catch (error) {
        throw error
    }
}