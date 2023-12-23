"use client"
import { Mic,MicOff } from "lucide-react"
import { Avatar } from "@readyplayerme/visage";

type IProps={
    name_user:string,
    className?:string
    recording?:boolean
    onClick?:any,
    avatarUri:string,
}
export default function AvatarChat(props:IProps){

    const style = { width: "100%", height: "30vh", border: "none", margin: 0 };

    const {name_user,className,recording,onClick,avatarUri} = props
    return(
        <div className="flex flex-col text-center space-y-4 text-white">
              {/* <Avatar
            modelSrc={"https://models.readyplayer.me/6585e882d403021b672aa94a.glb"}
            style={style}
          /> */}
            {/* <img src={image} width={200} height={200} alt="image_test" className="container cover"/> */}
            {/* <div className="bg-gray-500 w-[200px] h-[150px]"/> */}
            <Avatar
            modelSrc={avatarUri}
            style={style}
          />
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
            <p>{name_user}</p>
        </div>
    )   
}