import { deleteExperience } from "@/client/requests/experienceRequests"
import { transformDate } from "@/server/helper/dateHelpers"
import { Experience } from "@prisma/client"
import styles from "@/styles/SingleExperience.module.scss"
import Link from "next/link"

function SingleExperience({ experience, callback }: { experience: Experience, callback: ((experiences: Experience[]) => void) }) {

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
        <div className={styles.main}>
            <div className={styles.container}>
                <h1>{experience.name}</h1>
                <h1>{experience.price.toString()}</h1>
                <h1>{experience.currency}</h1>
                <h1>{transformDate(experience.date.toString())}</h1>
                <div>
                    <Link className={styles.link} href={`/${experience.id}`}>
                        <button className={styles.openBtn}>Open</button>
                    </Link>
                    <div>
                        <button className={styles.deleteBtn} onClick={(e) => handleDeleteExperience(e)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SingleExperience