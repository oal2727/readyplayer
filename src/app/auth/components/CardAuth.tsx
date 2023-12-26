import Link from "next/link"
type IProps={
    children:React.ReactNode
}
export default function CardAuth({children}:IProps){
    return(
        <div className="lg:p-8 bg-white">
          <div className="m-auto flex w-full h-screen
          md:h-full
          flex-col 
          justify-center space-y-6 sm:w-[350px] items-center">
            {children}
          </div>
        </div>
    )
}