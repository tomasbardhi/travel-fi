import { ExperienceType } from "@/models/experience"
import { useState } from "react"

function CustomForm({ experience: experienceProps, callback, hidden, buttonName }: { experience: ExperienceType, callback: (arg: ExperienceType) => {}, hidden: boolean, buttonName: string }) {

    const [experience, setExperience] = useState<ExperienceType>(experienceProps)

    function handleChangeExperience<T extends keyof ExperienceType>(key: T, value: ExperienceType[T]) {
        setExperience({ ...experience, [key]: value })
    }

    function handleSendExperience() {
        callback(experience)
    }

    return (
        <>
            <input hidden={hidden} value={experience.exp_id} readOnly />
            <input value={experience.exp_name} pattern="^.{0,100}$" placeholder='Name' onChange={(e) => {
                e.target.validity.valid ? handleChangeExperience("exp_name", e.target.value) : e
            }} />
            <input value={experience.exp_price} pattern="^\d{0,7}$" placeholder='Price' onChange={(e) => {
                e.target.validity.valid ? handleChangeExperience("exp_price", Number(e.target.value)) : e
            }} />
            <input value={experience.exp_currency} pattern="^[a-z,A-Z]{0,3}$" placeholder='Currency' onChange={(e) => {
                e.target.validity.valid ? handleChangeExperience("exp_currency", e.target.value) : e
            }} />
            <input type="date" value={experience.exp_date} onChange={(e) => {
                handleChangeExperience("exp_date", e.target.value)
            }} />
            <input type="button" value={buttonName} onClick={handleSendExperience} />
        </>
    )
}

export default CustomForm