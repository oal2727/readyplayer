import { z } from 'zod'


export const userShowSchema = z.object({
	userId: z.number(),
})
export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1,{message:"Field required"}),
})

export const registerSchema = z.object({
	fullName: z.string().min(1,{message:"FullName required"}),
	email: z.string().email(),
	password: z.string().min(1,{message:"Password required"}),
	avatar:z.string()
})

export const registerSchemaFrontend = registerSchema.
omit({
	avatar:true
})
.extend({
	avatar:z.string().optional()
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterFrontEndSchema = z.infer<typeof registerSchema>
