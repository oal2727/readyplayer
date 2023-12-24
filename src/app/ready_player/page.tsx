"use client"
import {
    AvatarCreator,
    AvatarCreatorConfig,
    AvatarExportedEvent,
  } from "@readyplayerme/react-avatar-creator";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import {useGlobalContext} from "@/app/context/index"

  const config: AvatarCreatorConfig = {
    clearCache: true,
    bodyType: "fullbody",
    quickStart: false,
    language: "en",
  };
  const style = { width: "100%", height: "100vh", border: "none", margin: 0 };
  
export default function AvatarConfig(){

    const router = useRouter()

    const [avatarUrl, setAvatarUrl] = useState<string>();
    const { setUrl,setImage } = useGlobalContext()

    const handleOnAvatarExported = (event: AvatarExportedEvent) => {
      setAvatarUrl(event.data.url);
      // @ts-ignore
      setImage(event.data.avatarId)
      setUrl(event.data.url)
      router.push("/auth/register")
    };
  
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <AvatarCreator
          subdomain={String(process.env.NEXT_PUBLIC_DOMAIN_READYPLAYER)}
          config={config}
          style={{ display: avatarUrl ? "none" : "inherit", ...style }}
          onAvatarExported={handleOnAvatarExported}
        />
      </div>
    );
  }
  
  