"use client"
import Link from "next/link"
import { useForm } from "react-hook-form"
import Button from "@/app/auth/components/Button"
import { useRouter,useSearchParams } from 'next/navigation'
import {useCallback,useState} from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import {LoginSchema, loginSchema} from "@/schema/user"
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import TextInput from "../components/TextInput"

export default function LoginPage() {


  const { register, handleSubmit, formState: { errors} } = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	})
 
	const router = useRouter()
	const query = useSearchParams()
	const callbackUrl = query.get('callbackUrl')
  const [loading,setLoading] = useState<boolean>(false)
  const attempLogin = useCallback(async(data: LoginSchema) => {
		console.log('login callback')
    setLoading(true)
		const result = await signIn('Credentials', { ...data, redirect: false })
    setLoading(false)
		if (result?.ok) {
        if (callbackUrl) {
          router.push(callbackUrl)
          return
        }
			router.push('/admin/chat')
		}
		else if (result?.error) {
      toast.error("Credenciales invalidas")
		}
	}, [])

  return (
      <div className="w-full px-6 md:px-0">
        <Link
          href="/auth/register"
          className={ "text-black absolute right-4 top-4 md:right-8 md:top-8"}
        >
          Register
        </Link>
        <form onSubmit={handleSubmit(attempLogin)} className="space-y-4">
            <h1 className="text-lg font-semibold text-center text-black">AVATAR TALK</h1>
            <TextInput type={"email"}
            placeholder="email"
            register={register("email", { required: true })}
              />
        	  <p  className="text-red-500">{errors.email?.message}</p>
                <TextInput type={"password"}
                    placeholder="password"
                    register={register("password", { required: true })}
                  />
        	  <p className="text-red-500">{errors.password?.message}</p>
            <Button 
            disabled={loading}
            type="submit">Inicio de sessión</Button>
            </form>
      </div>
  )
}