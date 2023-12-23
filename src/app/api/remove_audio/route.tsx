import OpenAiService from '@/app/service/OpenAI';
import fs from 'fs';
import { NextRequest } from 'next/server';
import path from "path"

export async function POST(request:NextRequest) {
    const req = await request.json()
    const text = req.text
    const currentWorkingDirectory = process.cwd();
    const outputPath = path.join(currentWorkingDirectory, `public/${text}`);
    fs.unlinkSync(outputPath);
    return Response.json({result: "success"}, {status:200});
}
