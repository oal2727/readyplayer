import { createContext, useContext } from "react"
export type IUser={
  email:string,
  fullName:string,
  password:string
}

export type IGlobalContent = {
  url: string
  imageId:string,
  setUrl:(c: string) => void
  setImage:(c: string)=>void
  user:IUser,
  setUser:(u:IUser) => void
}
export const GlobalContext = createContext<IGlobalContent>({
  url: '', 
  imageId:'',
  setUrl: () => {},
  setUser: () => {},
  setImage:() => {},
  user:{
    fullName:"",
    password:"",
    email:""
  }

})


export const useGlobalContext = () => useContext(GlobalContext)