import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MapPin, Navigation, Volume2, ArrowLeft, Map as MapIcon, ExternalLink, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { speakText, stopSpeaking } from '../utils/speech';

export default function NavigationGuide() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const texts = {
    en: {
      title: 'Go to Shop',
      walking: 'Walking',
      auto: 'Auto',
      bus: 'Bus',
      distance: '1.2 km',
      time: '15 mins',
      openMaps: 'Open Google Maps',
      voiceGuide: 'Voice Guidance',
      directions: 'Walk 200 meters ahead, then turn left. Repair shop will arrive.',
      stopVoice: 'Stop Voice',
      route: 'Route Map'
    },
    hi: {
      title: 'दुकान पर जाएं',
      walking: 'पैदल',
      auto: 'ऑटो',
      bus: 'बस',
      distance: '1.2 किमी',
      time: '15 मिनट',
      openMaps: 'गूगल मैप्स खोलें',
      voiceGuide: 'आवाज़ से रास्ता सुनें',
      directions: 'आगे 200 मीटर चलें, फिर बाएं मुड़ें। रिपेयर शॉप आ जाएगी।',
      stopVoice: 'आवाज़ रोकें',
      route: 'रास्ते का नक्शा'
    },
    te: {
      title: 'షాపుకు వెళ్లండి',
      walking: 'నడక',
      auto: 'ఆటో',
      bus: 'బస్సు',
      distance: '1.2 కి.మీ',
      time: '15 నిమిషాలు',
      openMaps: 'గూగుల్ మ్యాప్స్ తెరవండి',
      voiceGuide: 'వాయిస్ గైడెన్స్',
      directions: 'ముందుకు 200 మీటర్లు నడవండి, తర్వాత ఎడమవైపు తిరగండి. రిపేర్ షాప్ వస్తుంది.',
      stopVoice: 'వాయిస్ ఆపండి',
      route: 'రూట్ మ్యాప్'
    }
  };

  const t = texts[language as keyof typeof texts];

  const handleVoiceGuidance = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(t.directions, language, () => setIsSpeaking(false));
    }
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <div className="bg-white p-6 border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Map Placeholder */}
        <div className="bg-gray-200 rounded-3xl h-64 w-full relative overflow-hidden border-4 border-white shadow-md flex items-center justify-center">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
          <div className="text-center z-10">
            <MapIcon size={48} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 font-medium">{t.route}</p>
          </div>
          
          {/* Simulated Route Line */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M 50 200 Q 150 150 200 100 T 350 50" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="10,10" className="animate-pulse" />
            <circle cx="50" cy="200" r="8" fill="#ef4444" />
            <circle cx="350" cy="50" r="8" fill="#22c55e" />
          </svg>
        </div>

        {/* Transport Options */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 border-2 border-blue-500 rounded-2xl p-4 flex flex-col items-center gap-2">
            <div className="text-blue-600 font-bold">{t.walking}</div>
            <div className="text-sm text-blue-800">{t.time}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 opacity-60">
            <div className="text-gray-600 font-bold">{t.auto}</div>
            <div className="text-sm text-gray-500">5 mins</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 opacity-60">
            <div className="text-gray-600 font-bold">{t.bus}</div>
            <div className="text-sm text-gray-500">10 mins</div>
          </div>
        </div>

        {/* Distance Info */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <MapPin size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Distance</p>
              <p className="text-2xl font-bold text-gray-900">{t.distance}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Time</p>
              <p className="text-2xl font-bold text-gray-900">{t.time}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-4">
          <button 
            onClick={handleVoiceGuidance}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-colors ${
              isSpeaking 
                ? 'bg-red-100 text-red-600 border-2 border-red-200' 
                : 'bg-orange-100 text-orange-600 border-2 border-orange-200 hover:bg-orange-200'
            }`}
          >
            {isSpeaking ? (
              <>
                <Volume2 size={24} className="animate-pulse" />
                {t.stopVoice}
              </>
            ) : (
              <>
                <Volume2 size={24} />
                {t.voiceGuide}
              </>
            )}
          </button>

          <button className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-colors">
            <ExternalLink size={24} />
            {t.openMaps}
          </button>
        </div>
      </div>
    </div>
  );
}
