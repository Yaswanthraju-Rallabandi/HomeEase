import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Mic, Square, ArrowRight, X, ArrowLeft, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { speakText, stopSpeaking } from '../utils/speech';

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export default function VoiceInput() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timer, setTimer] = useState(0);
  const recognitionRef = useRef<any>(null);
  const [error, setError] = useState('');

  const texts = {
    en: {
      title: 'Speak your problem',
      subtitle: 'Tap the mic and tell us what you need',
      recording: 'Listening...',
      stop: 'Stop',
      next: 'Search Nearby',
      cancel: 'Cancel',
      example: 'Example: "I need a watch shop"'
    },
    hi: {
      title: 'अपनी समस्या बोलें',
      subtitle: 'माइक पर टैप करें और बताएं कि आपको क्या चाहिए',
      recording: 'सुन रहे हैं...',
      stop: 'रोकें',
      next: 'आसपास खोजें',
      cancel: 'रद्द करें',
      example: 'उदाहरण: "मुझे घड़ी की दुकान चाहिए"'
    },
    te: {
      title: 'మీ సమస్యను చెప్పండి',
      subtitle: 'మైక్‌ను నొక్కి, మీకు ఏమి కావాలో చెప్పండి',
      recording: 'వింటున్నాము...',
      stop: 'ఆపండి',
      next: 'దగ్గరలో వెతకండి',
      cancel: 'రద్దు చేయండి',
      example: 'ఉదాహరణ: "నాకు వాచ్ షాప్ కావాలి"'
    }
  };

  const t = texts[language];

  useEffect(() => {
    // Auto-speak instructions when page loads
    speakText(`${t.title}. ${t.subtitle}`, language);
    
    return () => {
      stopSpeaking();
    };
  }, [language, t.title, t.subtitle]);

  useEffect(() => {
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      if (language === 'hi') recognitionRef.current.lang = 'hi-IN';
      else if (language === 'te') recognitionRef.current.lang = 'te-IN';
      else recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone permissions.');
        }
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [language]);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleToggleRecord = () => {
    setError('');
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      setTranscript('');
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsRecording(true);
        } catch (e) {
          console.error(e);
        }
      } else {
        setError('Your browser does not support speech recognition. Please use the Type input instead.');
      }
    }
  };

  const handleNext = () => {
    navigate('/search-results', { state: { query: transcript } });
  };

  return (
    <div className="min-h-full flex flex-col bg-black text-white">
      <div className="flex items-center justify-between p-6 bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/home')} className="p-2 bg-white/10 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        </div>
        <button 
          onClick={() => speakText(`${t.title}. ${t.subtitle}`, language)}
          className="p-2 bg-blue-500/20 rounded-full hover:bg-blue-500/30 transition-colors border border-blue-500/30"
        >
          <Volume2 size={24} className="text-blue-400" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[100px]" />
        </div>

        <p className="text-gray-400 text-lg text-center mb-12 relative z-10">{t.subtitle}</p>

        <div className="relative mb-12 z-10">
          {isRecording && (
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-red-500 rounded-full blur-md"
            />
          )}
          <button
            onClick={handleToggleRecord}
            className={`relative w-40 h-40 rounded-full flex items-center justify-center shadow-2xl transition-colors border ${
              isRecording ? 'bg-red-700 hover:bg-red-600 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)]' : 'bg-white/10 hover:bg-white/20 border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)]'
            }`}
          >
            {isRecording ? (
              <Square size={64} className="text-white fill-current" />
            ) : (
              <Mic size={64} className="text-white" />
            )}
          </button>
        </div>

        {isRecording && (
          <div className="text-center mb-8 relative z-10">
            <p className="text-red-400 font-bold text-xl mb-2 animate-pulse">{t.recording}</p>
            <p className="text-gray-400 font-mono text-lg">00:{timer.toString().padStart(2, '0')}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 p-4 rounded-2xl border border-red-500/30 w-full mb-8 relative z-10">
            <p className="text-red-300 text-center">{error}</p>
          </div>
        )}

        {!isRecording && !transcript && !error && (
          <div className="bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20 w-full relative z-10">
            <p className="text-blue-300 text-center italic">{t.example}</p>
          </div>
        )}

        {transcript && !isRecording && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full relative z-10"
          >
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8 relative shadow-sm backdrop-blur-md">
              <div className="absolute -top-3 left-6 bg-blue-700 px-3 py-0.5 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm">
                You said
              </div>
              <p className="text-2xl text-white font-medium leading-relaxed mt-2">"{transcript}"</p>
            </div>

            <button
               onClick={handleNext}
               className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-900/20"
            >
              {t.next}
              <ArrowRight size={24} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
