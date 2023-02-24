import { ExperienceType } from '@/models/experience'
import Experience from '@/components/Experience'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getExperiencesService } from '@/server/services/experiencesService'
import { useState } from 'react'

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

  return (
    <>
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