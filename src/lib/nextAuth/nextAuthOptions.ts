import { AuthOptions, User } from 'next-auth'
import { credentialsProvider } from './credentialProvider'

export const nextAuthOptions: AuthOptions = {
	pages: {
		signIn: '/auth/login',
	},
	providers: [
		credentialsProvider,
	],
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	// adapter: PrismaAdapter(prisma),

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user
			}
			return Promise.resolve(token)
		},
		async session({ session, token }) {
			if (token) {
				session.user = token.user as User
			}
			return Promise.resolve(session)
		},
	},
	debug: true,
}
