import { ExperienceType } from "@/models/experience"
import React, { useState } from "react"

function UpdateForm(experienceProps: ExperienceType) {


    const [experience, setExperience] = useState<ExperienceType>({
        exp_id: 1,
        exp_name: "testname",
        exp_price: 10,
        exp_currency: "EUR",
        exp_date: "2000-05-05"
    })

    function handleChangeExperience<T extends keyof ExperienceType>(key: T, value: ExperienceType[T]) {
        setExperience({ ...experience, [key]: value })
    }

    return (
        <>
            <input value={experience.exp_id} onChange={(e) => {
                handleChangeExperience("exp_id", parseInt(e.target.value))
            }} />
            <input value={experience.exp_name} onChange={(e) => {
                handleChangeExperience("exp_name", e.target.value)
            }} />
            <input value={experience.exp_price} pattern="^\d{0,9}$" onChange={(e) => {
                e.target.validity.valid ? handleChangeExperience("exp_price", Number(e.target.value)) : e
            }} />
            <input value={experience.exp_currency} onChange={(e) => {
                handleChangeExperience("exp_currency", e.target.value)
            }} />
            <input type="date" value={experience.exp_date ? experience.exp_date.substring(0, 10) : ""} onChange={(e) => {
                handleChangeExperience("exp_date", e.target.value)
            }} />
        </>
    )
}

export default UpdateForm