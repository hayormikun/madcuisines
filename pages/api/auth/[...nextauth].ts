import axios from 'axios';
import NextAuth, {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers:[
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize(credentials, req){
                const {
                    email,
                    password,
                } = credentials as {
                    email: string,
                    password: string,
                }

            
const loginUser = async (authUser: FormData): Promise<FormData> => {
    return await axios.post('http://api.madcuisines.com/user/login', authUser)
  }
            if (email !== "john@go.com" || password !== '1234') {
                throw new Error('Invalid Login Details')
            }

            return { id: '1234', name: 'john doe', email: 'john@go.com'}
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    }
}
export default NextAuth(authOptions)