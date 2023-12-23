import {  router } from "@/server/trpc"
import { publicProcedure } from '../trpc';
import { registerSchema } from "@/schema/user";
import prisma from "@/lib/prisma";
import { TRPCError } from '@trpc/server'
import { hash } from "argon2";
const userRouter = router({
    register:publicProcedure.input(registerSchema).mutation(async ({input}) => {
        
        const userExist = await prisma.user.findFirst({
            where:{
                email:input.email
            }
        })
        if(userExist){
            throw new TRPCError({ code: 'NOT_FOUND', message: 'El usuario ingresado ya existe' })
        }

        await prisma.user.create({
           data:{
            fullName:input.fullName,
            email:input.email,
            avatar:input.avatar,
            password:await hash(input.password)
           }
        })
        return "Register Success";
      }),
})

export default userRouter