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