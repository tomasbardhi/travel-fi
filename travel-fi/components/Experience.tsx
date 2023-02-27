import { deleteExperience } from "@/client/requests/experienceRequests"
import { ExperienceType } from "@/models/experience"
import React from "react"

function Experience({ experience, callback }: { experience: ExperienceType, callback: ((experiences: ExperienceType[]) => void) }) {

    async function handleDeleteExperience(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        try {
            const experiences = await deleteExperience(experience.exp_id)
            callback(experiences)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div style={{ display: "flex", margin: "30px", fontSize: "12px", justifyContent: "space-between", backgroundColor: "lightgray" }}>
            <h1>{experience.exp_id}</h1>
            <h1>{experience.exp_user_id}</h1>
            <h1>{experience.exp_name}</h1>
            <h1>{experience.exp_price}</h1>
            <h1>{experience.exp_currency}</h1>
            <h1>{experience.exp_date}</h1>
            <button onClick={(e) => handleDeleteExperience(e)}>DELETE</button>
        </div>
    )

}

export default Experience