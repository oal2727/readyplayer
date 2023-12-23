import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { User } from 'next-auth'
export const config = {
	matcher: [
		/*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
		'/((?!_api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
	],
}

// eslint-disable-next-line consistent-return
export default async function middleware(req: NextRequest) {
	const url = req.nextUrl;
	const path = url.pathname;
	const session = await getToken({ req });
	const loggedUser = session?.user as User;
	console.log("loggedUser", loggedUser);
  
	
  
	if ( path.startsWith("/admin") &&!session) {
	  return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${path}`,req.url));
	}
	
  }
  