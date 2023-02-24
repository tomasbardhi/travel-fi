import { ExperienceType } from '@/models/experience'
import Experience from '@/components/Experience'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getExperiencesService } from '@/server/services/experiencesService'
import { useState } from 'react'
import InsertForm from '@/components/InsertForm'
import { insertExperience } from '@/client/requests/experienceRequests'

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
    try {
      const response: ExperienceType[] = await insertExperience(exp)
      setExperiences(response)
    } catch (error) {
      alert(error)
    }
  }

  const date: Date = new Date()
  let currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`

  let yyyyMMdd_date = currentDate.split("-").map((i: string) => {
    if (i.length === 1) {
      return "0".concat(i)
    } else {
      return i
    }
  }).join("-")

  const emptyExperience: ExperienceType = {
    exp_id: 0,
    exp_name: "",
    exp_price: 0,
    exp_currency: "",
    exp_date: yyyyMMdd_date
  }

  return (
    <>
      <InsertForm experience={emptyExperience} callback={handleInsertExperience} />
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