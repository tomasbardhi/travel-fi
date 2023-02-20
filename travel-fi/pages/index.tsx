import { ExperienceType } from '@/client/models/experience'
import { getExperiences } from '@/client/requests/experiencesRequests'
import Experience from '@/components/Experience'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticProps: GetStaticProps<{ experiences: ExperienceType[] }> = async () => {
  const experiences: ExperienceType[] = await getExperiences()
  return {
    props: {
      experiences
    }
  }
}

function Home({ experiences }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      {
        experiences.map((exp: ExperienceType) => <Experience {...exp} key={exp.exp_id} />)
      }
    </>
  )
}

export default Home