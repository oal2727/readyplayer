import { Session } from 'inspector'
import 'next-auth'
declare module 'next-auth' {
	export interface User {
		id: number;
        email:string;
		fullName:string,
        avatar:string;
	}

	interface Session {
		user: User;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: Session['user'];
	}
}
