import axios from 'axios';
import NextAuth, {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { redirect } from 'next/dist/server/api-utils';
import { Router } from 'next/router';
import { string } from 'yup';

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers:[
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                
                const {
                    admin,
                    password,
                } = credentials as {
                    admin: string,
                    password: string
                }

                const authUser = {
                    admin,
                    password
                }

                const res = await fetch(`${process.env.Base_Url}/user/login`, {
                    method: 'POST',
                    body: JSON.stringify(authUser),
                    headers: { 'Content-Type' : 'applocation/json' },
                })

                const user = await res.json()
          
                if (res.ok && user) {
                  return user
                } 
                
                return null
              }

            })
    ],
    pages: {
        signIn: '/auth/login',
    },

    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl
          },
          async session({ session, user, token }) {
            return session
          },
          async jwt({ token, user, account, profile, isNewUser }) {
            return token
          }
    }
}
export default NextAuth(authOptions)