import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Mic, Camera, PenTool, Search, PhoneCall, AlertTriangle, Wrench, Zap, Droplets, Fan, Paintbrush, Bug, ArrowLeft, Volume2, MapPin } from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/speech';

export default function Home() {
  const { language, locationData, requestLocation } = useAppContext();
  const navigate = useNavigate();

  const texts = {
    en: {
      greeting: 'Hello, Namaste!',
      whatDoYouNeed: 'What do you need help with?',
      sos: 'EMERGENCY SOS',
      sosSub: 'Call nearest repair person instantly',
      voice: 'Speak Problem',
      photo: 'Click Photo',
      draw: 'Draw Problem',
      type: 'Type Problem',
      categories: 'Services',
      electrician: 'Electrician',
      plumber: 'Plumber',
      ac: 'AC Repair',
      carpenter: 'Carpenter',
      painting: 'Painting',
      pest: 'Pest Control'
    },
    hi: {
      greeting: 'नमस्ते!',
      whatDoYouNeed: 'आपको किस चीज़ में मदद चाहिए?',
      sos: 'आपातकालीन (SOS)',
      sosSub: 'तुरंत मिस्त्री को बुलाएं',
      voice: 'बोलकर बताएं',
      photo: 'फोटो खींचें',
      draw: 'चित्र बनाएं',
      type: 'लिखकर बताएं',
      categories: 'सेवाएं',
      electrician: 'इलेक्ट्रीशियन',
      plumber: 'प्लंबर',
      ac: 'एसी रिपेयर',
      carpenter: 'बढ़ई',
      painting: 'पेंटिंग',
      pest: 'कीट नियंत्रण'
    },
    te: {
      greeting: 'నమస్తే!',
      whatDoYouNeed: 'మీకు దేనిలో సహాయం కావాలి?',
      sos: 'అత్యవసర (SOS)',
      sosSub: 'వెంటనే రిపేర్ వ్యక్తిని పిలవండి',
      voice: 'మాట్లాడండి',
      photo: 'ఫోటో తీయండి',
      draw: 'గీయండి',
      type: 'టైప్ చేయండి',
      categories: 'సేవలు',
      electrician: 'ఎలక్ట్రీషియన్',
      plumber: 'ప్లంబర్',
      ac: 'ఏసీ రిపేర్',
      carpenter: 'కార్పెంటర్',
      painting: 'పెయింటింగ్',
      pest: 'పెస్ట్ కంట్రోల్'
    }
  };

  const t = texts[language];

  const categories = [
    { id: 'electrician', name: t.electrician, icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'plumber', name: t.plumber, icon: Droplets, color: 'bg-blue-100 text-blue-600' },
    { id: 'ac', name: t.ac, icon: Fan, color: 'bg-cyan-100 text-cyan-600' },
    { id: 'carpenter', name: t.carpenter, icon: Wrench, color: 'bg-amber-100 text-amber-600' },
    { id: 'painting', name: t.painting, icon: Paintbrush, color: 'bg-purple-100 text-purple-600' },
    { id: 'pest', name: t.pest, icon: Bug, color: 'bg-green-100 text-green-600' },
  ];

  return (
    <div className="min-h-full bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-orange-500 pt-8 pb-6 px-6 rounded-b-[2rem] shadow-md relative">
        <div className="flex items-center gap-2 text-white/90 mb-4" onClick={requestLocation}>
          <MapPin size={16} />
          <span className="text-sm font-medium truncate max-w-[250px]">
            {locationData.loading ? 'Locating...' : locationData.shortAddress}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-white text-2xl font-bold mb-1">{t.greeting}</h1>
            <p className="text-orange-100 text-lg">{t.whatDoYouNeed}</p>
          </div>
          <button 
            onClick={() => speakText(`${t.greeting}. ${t.whatDoYouNeed}`, language)}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Listen to welcome message"
          >
            <Volume2 size={24} className="text-white" />
          </button>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* SOS Button */}
        <button 
          onClick={() => navigate('/sos')}
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl p-4 shadow-lg shadow-red-200 flex items-center gap-4 transition-transform active:scale-95"
        >
          <div className="bg-white/20 p-3 rounded-full">
            <PhoneCall size={32} className="text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold uppercase tracking-wider">{t.sos}</h2>
            <p className="text-red-100 text-sm">{t.sosSub}</p>
          </div>
        </button>
      </div>

      <div className="px-6 mt-8">
        {/* 4 Ways to Input */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => navigate('/input/voice')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 hover:border-orange-500 transition-colors"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <Mic size={32} className="text-orange-600" />
            </div>
            <span className="font-semibold text-gray-800 text-lg">{t.voice}</span>
          </button>

          <button 
            onClick={() => navigate('/input/photo')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 hover:border-orange-500 transition-colors"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Camera size={32} className="text-blue-600" />
            </div>
            <span className="font-semibold text-gray-800 text-lg">{t.photo}</span>
          </button>

          <button 
            onClick={() => navigate('/input/draw')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 hover:border-orange-500 transition-colors"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <PenTool size={32} className="text-purple-600" />
            </div>
            <span className="font-semibold text-gray-800 text-lg">{t.draw}</span>
          </button>

          <button 
            onClick={() => navigate('/input/type')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 hover:border-orange-500 transition-colors"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Search size={32} className="text-gray-600" />
            </div>
            <span className="font-semibold text-gray-800 text-lg">{t.type}</span>
          </button>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t.categories}</h3>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${cat.color}`}>
                  <cat.icon size={28} />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center leading-tight">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
