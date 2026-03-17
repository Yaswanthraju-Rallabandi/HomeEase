export const speakText = (text: string, language: string, onEnd?: () => void) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  let langCode = 'en-IN';
  if (language === 'hi') langCode = 'hi-IN';
  if (language === 'te') langCode = 'te-IN';

  utterance.lang = langCode;
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // Try to find a specific voice
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    let targetVoice = voices.find(v => v.lang === langCode || v.lang.replace('_', '-') === langCode);
    
    if (!targetVoice && language === 'hi') {
      targetVoice = voices.find(v => v.lang.toLowerCase().startsWith('hi') || v.name.toLowerCase().includes('hindi'));
    }
    if (!targetVoice && language === 'te') {
      targetVoice = voices.find(v => v.lang.toLowerCase().startsWith('te') || v.name.toLowerCase().includes('telugu'));
    }
    if (!targetVoice && language === 'en') {
      targetVoice = voices.find(v => v.lang.startsWith('en-IN') || v.lang.startsWith('en-GB') || v.lang.startsWith('en-US'));
    }
    
    if (targetVoice) {
      utterance.voice = targetVoice;
    }
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      onEnd();
    };
  }

  // Prevent garbage collection bug in Chrome
  (window as any)._currentUtterance = utterance;

  // Speak directly
  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// Pre-load voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}
