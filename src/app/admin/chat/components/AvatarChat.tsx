"use client"
import { Mic,MicOff } from "lucide-react"
import { Avatar } from "@readyplayerme/visage";

type IProps={
    name_user:string,
    className?:string
    showMicrophone?:boolean,
    recording?:boolean
    onClick?:any,
    avatarUri:string,
}
export default function AvatarChat(props:IProps){

    const style = { width: "100%", height: "30vh", border: "none", margin: 0 };

    const {name_user,showMicrophone,recording,onClick,avatarUri} = props
    return(
        <div className="flex flex-col text-center space-y-4 text-white">
            <Avatar
            modelSrc={avatarUri}
            style={style}
          />
          {
            (showMicrophone) && (
                <div>
                {
                     recording ?
                     <Mic 
                     onClick={()=>onClick(false)}
                     className="cursor-pointer text-center m-auto"/>
                     :
                     <MicOff 
                     onClick={()=>onClick(true)}
                     className="cursor-pointer text-center m-auto"/>
                 }
                </div>
            )
          }
            <p>{name_user}</p>
        </div>
    )   
}