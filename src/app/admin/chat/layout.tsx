import {useState} from "react"
import Providers from './providers'
import { nextAuthOptions } from '@/lib/nextAuth/nextAuthOptions'
import { getServerSession } from 'next-auth/next'
import { Session } from 'next-auth'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
	const session = (await getServerSession(nextAuthOptions)) as Session
  return (
       <html>
          <body>
          <Providers session={session}>
          {children}
          </Providers>
            </body>
       </html>
  )
}
