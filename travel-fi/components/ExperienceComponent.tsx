import { deleteExperience } from "@/client/requests/experienceRequests"
import { transformDate } from "@/server/helper/dateHelpers"
import { Experience } from "@prisma/client"
import React from "react"

function ExperienceComponent({ experience, callback }: { experience: Experience, callback: ((experiences: Experience[]) => void) }) {

    async function handleDeleteExperience(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        try {
            const experiences = await deleteExperience(experience.id)
            callback(experiences)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div style={{ display: "flex", margin: "30px", fontSize: "12px", justifyContent: "space-between", backgroundColor: "lightgray" }}>
            <h1>{experience.name}</h1>
            <h1>{experience.price.toString()}</h1>
            <h1>{experience.currency}</h1>
            <h1>{transformDate(experience.date.toString())}</h1>
            <button onClick={(e) => handleDeleteExperience(e)}>DELETE</button>
        </div>
    )

}

export default ExperienceComponent