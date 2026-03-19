import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MapPin, Navigation, Volume2, ArrowLeft, Map as MapIcon, ExternalLink, Clock, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { speakText, stopSpeaking } from '../utils/speech';

export default function NavigationGuide() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const placeName = id ? decodeURIComponent(id) : 'Destination';
  const mapsUri = location.state?.uri;
  const distance = location.state?.distance || '1.2';

  const texts = {
    en: {
      title: 'Go to Shop',
      walking: 'Walking',
      auto: 'Auto',
      bus: 'Bus',
      distance: `${distance} km`,
      time: `${Math.round(Number(distance) * 12)} mins`,
      openMaps: 'Open Google Maps',
      voiceGuide: 'Voice Guidance',
      directions: `${placeName} is approximately ${distance} kilometers away. Please click the Open Google Maps button below for live turn-by-turn navigation.`,
      stopVoice: 'Stop Voice',
      route: 'Route Map',
      call: 'Call Now'
    },
    hi: {
      title: 'दुकान पर जाएं',
      walking: 'पैदल',
      auto: 'ऑटो',
      bus: 'बस',
      distance: `${distance} किमी`,
      time: `${Math.round(Number(distance) * 12)} मिनट`,
      openMaps: 'गूगल मैप्स खोलें',
      voiceGuide: 'आवाज़ से रास्ता सुनें',
      directions: `${placeName} लगभग ${distance} किलोमीटर दूर है। लाइव दिशा-निर्देशों के लिए कृपया नीचे दिए गए गूगल मैप्स बटन पर क्लिक करें।`,
      stopVoice: 'आवाज़ रोकें',
      route: 'रास्ते का नक्शा',
      call: 'कॉल करें'
    },
    te: {
      title: 'షాపుకు వెళ్లండి',
      walking: 'నడక',
      auto: 'ఆటో',
      bus: 'బస్సు',
      distance: `${distance} కి.మీ`,
      time: `${Math.round(Number(distance) * 12)} నిమిషాలు`,
      openMaps: 'గూగుల్ మ్యాప్స్ తెరవండి',
      voiceGuide: 'వాయిస్ గైడెన్స్',
      directions: `${placeName} సుమారు ${distance} కిలోమీటర్ల దూరంలో ఉంది. లైవ్ డైరెక్షన్స్ కోసం దయచేసి దిగువ ఉన్న గూగుల్ మ్యాప్స్ బటన్‌ను క్లిక్ చేయండి.`,
      stopVoice: 'వాయిస్ ఆపండి',
      route: 'రూట్ మ్యాప్',
      call: 'కాల్ చేయండి'
    }
  };

  const t = texts[language as keyof typeof texts];

  const handleVoiceGuidance = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      // Use fast=true for instant native TTS feedback
      speakText(t.directions, language, () => setIsSpeaking(false));
    }
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  return (
    <div className="min-h-full flex flex-col bg-gray-900 text-gray-100">
      <div className="bg-gray-800 p-6 border-b border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/home')} className="p-2 bg-gray-700 rounded-full border border-gray-600 hover:bg-gray-600 transition-colors">
            <ArrowLeft size={24} className="text-gray-300" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-100">{t.title}</h1>
            <p className="text-sm text-gray-400 line-clamp-1">{placeName}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Map Placeholder */}
        <div className="bg-gray-800 rounded-3xl h-64 w-full relative overflow-hidden border border-gray-700 shadow-sm flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
            alt="Map view" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          
          {/* Simulated Route Line Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-0" />
          
          <svg className="absolute inset-0 w-full h-full z-10 drop-shadow-md" preserveAspectRatio="none">
            <path d="M 50 200 Q 150 150 200 100 T 350 50" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="10,10" className="animate-pulse" />
            <circle cx="50" cy="200" r="10" fill="#ef4444" stroke="white" strokeWidth="3" />
            <circle cx="350" cy="50" r="10" fill="#22c55e" stroke="white" strokeWidth="3" />
          </svg>

          <div className="text-center z-20 bg-gray-800/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-gray-700 transform transition-transform hover:scale-105">
            <MapIcon size={32} className="text-blue-400 mx-auto mb-2" />
            <p className="text-gray-100 font-bold text-lg">{t.route}</p>
          </div>
        </div>

        {/* Transport Options */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-900/30 border border-blue-800/50 rounded-2xl p-4 flex flex-col items-center gap-2">
            <div className="text-blue-400 font-bold">{t.walking}</div>
            <div className="text-sm text-blue-400">{t.time}</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex flex-col items-center gap-2 opacity-70">
            <div className="text-gray-300 font-bold">{t.auto}</div>
            <div className="text-sm text-gray-400">{Math.round(Number(distance) * 3)} mins</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex flex-col items-center gap-2 opacity-70">
            <div className="text-gray-300 font-bold">{t.bus}</div>
            <div className="text-sm text-gray-400">{Math.round(Number(distance) * 5)} mins</div>
          </div>
        </div>

        {/* Distance Info */}
        <div className="bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-800/50">
              <MapPin size={24} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Distance</p>
              <p className="text-2xl font-bold text-gray-100">{t.distance}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center border border-green-800/50">
              <Clock size={24} className="text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Time</p>
              <p className="text-2xl font-bold text-gray-100">{t.time}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-4">
          <a 
            href={`tel:+91${Math.floor(1000000000 + Math.random() * 9000000000)}`}
            className="w-full bg-green-700 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-green-900/20"
          >
            <Phone size={24} />
            {t.call}
          </a>

          <button 
            onClick={handleVoiceGuidance}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-md ${
              isSpeaking 
                ? 'bg-red-700 hover:bg-red-600 text-white' 
                : 'bg-blue-700 hover:bg-blue-600 text-white'
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

          {mapsUri ? (
            <a 
              href={mapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-md"
            >
              <ExternalLink size={24} />
              {t.openMaps}
            </a>
          ) : (
            <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-md">
              <ExternalLink size={24} />
              {t.openMaps}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
