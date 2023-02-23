import { ExperienceType } from '@/models/experience'
import Experience from '@/components/Experience'
import { getExperiencesDAO } from '@/server/dao/experiencesDao'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const experiences: ExperienceType[] = await getExperiencesDAO()
    for (let exp of experiences) {
      exp.exp_date = new Date(exp.exp_date).toISOString().substring(0, 10)
    }
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

function Home({ experiences }: { experiences: ExperienceType[] }) {

  return (
    <>
      {
        experiences.map((exp: ExperienceType) => {
          return (
            <Link key={exp.exp_id} href={`/${exp.exp_id}`}>
              <Experience {...exp} />
            </Link>
          )
        })
      }
    </>
  )
}

export default Home