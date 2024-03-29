// "use client"
import '@/app/globals.css'
import { getServerSession } from 'next-auth/next'
import { nextAuthOptions } from '@/lib/nextAuth/nextAuthOptions'
import { Session } from 'next-auth'
import SidebarLogin from './components/SidebarAuth'
import { Toaster } from 'sonner'
import CardAuth from './components/CardAuth'
import Providers from './providers'


export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode,
}) {
	const session = (await getServerSession(nextAuthOptions)) as Session

	return <html lang="es" className='w-full h-full'>
		<body>
					<Providers session={session}>
					<main className="w-full h-full relative  bg-white
			items-center justify-center md:grid lg:max-w-none
			grid-cols-1
			md:grid-cols-2 lg:px-0">
					<SidebarLogin/>
					<CardAuth>
						{children}
						</CardAuth>
					</main>
					</Providers>
					<Toaster />
		</body>
	</html>
}
