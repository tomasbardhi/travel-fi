import { updateExperience } from "@/client/requests/experienceRequests"
import { ExperienceType } from "@/models/experience"
import React, { useState } from "react"

function UpdateForm(experienceProps: ExperienceType) {


    const [experience, setExperience] = useState<ExperienceType>({ ...experienceProps })

    function handleChangeExperience<T extends keyof ExperienceType>(key: T, value: ExperienceType[T]) {
        setExperience({ ...experience, [key]: value })
    }

    async function handleSendExperience() {
        try {
            await updateExperience(experience)
        } catch (error) {
            //alert(error)
        }
    }

    return (
        <>
            <input value={experience.exp_id} readOnly />
            <input value={experience.exp_name} pattern="^.{0,50}$" onChange={(e) => {
                e.target.validity.valid ? handleChangeExperience("exp_name", e.target.value) : e
            }} />
            <input value={experience.exp_price} pattern="^\d{0,9}$" onChange={(e) => {
                e.target.validity.valid ? handleChangeExperience("exp_price", Number(e.target.value)) : e
            }} />
            <input value={experience.exp_currency} pattern="^[a-z,A-Z]{0,3}$" onChange={(e) => {
                e.target.validity.valid ? handleChangeExperience("exp_currency", e.target.value) : e
            }} />
            <input type="date" value={experience.exp_date ? experience.exp_date.substring(0, 10) : ""} onChange={(e) => {
                handleChangeExperience("exp_date", e.target.value)
            }} />
            <input type="button" value="Update Experience" onClick={handleSendExperience} />
        </>
    )
}

export default UpdateForm