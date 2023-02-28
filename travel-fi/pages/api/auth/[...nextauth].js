import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import RedditProvider from "next-auth/providers/reddit"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../server/db/prismadb"

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        RedditProvider({
            clientId: process.env.REDDIT_ID,
            clientSecret: process.env.REDDIT_SECRET,
            authorization: {
                params: {
                    duration: 'permanent',
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            session.id = token.id
            return session
        }
    }
})
