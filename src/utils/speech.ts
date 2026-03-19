import { GoogleGenAI } from "@google/genai";

let currentAudioContext: AudioContext | null = null;
let currentAudioSource: AudioBufferSourceNode | null = null;
let currentSpeechId = 0;

export const speakText = async (text: string, language: string, onEnd?: () => void) => {
  if (typeof window === 'undefined') {
    if (onEnd) onEnd();
    return;
  }

  stopSpeaking();
  currentSpeechId++;
  const thisSpeechId = currentSpeechId;

  let langCode = 'en-IN';
  if (language === 'hi') langCode = 'hi-IN';
  if (language === 'te') langCode = 'te-IN';

  // 1. Try Native TTS First
  if ('speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    let targetVoice = voices.find(v => v.lang === langCode || v.lang.replace('_', '-') === langCode);
    
    if (!targetVoice && langCode.startsWith('hi')) {
      targetVoice = voices.find(v => v.lang.toLowerCase().startsWith('hi') || v.name.toLowerCase().includes('hindi'));
    }
    if (!targetVoice && langCode.startsWith('te')) {
      targetVoice = voices.find(v => v.lang.toLowerCase().startsWith('te') || v.name.toLowerCase().includes('telugu'));
    }
    if (!targetVoice && langCode.startsWith('en')) {
      targetVoice = voices.find(v => v.lang.startsWith('en-IN') || v.lang.startsWith('en-GB') || v.lang.startsWith('en-US'));
    }

    // If we found a matching native voice, use it!
    if (targetVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.voice = targetVoice;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      if (onEnd) {
        utterance.onend = () => { if (thisSpeechId === currentSpeechId) onEnd(); };
        utterance.onerror = (e) => { 
          console.error('Speech synthesis error:', e);
          if (thisSpeechId === currentSpeechId) onEnd(); 
        };
      }
      
      (window as any)._currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return; // Successfully used native TTS
    }
  }

  // 2. Fallback to Gemini TTS if native voice is missing
  console.log(`No native voice found for ${langCode}, falling back to Gemini TTS...`);
  
  if (!currentAudioContext) {
    currentAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (currentAudioContext.state === 'suspended') {
    currentAudioContext.resume().catch(e => console.warn("AudioContext resume failed:", e));
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: language === 'te' ? 'Kore' : 'Puck' },
            },
          },
        },
      });

      if (thisSpeechId !== currentSpeechId) return;

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        await playPCM(base64Audio, onEnd);
        return;
      }
    }
  } catch (error) {
    console.warn("Gemini TTS failed:", error);
  }
  
  if (onEnd) onEnd();
};

const playPCM = async (base64Audio: string, onEnd?: () => void) => {
  try {
    const binaryString = window.atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const buffer = new Int16Array(bytes.buffer);
    
    if (!currentAudioContext) {
      currentAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (currentAudioContext.state === 'suspended') {
      await currentAudioContext.resume();
    }
    
    const audioBuffer = currentAudioContext.createBuffer(1, buffer.length, 24000);
    const channelData = audioBuffer.getChannelData(0);
    for (let i = 0; i < buffer.length; i++) {
      channelData[i] = buffer[i] / 32768.0;
    }
    
    if (currentAudioSource) {
      currentAudioSource.stop();
      currentAudioSource.disconnect();
    }
    
    currentAudioSource = currentAudioContext.createBufferSource();
    currentAudioSource.buffer = audioBuffer;
    currentAudioSource.connect(currentAudioContext.destination);
    
    if (onEnd) {
      currentAudioSource.onended = onEnd;
    }
    
    currentAudioSource.start();
  } catch (err) {
    console.error("Failed to play PCM audio:", err);
    if (onEnd) onEnd();
  }
};

export const stopSpeaking = () => {
  if (typeof window !== 'undefined') {
    if (currentAudioSource) {
      try {
        currentAudioSource.stop();
        currentAudioSource.disconnect();
      } catch (e) {}
      currentAudioSource = null;
    }
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
    }
  }
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}
