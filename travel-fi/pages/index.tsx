import { GetServerSideProps } from 'next'
import { getExperiencesService } from '@/server/services/experiencesService'
import { useState } from 'react'
import { insertExperience } from '@/client/requests/experienceRequests'
import CustomForm from '@/components/CustomForm'
import { getSession, signIn, signOut } from "next-auth/react"
import { Session } from 'next-auth'
import { Experience } from '@prisma/client'
import { Prisma } from '@prisma/client'
import ExpensesSummary from '@/components/ExpensesSummary'
import ExperiencesList from '@/components/ExperiencesList'
import UserComponent from '@/components/UserComponent'
import styles from '@/styles/Home.module.scss'

function Home({ experiences: experiencesProps, session }: { experiences: Experience[], session: Session }) {

  const [experiences, setExperiences] = useState<Experience[]>(experiencesProps)

  function handleDeleteExperience(exps: Experience[]) {
    setExperiences(exps)
  }

  async function handleInsertExperience(exp: Experience) {
    if (!session) {
      return
    }
    if (exp.date.toString() === "Invalid Date") {
      alert("Inser Date / Date format is wrong")
      return
    }
    if (!exp.name.length || exp.name.length < 2) {
      alert("Insert Name / Name must be longer than 1 character")
      return
    }
    if (!exp.currency || exp.currency.length != 3) {
      alert("Insert Currency / Currency must be exactly 3 character")
      return
    }
    if (session.id === 0) {
      return
    }

    exp.userId = session.id

    try {
      const response: Experience[] = await insertExperience(exp)
      setExperiences(response)
    } catch (error) {
      alert(error)
    }
  }

  const emptyExperience: Experience = {
    id: "0",
    userId: "0",
    name: "",
    price: new Prisma.Decimal(0),
    currency: "EUR",
    date: new Date()
  }


  if (!session) {

    return (
      <>
        <button onClick={() => signIn()}>Sign In</button>
      </>
    )
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainContainer}>
          <UserComponent username={session.user?.name} signOut={signOut} />
          <ExpensesSummary experiences={experiences} />
          <ExperiencesList experiences={experiences} callback={handleDeleteExperience} />
        </div>
        <div className={styles.form}>
          <CustomForm experience={emptyExperience} callback={handleInsertExperience} buttonName='Add Experience' />
          {/* <CustomForm experience={experience} callback={handleUpdateExperience} buttonName="Update Experience" /> */}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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

    const experiences: Experience[] = await getExperiencesService(session.id)

    return {
      props: {
        experiences,
        session,
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default Home