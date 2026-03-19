import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Mic, Camera, PenTool, Search, PhoneCall, Zap, Droplets, Fan, Wrench, Bug, MapPin, Globe, Bell, ChevronRight } from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/speech';
import { EtherealBeams, EtherealBeamsDark } from '../components/ui/ethereal-beams';

export default function Home() {
  const { language, setLanguage, locationData, requestLocation } = useAppContext();
  const navigate = useNavigate();

  const texts = {
    en: {
      greeting: 'Hello, Namaste!',
      whatDoYouNeed: 'What do you need help with?',
      micInstruction: 'Tap the microphone to tell us your problem.',
      sos: 'EMERGENCY SOS',
      sosSub: 'Call nearest repair person instantly',
      voice: 'Voice Search',
      photo: 'Take Photo',
      draw: 'Draw Issue',
      type: 'Type Search',
      categories: 'Common Services',
      electrician: 'Electrician',
      plumber: 'Plumber',
      ac: 'AC Repair',
      washingMachine: 'Washing Machine',
      fridge: 'Fridge Repair',
      carpenter: 'Carpenter',
      painting: 'Painting',
      pest: 'Pest Control',
      langName: 'English',
      searchPlaceholder: 'Search for services...',
      seeAll: 'See All'
    },
    hi: {
      greeting: 'नमस्ते!',
      whatDoYouNeed: 'आपको किस चीज़ में मदद चाहिए?',
      micInstruction: 'अपनी समस्या बताने के लिए माइक दबाएं।',
      sos: 'आपातकालीन (SOS)',
      sosSub: 'तुरंत मिस्त्री को बुलाएं',
      voice: 'बोलकर खोजें',
      photo: 'फोटो लें',
      draw: 'चित्र बनाएं',
      type: 'लिखकर खोजें',
      categories: 'सामान्य सेवाएं',
      electrician: 'इलेक्ट्रीशियन',
      plumber: 'प्लंबर',
      ac: 'एसी रिपेयर',
      washingMachine: 'वाशिंग मशीन',
      fridge: 'फ्रिज रिपेयर',
      carpenter: 'बढ़ई',
      painting: 'पेंटिंग',
      pest: 'कीट नियंत्रण',
      langName: 'हिंदी',
      searchPlaceholder: 'सेवाएं खोजें...',
      seeAll: 'सभी देखें'
    },
    te: {
      greeting: 'నమస్తే!',
      whatDoYouNeed: 'మీకు దేనిలో సహాయం కావాలి?',
      micInstruction: 'మీ సమస్యను చెప్పడానికి మైక్ నొక్కండి.',
      sos: 'అత్యవసర (SOS)',
      sosSub: 'వెంటనే రిపేర్ వ్యక్తిని పిలవండి',
      voice: 'వాయిస్ సెర్చ్',
      photo: 'ఫోటో తీయండి',
      draw: 'గీయండి',
      type: 'టైప్ చేయండి',
      categories: 'సాధారణ సేవలు',
      electrician: 'ఎలక్ట్రీషియన్',
      plumber: 'ప్లంబర్',
      ac: 'ఏసీ రిపేర్',
      washingMachine: 'వాషింగ్ మెషీన్',
      fridge: 'ఫ్రిజ్ రిపేర్',
      carpenter: 'కార్పెంటర్',
      painting: 'పెయింటింగ్',
      pest: 'పెస్ట్ కంట్రోల్',
      langName: 'తెలుగు',
      searchPlaceholder: 'సేవల కోసం వెతకండి...',
      seeAll: 'అన్నీ చూడండి'
    }
  };

  const t = texts[language];

  useEffect(() => {
    speakText(`${t.greeting} ${t.whatDoYouNeed} ${t.micInstruction}`, language);
    return () => {
      stopSpeaking();
    };
  }, []);

  const categories = [
    { id: 'electrician', name: t.electrician, icon: Zap, color: 'bg-orange-100 text-orange-600' },
    { id: 'plumber', name: t.plumber, icon: Droplets, color: 'bg-blue-100 text-blue-600' },
    { id: 'ac', name: t.ac, icon: Fan, color: 'bg-cyan-100 text-cyan-600' },
    { id: 'washing machine', name: t.washingMachine, icon: Wrench, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'fridge', name: t.fridge, icon: Wrench, color: 'bg-teal-100 text-teal-600' },
    { id: 'pest', name: t.pest, icon: Bug, color: 'bg-green-100 text-green-600' },
  ];

  const cycleLanguage = () => {
    let newLang: 'en' | 'hi' | 'te' = 'en';
    if (language === 'en') newLang = 'hi';
    else if (language === 'hi') newLang = 'te';
    
    setLanguage(newLang);
    const newT = texts[newLang];
    speakText(`${newT.greeting} ${newT.whatDoYouNeed} ${newT.micInstruction}`, newLang);
  };

  return (
    <div className="min-h-full bg-black pb-24 font-sans text-white relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <EtherealBeamsDark />
      </div>
      {/* Top Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md px-6 pt-8 pb-4 rounded-b-3xl border-b border-white/10 shadow-sm z-50">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={requestLocation}>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-blue-400 border border-white/10">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Current Location</p>
              <h2 className="text-sm font-bold text-white truncate max-w-[180px]">
                {locationData.loading ? 'Locating...' : locationData.shortAddress || 'Select Location'}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={cycleLanguage}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-white text-xs font-semibold transition-colors border border-white/10"
            >
              <Globe size={14} />
              <span>{t.langName}</span>
            </button>
            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white relative border border-white/10 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-black"></span>
            </button>
          </div>
        </div>

        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{t.greeting}</h1>
          <p className="text-gray-400 mt-1">{t.whatDoYouNeed}</p>
        </div>

        {/* Search Bar */}
        <div 
          onClick={() => navigate('/input/type')}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 cursor-text hover:bg-white/10 transition-colors"
        >
          <Search size={20} className="text-gray-400" />
          <span className="text-gray-400 flex-1">{t.searchPlaceholder}</span>
          <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white shadow-sm">
            <Mic size={16} />
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6 relative z-10">
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/input/voice')}
            className="bg-white/5 border border-white/10 p-5 rounded-3xl shadow-md flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95 group"
          >
            <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <Mic size={28} className="text-blue-400" />
            </div>
            <span className="font-semibold text-white">{t.voice}</span>
          </button>

          <button 
            onClick={() => navigate('/input/photo')}
            className="bg-white/5 border border-white/10 p-5 rounded-3xl shadow-md flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95 group"
          >
            <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <Camera size={28} className="text-purple-400" />
            </div>
            <span className="font-semibold text-white">{t.photo}</span>
          </button>

          <button 
            onClick={() => navigate('/input/draw')}
            className="bg-white/5 border border-white/10 p-5 rounded-3xl shadow-md flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95 group"
          >
            <div className="w-14 h-14 bg-pink-500/20 rounded-full flex items-center justify-center group-hover:bg-pink-500/30 transition-colors">
              <PenTool size={28} className="text-pink-400" />
            </div>
            <span className="font-semibold text-white">{t.draw}</span>
          </button>

          <button 
            onClick={() => navigate('/sos')}
            className="bg-red-600/20 border border-red-500/30 p-5 rounded-3xl shadow-md flex flex-col items-center justify-center gap-3 hover:bg-red-600/30 transition-all active:scale-95 group"
          >
            <div className="w-14 h-14 bg-red-500/30 rounded-full flex items-center justify-center group-hover:bg-red-500/40 transition-colors">
              <PhoneCall size={28} className="text-red-400" />
            </div>
            <span className="font-bold text-red-400">{t.sos}</span>
          </button>
        </div>

        {/* Categories */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">{t.categories}</h3>
            <button className="text-blue-400 text-sm font-semibold flex items-center hover:text-blue-300">
              {t.seeAll} <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="bg-white/5 p-4 rounded-2xl border border-white/10 shadow-sm flex flex-col items-center gap-3 hover:bg-white/10 transition-all"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${cat.color.replace('bg-', 'bg-opacity-20 bg-').replace('text-', 'text-')}`}>
                  <cat.icon size={24} />
                </div>
                <span className="text-xs font-semibold text-gray-300 text-center leading-tight">
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
