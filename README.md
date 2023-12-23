  // v3 openai: await openai.createTranscriptio
  // v4 openai: await openai.audio.transcriptions.create

  # OVERWRITE AUDIO:


 const currentWorkingDirectory = process.cwd();
  const outputPath = path.join(currentWorkingDirectory, 'output.mp3');
  fs.writeFileSync(outputPath, audioData);
  const base64Audio = req.audio; 
  // Convert the Base64 audio data back to a Buffer
  const audio = Buffer.from(base64Audio, 'base64');


  1. seguridad de las apis
  2. envio los datos a trpc publico 