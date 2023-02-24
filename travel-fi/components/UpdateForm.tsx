import { updateExperience } from "@/client/requests/experienceRequests"
import { ExperienceType } from "@/models/experience"
import React, { useState } from "react"

function UpdateForm({ experience: experienceProps, callback }: { experience: ExperienceType, callback: (arg: ExperienceType) => void }) {


    const [experience, setExperience] = useState<ExperienceType>({ ...experienceProps })

    let yyyyMMdd_date = experience.exp_date.replaceAll("/", "-").split("-").map((i: string) => {
        if (i.length === 1) {
            return "0".concat(i)
        } else {
            return i
        }
    }).reverse().join("-")

    function handleChangeExperience<T extends keyof ExperienceType>(key: T, value: ExperienceType[T]) {
        setExperience({ ...experience, [key]: value })
    }

    async function handleSendExperience() {
        try {
            const exp: ExperienceType = await updateExperience(experience)
            callback(exp)
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
            <input type="date" value={yyyyMMdd_date} onChange={(e) => {
                handleChangeExperience("exp_date", e.target.value)
            }} />
            <input type="button" value="Update Experience" onClick={handleSendExperience} />
        </>
    )
}

export default UpdateForm