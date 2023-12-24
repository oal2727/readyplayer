'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import  TRPCProvider  from '@/utils/trpcProvider'

export default function Providers({ children, session }:
{ children: React.ReactNode, session: Session }) {
	return (
		<SessionProvider session={session}>
			<TRPCProvider>
			{children }
			</TRPCProvider>
		</SessionProvider>

	)
}
