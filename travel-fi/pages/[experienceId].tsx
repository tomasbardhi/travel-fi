import { ExperienceType } from "@/models/experience"
import Experience from "@/components/Experience"
import { useState } from "react"
import { getExperienceService } from "@/server/services/experiencesService"
import { useRouter } from "next/router"
import { updateExperience } from "@/client/requests/experienceRequests"
import CustomForm from "@/components/CustomForm"

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

    async function handleUpdateExperience(newExperience: ExperienceType) {
        try {
            await updateExperience(newExperience)
            setExperience({ ...newExperience })
        } catch (error) {
            alert(error)
        }
    }

    function handleDeleteExperience(exps: ExperienceType[]) {
        router.push('/')
    }

    return (
        <>
            <CustomForm experience={experience} callback={handleUpdateExperience} buttonName="Update Experience" hidden={false} />
            <Experience experience={experience} callback={handleDeleteExperience} />
        </>
    )
}

export default SingleExperience