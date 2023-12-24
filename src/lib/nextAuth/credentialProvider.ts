// import prisma from '@/utils/'
import prisma from "@/lib/prisma"
import { verify } from 'argon2'
import CredentialsProvider from 'next-auth/providers/credentials'

export const credentialsProvider = CredentialsProvider({
	id: 'Credentials',
	name: 'Credentials',
	credentials: {
		email: { label: 'Email', type: 'email' },
		password: { label: 'Password', type: 'password' },
	},
	async authorize(credentials) {
		if (!credentials) {
			return null
		}	
		console.log("credentials",credentials)
		const user = await prisma.user.findUnique({
			where: {
				email: credentials.email,
			},
		})

		if (!user) {
			return null
		}

		const passwordIsValid = await verify(user.password, credentials.password)

		if (passwordIsValid) {
			return {
				id: user.id,
				fullName:user.fullName,
				avatar:user.avatar,
				email:user.email
			}
		}
		return null
	},
})
