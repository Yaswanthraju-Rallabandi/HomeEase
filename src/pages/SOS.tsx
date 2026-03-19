import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { PhoneCall, X, MapPin, AlertTriangle, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function SOS() {
  const { language, locationData, user } = useAppContext();
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(true);

  const texts = {
    en: {
      title: 'EMERGENCY SOS',
      connecting: 'Connecting to nearest repair person...',
      connected: 'Connected!',
      cancel: 'Cancel SOS',
      location: 'Sharing live location'
    },
    hi: {
      title: 'आपातकालीन (SOS)',
      connecting: 'नज़दीकी मिस्त्री से जुड़ रहे हैं...',
      connected: 'जुड़ गए!',
      cancel: 'SOS रद्द करें',
      location: 'लाइव लोकेशन साझा कर रहे हैं'
    },
    te: {
      title: 'అత్యవసర (SOS)',
      connecting: 'దగ్గరలోని రిపేర్ వ్యక్తికి కనెక్ట్ అవుతోంది...',
      connected: 'కనెక్ట్ అయ్యింది!',
      cancel: 'SOS రద్దు చేయండి',
      location: 'లైవ్ లొకేషన్ షేర్ చేయబడుతోంది'
    }
  };

  const t = texts[language];

  useEffect(() => {
    const createSOS = async () => {
      if (!user) {
        alert("Please login to use SOS");
        navigate('/login');
        return;
      }
      
      try {
        await addDoc(collection(db, 'sos_requests'), {
          userId: user.uid,
          status: 'active',
          address: locationData.address || 'Unknown Location',
          latitude: locationData.latitude || 0,
          longitude: locationData.longitude || 0,
          createdAt: new Date().toISOString()
        });
      } catch (error) {
        console.error("Error creating SOS:", error);
      }
    };

    createSOS();

    const timer = setTimeout(() => {
      setConnecting(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [user, locationData, navigate]);

  return (
    <div className="min-h-full flex flex-col bg-gray-900 text-gray-100 relative">
      <div className="p-6 flex items-center gap-4 relative z-10">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 border border-gray-700 text-gray-300">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold tracking-wider text-red-500">{t.title}</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        <div className="relative mb-12">
          {connecting && (
            <motion.div 
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 bg-red-900/50 rounded-full blur-md"
            />
          )}
          <div className="relative z-10 w-40 h-40 bg-gray-800 border border-red-900/50 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.15)]">
            <PhoneCall size={64} className={connecting ? "text-red-500 animate-pulse" : "text-green-500"} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4 text-gray-100">
          {connecting ? t.connecting : t.connected}
        </h2>

        <div className="flex flex-col items-center gap-2 bg-gray-800 border border-red-900/30 px-4 py-3 rounded-2xl mb-12 text-center max-w-xs shadow-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-red-500" />
            <span className="text-sm font-bold text-gray-200">{t.location}</span>
          </div>
          <span className="text-xs text-gray-400 line-clamp-2">{locationData.address}</span>
        </div>

        {!connecting && (
          <div className="bg-gray-800 border border-gray-700 text-gray-100 p-6 rounded-2xl w-full text-center shadow-sm">
            <img 
              src="https://i.pravatar.cc/150?img=11" 
              alt="Provider" 
              className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-green-900/50"
              referrerPolicy="no-referrer"
            />
            <h3 className="font-bold text-xl mb-1">Ramesh Kumar</h3>
            <p className="text-gray-400 mb-4">Washing Machine Expert • 1.2 km away</p>
            <p className="text-green-400 font-bold text-lg">Arriving in 10 mins</p>
          </div>
        )}
      </div>

      <div className="p-6 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-2xl transition-colors shadow-md border border-gray-700"
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );
}
