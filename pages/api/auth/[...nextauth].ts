import axios from 'axios';
import NextAuth, {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { redirect } from 'next/dist/server/api-utils';
import { Router } from 'next/router';

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
                    user,
                    password,
                } = credentials as {
                    user: string,
                    password: string,
                }
                
                const admin = await axios.post(`${process.env.Base_Url}/user/login`, credentials)
          
                if (admin) {
                  return admin
                } else {
                  return null
                }
              }
            })
    ],
    pages: {
        signIn: '/auth/login',
    }
}
export default NextAuth(authOptions)