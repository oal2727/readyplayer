import OpenAI from 'openai';
import fs from 'fs';
import path from "path"

class OpenAiService{
    openai:any
    constructor(){
        this.openai = new OpenAI({
            apiKey: process.env.NEXT_OPENAI,
          });
    }
    async analyzeText(text:string){
        const response = await  this.openai.chat.completions.create({
            messages: [{ role: "system", content:text }],
            model: "gpt-3.5-turbo",
        });
        return response.choices[0];
    }
    async analyzeVoice(outputPath:string){
        const response = await this.openai.audio.transcriptions.create({
            file:fs.createReadStream(outputPath),
            model:'whisper-1'
        });
        return response.text
    }
    async speakTextForVoice(text:string){
        const currentWorkingDirectory = process.cwd();
        const uidAudio = String(new Date().getTime())
        const outputPath = path.join(currentWorkingDirectory, `public/${uidAudio}.mp3`);
        const mp3 = await this.openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: text,
          });
          const buffer = Buffer.from(await mp3.arrayBuffer());
          await fs.promises.writeFile(outputPath, buffer);
          return uidAudio+".mp3";
    }

}
export default OpenAiService