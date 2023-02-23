import { ExperienceType } from "@/models/experience"
import Experience from "@/components/Experience"
import NumericInput from "@/components/NumericInput"
import UpdateForm from "@/components/UpdateForm"
import { getExperienceDAO } from "@/server/dao/experiencesDao"

export async function getServerSideProps({ params: { experienceId } }: { params: { experienceId: number } }) {
    try {
        const experience = await getExperienceDAO(experienceId)
        experience.exp_date = new Date(experience.exp_date).toISOString().substring(0, 10)
        return {
            props: {
                experience
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
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