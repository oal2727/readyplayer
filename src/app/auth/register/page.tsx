"use client"
import Link from "next/link"
import { useForm } from "react-hook-form"
import Button from "@/app/auth/components/Button"
import TextInput from "@/app/auth/components/TextInput"
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleUser } from "lucide-react"
import {useState} from "react"
import { RegisterFrontEndSchema, registerSchemaFrontend} from "@/schema/user"
import { useRouter } from 'next/navigation'
import { Avatar } from "@readyplayerme/visage";
import { useGlobalContext } from '../../context/index'
import {trpc} from "@/lib/trpc/client" 
import { toast } from 'sonner'


export default function RegisterPage() {


  const { imageId,url, setUser,user } = useGlobalContext()

  const form = useForm<RegisterFrontEndSchema>({
		resolver: zodResolver(registerSchemaFrontend),
		defaultValues: {
      fullName:user.fullName,
			email: user.email,
      password:user.password
		},
	})

  const { mutateAsync: registerUser, isLoading: isUpdatingRadio } = trpc.user.register.useMutation()
  const [loading,setLoading] = useState<boolean>(false)


  const {
		register,
    getValues,
    reset,
    handleSubmit,
		formState: { errors },
	} = form

 
	const router = useRouter()

    const onRegister=async(data: RegisterFrontEndSchema) =>{
		try {
      setLoading(true)
          data.avatar = imageId == "" ? "65889b1beab06131ed23e4dd" : imageId
          await registerUser({
            ...data
          })
          reset()
          router.push("/auth/login")
          toast.success("Register success")
      }
		catch (e) {
      toast.error("Error" + e)
		}
	}
  const style = { width: "50%", 
  height: "30vh", border: "none", margin: "auto" };
  const value = getValues()

  return (
    <>
        <Link
          href="/auth/login"
          className={ "text-black absolute right-4 top-4 md:right-8 md:top-8"}
        >
          Login
        </Link>
            <form onSubmit={handleSubmit(onRegister)} className="space-y-2">
            <h1 className="text-lg font-semibold text-black text-center">REGISTER</h1>
               <TextInput
                    type="text"
                     placeholder="fullName here"
                     register={register("fullName", { required: true })}
                  />
        	  <p  className="text-red-500">{errors.fullName?.message}</p>
            <TextInput
                    type="email"
                     placeholder="Email here"
                     register={register("email", { required: true })}
                  />
        	  <p className="text-red-500">{errors.email?.message}</p>
                  <TextInput
                    type="password"
                     placeholder="Password here"
                     register={register("password", { required: true })}
                     />
        	  <p className="text-red-500">{errors.password?.message}</p>
              <Button 
              type="button"
              onClick={()=>{
                  setUser({
                    fullName:value.fullName,
                    password:value.password,
                    email:value.email
                  })
                  router.push("/ready_player")
              }}
              className="bg-green-500 hover:bg-green-700 flex flex-row items-center m-auto text-center justify-center"><CircleUser className="mx-2"/>Crear avatar</Button>
             {
              (url != "") && (
                <Avatar
                modelSrc={url}
                style={style}
                className="w-64 h-64 m-auto items-center"
              />
              )
             }
            
            <Button 
            disabled={loading}
            type="submit">Registro</Button>
            </form>
        </>
  )
}