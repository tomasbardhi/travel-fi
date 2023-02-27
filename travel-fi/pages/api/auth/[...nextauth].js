import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import db from '../../../server/db/index'
import PostgresAdapter from "@/server/db/adapter"
import GoogleProvider from "next-auth/providers/google"
import RedditProvider from "next-auth/providers/reddit";

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
    adapter: PostgresAdapter(db),
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
