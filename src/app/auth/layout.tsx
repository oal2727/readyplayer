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
		<body className={'flex h-full w-full bg-white'}>
            <div className="container relative hidden flex-col  bg-white
			items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
					<Providers session={session}>
                    <SidebarLogin/>
                    <CardAuth>
					<main className="w-full h-full">
						{children}
					</main>
                    </CardAuth>
					</Providers>
					<Toaster />
				</div>
		</body>
	</html>
}
