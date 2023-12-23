export async function validateTextForAudio(textUser:string){
    const response = await fetch("/api/text", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: textUser }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      return data
}

export async function validateAudioForText(base64Audio:string){
    const response = await fetch("/api/voice", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ audio: base64Audio }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      return data
}

export async function removeAudioFile(file:string){
  const response = await fetch("/api/remove_audio", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: file }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }
    return data
}