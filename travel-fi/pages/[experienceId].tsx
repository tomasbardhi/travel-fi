import { ExperienceType } from "@/models/experience"
import Experience from "@/components/Experience"
import NumericInput from "@/components/NumericInput"
import UpdateForm from "@/components/UpdateForm"
import { getExperienceDAO, getExperiencesDAO } from "@/server/dao/experiencesDao"

export async function getStaticProps({ params: { experienceId } }: { params: { experienceId: number } }) {

    const experience: ExperienceType = await getExperienceDAO(experienceId)
    experience.exp_date = new Date(experience.exp_date).toISOString().substring(0, 10)

    return {
        props: {
            experience
        }
    }
}

export async function getStaticPaths() {
    const experiences: ExperienceType[] = await getExperiencesDAO()
    return {
        paths: experiences.map((exp) => {
            return {
                params: {
                    experienceId: `${exp.exp_id}`
                }
            }
        }),
        fallback: true
    }
}

function SingleExperience({ experience }: { experience: ExperienceType }) {

    return (
        <>
            <UpdateForm {...experience} />
            <Experience {...experience} />
        </>
    )
}

export default SingleExperience