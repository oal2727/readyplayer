type IProps={
    children:React.ReactNode
    className?:string
    disabled?:boolean,
    type:"button" | "submit",
    onClick?:()=>void
}
export default function Button({children,className,disabled,onClick,type}:IProps){
    return(
     <button 
     type={type}
     onClick={onClick}
     disabled={disabled}
     className={`bg-blue-500 hover:bg-blue-700 
     w-full disabled:bg-blue-400
     cursor-pointer
     text-white font-bold 
     py-2 px-4 rounded ` + className}>
        {children}
    </button>
    )
}