import { Experience } from '@prisma/client'
import SingleExperience from './SingleExperience'
import styles from '@/styles/ExperiencesList.module.scss'

function ExperiencesList({ experiences, callback }: { experiences: Experience[], callback: (experiences: Experience[]) => void }) {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1>NAME</h1>
                <h1>PRICE</h1>
                <h1>CURRENCY</h1>
                <h1>DATE</h1>
                <h1 className={styles.actions}>ACTIONS</h1>
            </div>
            {
                experiences.map((exp: Experience) => {
                    return (
                        <SingleExperience key={exp.id} experience={exp} callback={callback} />
                    )
                })
            }
        </div>
    )
}

export default ExperiencesList