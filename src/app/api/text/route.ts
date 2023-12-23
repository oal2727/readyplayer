import OpenAiService from '@/app/service/OpenAI';
import { NextRequest } from 'next/server';

export async function POST(request:NextRequest) {
    const req = await request.json()
    const text = req.text
  try {
    const openAiService = new OpenAiService();
    const response  = await openAiService.analyzeText(text)
    const messageChatbot = response.message.content
    const audio = await openAiService.speakTextForVoice(messageChatbot)
    return Response.json({
      "message":messageChatbot,
      "audio":audio
    }, {status:200});
  } catch(error:unknown) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    } else {
      return Response.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
