import fs from 'fs';
import path from "path"
import OpenAiService from "../../service/OpenAI"
import { NextRequest } from 'next/server';

const openAiService = new OpenAiService()

export async function POST(request:NextRequest) {
  console.log("post data",process.env.NEXT_PUBLIC_OPENAI)
  const req = await request.json()
  // Extract the audio data from the request body
  const base64Audio = req.audio; 
  const audio = Buffer.from(base64Audio, 'base64');
  try {
    // Convert the audio data to text
    const text = await convertAudioToText(audio);
    return Response.json({result: text}, {status:200});
  } catch(error:unknown) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    } else {
      return Response.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

// This function converts audio data to text using the OpenAI API
async function convertAudioToText(audioData:Buffer) {
  const currentWorkingDirectory = process.cwd();
  const outputPath = path.join(currentWorkingDirectory, 'output.mp3');
  fs.writeFileSync(outputPath, audioData);
  console.log(outputPath)
  const transcribedText= await openAiService.analyzeVoice(outputPath)
  fs.unlinkSync(outputPath);
  return transcribedText;
}
