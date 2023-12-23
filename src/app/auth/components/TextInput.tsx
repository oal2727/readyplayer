import { UseFormRegisterReturn } from 'react-hook-form';

type IProps={
    placeholder:string
    type:string
    register:UseFormRegisterReturn
}
export default function TextInput({placeholder,type,register}:IProps){
    return(
        <input type={type}
        {...register}
        placeholder={placeholder}
        className="flex h-10 text-black w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
    )
}