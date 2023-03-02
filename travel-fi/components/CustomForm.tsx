import React, { useState } from "react"
import { Experience } from '@prisma/client'
import { transformDate } from "@/server/helper/dateHelpers"
import NumericInput from "./NumericInput"
import styles from "@/styles/CustomForm.module.scss"

function CustomForm({ experience: experienceProps, callback, buttonName }: { experience: Experience, callback: (arg: Experience) => {}, buttonName: string }) {

    const [experience, setExperience] = useState<Experience>(experienceProps)


    function handleChangeExperience<T extends keyof Experience>(key: T, value: Experience[T]) {
        setExperience({ ...experience, [key]: value })
    }

    function handleSendExperience() {
        callback(experience)
    }

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <h1>{buttonName}</h1>
            </div>
            <div className={styles.numericInput}>
                <NumericInput priceProp={experience.price} currencyProp={experience.currency} callback={handleChangeExperience} />
            </div>
            <div className={styles.otherInputs}>
                <input value={experience.currency} pattern="^[a-z,A-Z]{0,3}$" placeholder='Currency' onChange={(e) => {
                    e.target.validity.valid ? handleChangeExperience("currency", e.target.value.toUpperCase()) : e
                }} />
                <input value={experience.name} pattern="^.{0,50}$" placeholder='Name' onChange={(e) => {
                    e.target.validity.valid ? handleChangeExperience("name", e.target.value) : e
                }} />
                <input type="date" value={transformDate(experience.date.toString())} onChange={(e) => {
                    handleChangeExperience("date", new Date(e.target.value))
                }} />
            </div>
            <div className={styles.submit}>
                <input type="button" value="Submit" onClick={handleSendExperience} />
            </div>
        </div>
    )
}

export default CustomForm