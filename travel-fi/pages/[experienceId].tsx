import ExperienceComponent from "@/components/ExperienceComponent"
import { useState } from "react"
import { getExperienceService } from "@/server/services/experiencesService"
import { useRouter } from "next/router"
import { updateExperience } from "@/client/requests/experienceRequests"
import CustomForm from "@/components/CustomForm"
import { getSession } from "next-auth/react"
import { IncomingMessage } from "http"
import { Experience } from '@prisma/client'
import NumericInput from "@/components/NumericInput"

export async function getServerSideProps({ params: { experienceId }, req }: { params: { experienceId: string }, req: IncomingMessage }) {
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

        const experience = await getExperienceService(experienceId, session.id)

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

function SingleExperience({ experience: experienceProp }: { experience: Experience }) {

    const [experience, setExperience] = useState<Experience>(experienceProp)
    const router = useRouter()

    async function handleUpdateExperience(newExperience: Experience) {
        try {
            await updateExperience(newExperience)
            setExperience({ ...newExperience })
        } catch (error) {
            alert(error)
        }
    }

    function handleDeleteExperience(exps: Experience[]) {
        router.push('/')
    }

    return (
        <>
            <NumericInput />
            <CustomForm experience={experience} callback={handleUpdateExperience} buttonName="Update Experience" hidden={false} />
            <ExperienceComponent experience={experience} callback={handleDeleteExperience} />
        </>
    )
}

export default SingleExperience