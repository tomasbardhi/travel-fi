import { ExperienceType } from "@/client/models/experience"
import { getExperience, getExperiences } from "@/client/requests/experiencesRequests"
import Experience from "@/components/Experience"
import { InferGetStaticPropsType } from "next"

export async function getStaticProps({ params: { experienceId } }: { params: { experienceId: number } }) {
    const experience: ExperienceType = await getExperience(experienceId)
    return {
        props: {
            experience
        }
    }
}

export async function getStaticPaths() {
    const experiences: ExperienceType[] = await getExperiences()
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

function SingleExperience({ experience }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>
            <Experience {...experience} />
        </>
    )
}

export default SingleExperience