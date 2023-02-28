import ExperienceComponent from '@/components/ExperienceComponent'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { getExperiencesService } from '@/server/services/experiencesService'
import { useState } from 'react'
import { insertExperience } from '@/client/requests/experienceRequests'
import CustomForm from '@/components/CustomForm'
import { transformDate } from '@/server/helper/dateHelpers'
import { getSession, signIn, signOut } from "next-auth/react"
import { Session } from 'next-auth'
import { Experience } from '@prisma/client'
import { Prisma } from '@prisma/client'

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

function Home({ experiences: experiencesProps, session }: { experiences: Experience[], session: Session }) {

  const [experiences, setExperiences] = useState<Experience[]>(experiencesProps)

  function handleDeleteExperience(exps: Experience[]) {
    setExperiences(exps)
  }

  async function handleInsertExperience(exp: Experience) {
    if (!session) {
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
    currency: "",
    date: new Date()
  }

  const expenses = experiences.reduce((prev: { [key: string]: number }, curr: Experience) => {
    if (!prev[curr.currency.toUpperCase()]) {
      prev[curr.currency.toUpperCase()] = 0
    }
    return { ...prev, [curr.currency.toUpperCase()]: +prev[curr.currency.toUpperCase()] + +curr.price }
  }, {})

  if (!session) {

    return (
      <>
        Not Signed In !!! <br />
        <br />
        <button onClick={() => signIn()}>Sign In</button>
      </>
    )
  }

  return (
    <>
      <h1>Hi {session.user?.name}</h1>
      <br />
      <button onClick={() => signOut()}>Sign Out</button>
      <br />

      <CustomForm experience={emptyExperience} callback={handleInsertExperience} buttonName='Add Experience' hidden={true} />
      {
        Object.keys(expenses).length !== 0
          ?
          Object.keys(expenses).map((key) => {
            return (
              <h1 key={key}>{expenses[key] + " " + key}</h1>
            )
          })
          :
          <h1>No expenses</h1>
      }
      {
        experiences.map((exp: Experience) => {
          return (
            <Link key={exp.id} href={`/${exp.id}`}>
              <ExperienceComponent experience={exp} callback={handleDeleteExperience} />
            </Link>
          )
        })
      }
    </>
  )
}

export default Home