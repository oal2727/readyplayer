type IProps={
    children:React.ReactNode
    className?:string
    type:"button" | "submit",
    onClick?:()=>void
}
export default function Button({children,className,onClick,type}:IProps){
    return(
     <button 
     type={type}
     onClick={onClick}
     className={`bg-blue-500 hover:bg-blue-700 
     w-full
     text-white font-bold 
     py-2 px-4 rounded ` + className}>
        {children}
    </button>
    )
}