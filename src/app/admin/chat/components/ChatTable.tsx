"use client"
import Image from 'next/image'
import {useEffect, useState} from "react"
import { useSession } from 'next-auth/react'
import AvatarChat from './AvatarChat';
import {validateTextForAudio,validateAudioForText,removeAudioFile} from "../api"
import fs from 'fs';
import Loading from './Loading';
type IMessages={
    id:number,
    message:string,
    loading:boolean
    user:string,
}

export default function ChatTable(){

    const { data: session } = useSession()
    const user = session?.user
    const [mediaRecorder, setMediaRecorder] = useState<any>(null);
    const [recording, setRecording] = useState(false);
    const [message,setMessages] = useState<IMessages[]>([
        {id:new Date().getTime(),loading:false,message:"Hola Soy tu asistente Virtual , puedes hablarme por voz lo interpretare  y te respondere",user:"chatbot"}
    ])
    const sendRecordingToApi=(audioBlob:any)=>{
        try {
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async function () {
              const base64Audio = reader.result.split(',')[1]; // Remove the data URL prefix
              const data = await validateAudioForText(base64Audio)
              const formatMessage={
                id:new Date().getTime(),
                loading:false,
                message:data.result,
                user:"jose"//),
              }
              setMessages(prevMessages => [...prevMessages, formatMessage]);
              // TEXT FOR AUDIO FOR OPENAI MODEL
              const idMessage = new Date().getTime()
              const formatMessage2={
                id:idMessage,
                message:"",
                loading:true,
                user:"chatbot"//),
              }
              setMessages(prevMessages => [...prevMessages, formatMessage2]);
              const response = await validateTextForAudio(data.result)
              const audio = new Audio("/"+response.audio)
              audio.play()
              setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                const lastMessageIndex = updatedMessages.length - 1;
                updatedMessages[lastMessageIndex].message = response.message;
                updatedMessages[lastMessageIndex].loading = false;
                return updatedMessages;
              });
              // SPEAK TEXT FOR OPENAI MODEL
              await removeAudioFile(response.audio)
            }
          } catch (error) {
            console.error(error);
          }
    }

    const lifecycleStateMediDevices=async()=>{
        try{
            let chunks=[] as any
            const audioMedia = await navigator.mediaDevices.getUserMedia({audio:true})
            console.log(audioMedia)
            const newMediaRecoder = new MediaRecorder(audioMedia)
            newMediaRecoder.onstart=()=>{
                chunks=[]
            }
            newMediaRecoder.ondataavailable = e=>{
                // active
                chunks.push(e.data);
            }
            newMediaRecoder.onstop=async()=>{
                const audioBlob = new Blob(chunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.onerror = function (err) {
                    console.error('Error playing audio:', err);
                };
                // audio.play(); // escuchar a la persona que activa el audio
                sendRecordingToApi(audioBlob)
            }
            console.log("newMediaRecoder",newMediaRecoder)
            setMediaRecorder(newMediaRecoder)
        }catch(error){
            console.log("error audio active")
        }

    }
    useEffect(()=>{
        lifecycleStateMediDevices()
    },[])

    const toogleMicrophone=(value:boolean)=>{
        setRecording(value);
        console.log("start",value)
        if(mediaRecorder && value){
            mediaRecorder.start(); // function for intiialize recording
            
        }else{
            mediaRecorder.stop(); //pause for recording
        }
        // setRecording(!value);
    }

    const public_avatar = String(process.env.NEXT_PUBLIC_AVATAR)
    const publicImage = public_avatar.replace("image","6584c498d3ccf6fa247d44ff.png")
    const publicAvatarGlb = public_avatar.replace("image","6584c498d3ccf6fa247d44ff.glb")
    const publicImageUserGlb = public_avatar.replace("image",String(user?.avatar)+".glb")
    const publicImageUser = public_avatar.replace("image",String(user?.avatar)+".png")
    const nameUser = "jose"
    return(
        <div className="
        grid 
        grid-cols-1
        px-40
        md:px-0
        md:grid-cols-3 items-center m-auto 
        place-items-center
        ">
                  <AvatarChat
            avatarUri={publicImageUserGlb}
            name_user={nameUser} 
            recording={recording}
            onClick={(value:boolean)=>toogleMicrophone(value)}
          />
            <div className="bg-gray-600 h-[700px] overflow-y-scroll rounded-xl w-full my-10 p-4 space-y-4">
                {
                    message.map((item,index)=>(
                        <div className={`flex ${item.user == nameUser ? 'flex-row' : 'flex-row-reverse'} items-start relative`} key={index}>
                            <Image 
                            width={60}
                            height={60}
                            className="rounded-full"
                            src={item.user == nameUser ? publicImageUser : publicImage}
                            alt="image_avatar"
                            />
                            <div className={`bg-gray-500 rounded-md p-2 w-full ${item.user == nameUser ? "ml-4" : "mr-4"}`}>
                                {
                                    item.loading ? (
                                        <Loading/>
                                    ):(
                                        <p className="text-justify text-white">{item.message}</p>
                                        )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <AvatarChat
            avatarUri={publicAvatarGlb}
            name_user="chatbot" 
            onClick={(value:boolean)=>toogleMicrophone(value)}
          />
        </div>
    )
}