import { createContext, useContext } from "react"
export type IUser={
  email:string,
  fullName:string,
  password:string
}

export type IGlobalContent = {
  copy: string
  setCopy:(c: string) => void
  user:IUser,
  setUser:(u:IUser) => void
}
export const GlobalContext = createContext<IGlobalContent>({
  copy: '', 
  setCopy: () => {},
  setUser: () => {},
  user:{
    fullName:"",
    password:"",
    email:""
  }

})


export const useGlobalContext = () => useContext(GlobalContext)