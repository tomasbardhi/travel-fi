import { useState } from "react"
import { Experience } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { transformDate } from "@/server/helper/dateHelpers"

function CustomForm({ experience: experienceProps, callback, hidden, buttonName }: { experience: Experience, callback: (arg: Experience) => {}, hidden: boolean, buttonName: string }) {

    const [experience, setExperience] = useState<Experience>(experienceProps)

    function handleChangeExperience<T extends keyof Experience>(key: T, value: Experience[T]) {
        setExperience({ ...experience, [key]: value })
    }

    function handleSendExperience() {
        callback(experience)
    }

    return (
        <>
            <input value={experience.name} pattern="^.{0,50}$" placeholder='Name' onChange={(e) => {
                e.target.validity.valid ? handleChangeExperience("name", e.target.value) : e
            }} />
            <input value={experience.price.toString()} pattern="^\d{0,9}$" placeholder='Price' onChange={(e) => {
                e.target.validity.valid ? handleChangeExperience("price", new Prisma.Decimal(e.target.value)) : e
            }} />
            <input value={experience.currency} pattern="^[a-z,A-Z]{0,3}$" placeholder='Currency' onChange={(e) => {
                e.target.validity.valid ? handleChangeExperience("currency", e.target.value.toUpperCase()) : e
            }} />
            <input type="date" value={transformDate(experience.date.toString())} onChange={(e) => {
                handleChangeExperience("date", new Date(e.target.value))
            }} />
            <input type="button" value={buttonName} onClick={handleSendExperience} />
        </>
    )
}

export default CustomForm