import { ExperienceType } from "@/models/experience"
import Experience from "@/components/Experience"
import { useState } from "react"
import { getExperienceService } from "@/server/services/experiencesService"
import { useRouter } from "next/router"
import { updateExperience } from "@/client/requests/experienceRequests"
import CustomForm from "@/components/CustomForm"
import { getSession } from "next-auth/react"
import { IncomingMessage } from "http"

export async function getServerSideProps({ params: { experienceId }, req }: { params: { experienceId: number }, req: IncomingMessage }) {
    try {
        const session = await getSession({ req })
        if (!session) {
            return {
                redirect: {
                    destination: '/api/auth/signin',
                    permanent: false
                }
            }
        }

        const experience = await getExperienceService(Number(session?.id), experienceId)
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