import { TRPCError } from "@trpc/server"
import { t } from "@/server/trpc"
const isAuthenticated = t.middleware(async ({ ctx, next }) => {
	if (!ctx?.session) {
		throw new TRPCError({ code: "UNAUTHORIZED", message: "Acceso no autorizado" })
	}
	return next()
})
const authProcedure = t.procedure.use(isAuthenticated)
export default authProcedure