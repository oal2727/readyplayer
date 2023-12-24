import {  router } from "@/server/trpc"
import authProcedure  from '@/server/isAuthenticated';
import z from "zod"
import fs from 'fs';
import path from "path"
import OpenAiService from "@/app/service/OpenAI"

const openAiService = new OpenAiService()

async function convertAudioToText(audioData:Buffer) {
    const currentWorkingDirectory = process.cwd();
    const outputPath = path.join(currentWorkingDirectory, 'output.mp3');
    fs.writeFileSync(outputPath, audioData);
    console.log(outputPath)
    const transcribedText= await openAiService.analyzeVoice(outputPath)
    fs.unlinkSync(outputPath);
    return transcribedText;
  }

const voiceRouter = router({
    convertAudioToText:authProcedure.input(z.object({
        audio:z.string()
    })).mutation(async ({input}) => {
        // console.log(input)
        // console.log("post data",process.env.NEXT_OPENAI)
    // Extract the audio data from the request body
    console.log(input)
    const base64Audio = input.audio; 
    const audio = Buffer.from(base64Audio, 'base64');
        // Convert the audio data to text
        const text = await convertAudioToText(audio);
        return text
    }),
    audioBotAndMessage:authProcedure.input(z.object({
        text:z.string()
    })).mutation(async({input})=>{
        const {text} = input
        const openAiService = new OpenAiService();
        const response  = await openAiService.analyzeText(text)
        const messageChatbot = response.message.content
        const audio = await openAiService.speakTextForVoice(messageChatbot)
        return {
          "message":messageChatbot,
          "audio":audio
        };
    }),
    removeAudio:authProcedure.input(z.object({
        audio:z.string()
    })).mutation(async({input})=>{
        const {audio} = input
        const currentWorkingDirectory = process.cwd();
        const outputPath = path.join(currentWorkingDirectory, `public/${audio}`);
        fs.unlinkSync(outputPath);
        return "deleete success"
    })
})

export default voiceRouter