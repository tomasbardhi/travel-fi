import { ExperienceType } from "@/models/experience"
import Experience from "@/components/Experience"
import UpdateForm from "@/components/UpdateForm"
import { useState } from "react"
import { getExperienceService } from "@/server/services/experiencesService"
import { useRouter } from "next/router"

export async function getServerSideProps({ params: { experienceId } }: { params: { experienceId: number } }) {
    try {
        const experience = await getExperienceService(experienceId)
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

function SingleExperience({ experience: experienceProp }: { experience: ExperienceType }) {

    const [experience, setExperience] = useState<ExperienceType>(experienceProp)
    const router = useRouter()

    function handleUpdateExperience(updatedExperience: ExperienceType): void {
        setExperience({ ...updatedExperience })
    }

    function handleDeleteExperience(exps: ExperienceType[]) {
        router.push('/')
    }

    return (
        <>
            <UpdateForm experience={experience} callback={handleUpdateExperience} />
            <Experience experience={experience} callback={handleDeleteExperience} />
        </>
    )
}

export default SingleExperience