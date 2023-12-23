"use client"
import './globals.css'
import {useState} from "react"
import {GlobalContext} from "./context/index"
import { IUser } from './context/index'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [copy, setCopy] = useState<string>('')
  const [user, setUser] = useState<IUser>({
    email:"",
    password:"",
    fullName:""
  })

  return (
       <html className='w-full h-full'>
        <body>
        <GlobalContext.Provider value= {{ copy, setCopy,setUser,user }}>
            {children}
         </GlobalContext.Provider>
          </body>
        </html>
  )
}
