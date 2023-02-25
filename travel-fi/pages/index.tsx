import { ExperienceType } from '@/models/experience'
import Experience from '@/components/Experience'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getExperiencesService } from '@/server/services/experiencesService'
import { useState } from 'react'
import { insertExperience } from '@/client/requests/experienceRequests'
import CustomForm from '@/components/CustomForm'
import { transformDate } from '@/server/helper/dateHelpers'

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const experiences: ExperienceType[] = await getExperiencesService()
    return {
      props: {
        experiences
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

function Home({ experiences: experiencesProps }: { experiences: ExperienceType[] }) {

  const [experiences, setExperiences] = useState<ExperienceType[]>(experiencesProps)

  function handleDeleteExperience(exps: ExperienceType[]) {
    setExperiences(exps)
  }

  async function handleInsertExperience(exp: ExperienceType) {
    if (!exp.exp_name.length || exp.exp_name.length < 2) {
      alert("Insert Name / Name must be longer than 1 character")
      return
    }
    if (!exp.exp_currency || exp.exp_currency.length != 3) {
      alert("Insert Currency / Currency must be exactly 3 character")
      return
    }
    try {
      const response: ExperienceType[] = await insertExperience(exp)
      setExperiences(response)
    } catch (error) {
      alert(error)
    }
  }

  const emptyExperience: ExperienceType = {
    exp_id: 0,
    exp_name: "",
    exp_price: 0,
    exp_currency: "",
    exp_date: transformDate(new Date().toISOString())
  }

  return (
    <>
      <CustomForm experience={emptyExperience} callback={handleInsertExperience} buttonName='Add Experience' hidden={true} />
      {
        experiences.map((exp: ExperienceType) => {
          return (
            <Link key={exp.exp_id} href={`/${exp.exp_id}`}>
              <Experience experience={exp} callback={handleDeleteExperience} />
            </Link>
          )
        })
      }
    </>
  )
}

export default Home