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
  const [url, setUrl] = useState<string>('')
  const [user, setUser] = useState<IUser>({
    email:"",
    password:"",
    fullName:""
  })
  const [imageId, setImage] = useState<string>('')

  return (
       <html className='w-full h-full'>
        <body>
        <GlobalContext.Provider value= {{ url, setUrl,setUser,user,imageId,setImage }}>
            {children}
         </GlobalContext.Provider>
          </body>
        </html>
  )
}
