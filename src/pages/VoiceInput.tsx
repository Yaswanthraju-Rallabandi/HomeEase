import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Mic, Square, ArrowRight, X, ArrowLeft, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { speakText, stopSpeaking } from '../utils/speech';

const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

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
      subtitle: 'Tap the mic and tell us what needs fixing',
      recording: 'Listening...',
      stop: 'Stop',
      next: 'Find Repair Person',
      cancel: 'Cancel',
      example: 'Example: "My washing machine is not working"'
    },
    hi: {
      title: 'अपनी समस्या बोलें',
      subtitle: 'माइक पर टैप करें और बताएं कि क्या ठीक करना है',
      recording: 'सुन रहे हैं...',
      stop: 'रोकें',
      next: 'मिस्त्री खोजें',
      cancel: 'रद्द करें',
      example: 'उदाहरण: "मेरी वाशिंग मशीन काम नहीं कर रही है"'
    },
    te: {
      title: 'మీ సమస్యను చెప్పండి',
      subtitle: 'మైక్‌ను నొక్కి, ఏమి రిపేర్ చేయాలో చెప్పండి',
      recording: 'వింటున్నాము...',
      stop: 'ఆపండి',
      next: 'రిపేర్ వ్యక్తిని వెతకండి',
      cancel: 'రద్దు చేయండి',
      example: 'ఉదాహరణ: "మా వాషింగ్ మెషీన్ పని చేయడం లేదు"'
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
    <div className="min-h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        </div>
        <button 
          onClick={() => speakText(`${t.title}. ${t.subtitle}`, language)}
          className="p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors"
        >
          <Volume2 size={24} className="text-orange-600" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <p className="text-gray-500 text-lg text-center mb-12">{t.subtitle}</p>

        <div className="relative mb-12">
          {isRecording && (
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-orange-500 rounded-full"
            />
          )}
          <button
            onClick={handleToggleRecord}
            className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center shadow-xl transition-colors ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isRecording ? (
              <Square size={48} className="text-white fill-current" />
            ) : (
              <Mic size={48} className="text-white" />
            )}
          </button>
        </div>

        {isRecording && (
          <div className="text-center mb-8">
            <p className="text-red-500 font-bold text-xl mb-2 animate-pulse">{t.recording}</p>
            <p className="text-gray-400 font-mono text-lg">00:{timer.toString().padStart(2, '0')}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 p-4 rounded-2xl border border-red-100 w-full mb-8">
            <p className="text-red-800 text-center">{error}</p>
          </div>
        )}

        {!isRecording && !transcript && !error && (
          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 w-full">
            <p className="text-orange-800 text-center italic">{t.example}</p>
          </div>
        )}

        {transcript && !isRecording && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full"
          >
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 relative">
              <div className="absolute -top-3 left-6 bg-white px-2 text-sm font-bold text-orange-500 uppercase tracking-wider">
                You said
              </div>
              <p className="text-2xl text-gray-800 font-medium leading-relaxed">"{transcript}"</p>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-orange-200"
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
