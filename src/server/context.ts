import { inferAsyncReturnType } from '@trpc/server'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/lib/nextAuth/nextAuthOptions'

export async function createContext(req?: Request) {
	const session = await getServerSession(nextAuthOptions)
	return {
		session,
		req,
	}
}
export type Context = inferAsyncReturnType<typeof createContext>
