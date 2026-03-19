import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CheckCircle2, MapPin, Phone, MessageCircle, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Booking() {
  const { id } = useParams();
  const { language, locationData, requestLocation, user } = useAppContext();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const texts = {
    en: {
      title: 'Confirm Booking',
      provider: 'Repair Person',
      price: 'Estimated Price',
      address: 'Your Address',
      confirmBtn: 'Confirm Booking',
      success: 'Booking Confirmed!',
      successSub: 'Repair person is on the way',
      track: 'Track Live Location',
      otp: 'Share this OTP when they arrive',
      notify: 'Family member notified via WhatsApp',
      useCurrentLocation: 'Use Current Location'
    },
    hi: {
      title: 'बुकिंग पक्की करें',
      provider: 'मिस्त्री',
      price: 'अनुमानित कीमत',
      address: 'आपका पता',
      confirmBtn: 'बुकिंग पक्की करें',
      success: 'बुकिंग पक्की हो गई!',
      successSub: 'मिस्त्री रास्ते में है',
      track: 'लाइव लोकेशन देखें',
      otp: 'उनके आने पर यह OTP बताएं',
      notify: 'परिवार के सदस्य को WhatsApp पर सूचित किया गया',
      useCurrentLocation: 'वर्तमान स्थान का उपयोग करें'
    },
    te: {
      title: 'బుకింగ్‌ని నిర్ధారించండి',
      provider: 'రిపేర్ వ్యక్తి',
      price: 'అంచనా ధర',
      address: 'మీ చిరునామా',
      confirmBtn: 'బుకింగ్‌ని నిర్ధారించండి',
      success: 'బుకింగ్ నిర్ధారించబడింది!',
      successSub: 'రిపేర్ వ్యక్తి దారిలో ఉన్నారు',
      track: 'లైవ్ లొకేషన్ చూడండి',
      otp: 'వారు వచ్చినప్పుడు ఈ OTP చెప్పండి',
      notify: 'కుటుంబ సభ్యునికి WhatsApp ద్వారా తెలియజేయబడింది',
      useCurrentLocation: 'ప్రస్తుత స్థానాన్ని ఉపయోగించండి'
    }
  };

  const t = texts[language];

  const placeName = id ? decodeURIComponent(id) : 'Ramesh Kumar';

  // Mock provider data based on the selected place
  const provider = {
    name: placeName,
    role: 'Local Service Provider',
    price: '₹300 - ₹500',
    image: 'https://i.pravatar.cc/150?img=11',
    verified: true,
    rating: 4.8
  };

  const handleConfirm = async () => {
    if (!user) {
      alert("Please login to confirm booking");
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        providerId: placeName,
        serviceType: 'Local Service Request',
        status: 'pending',
        address: locationData.address,
        latitude: locationData.latitude || 0,
        longitude: locationData.longitude || 0,
        createdAt: new Date().toISOString()
      });
      setConfirmed(true);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-8 bg-black text-white relative">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mb-8 shadow-sm border border-green-500/30"
        >
          <CheckCircle2 size={64} className="text-green-400" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white mb-2 text-center">{t.success}</h1>
        <p className="text-gray-400 text-lg mb-8 text-center">{t.successSub}</p>

        <div className="bg-white/5 p-6 rounded-2xl shadow-sm border border-white/10 w-full mb-8 backdrop-blur-md">
          <p className="text-sm text-gray-400 text-center mb-2">{t.otp}</p>
          <p className="text-4xl font-bold text-center tracking-[0.5em] text-white">4821</p>
        </div>

        <div className="flex items-center gap-3 text-green-400 bg-green-500/10 border border-green-500/20 px-4 py-3 rounded-xl mb-8 w-full">
          <MessageCircle size={24} />
          <span className="text-sm font-medium">{t.notify}</span>
        </div>

        <button 
          onClick={() => navigate('/home')}
          className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all shadow-lg shadow-blue-900/20"
        >
          {t.track}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col bg-black text-white">
      <div className="bg-black/80 backdrop-blur-md p-6 border-b border-white/10 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate('/home')} className="p-2 bg-white/10 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
      </div>

      <div className="p-6 space-y-6 flex-1 relative z-10">
        <div className="bg-white/5 p-6 rounded-2xl shadow-sm border border-white/10 backdrop-blur-md">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">{t.provider}</h2>
          <div className="flex gap-4 items-center">
            <img 
              src={provider.image} 
              alt={provider.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-bold text-xl text-white flex items-center gap-2">
                {provider.name}
                <ShieldCheck size={20} className="text-green-400" />
              </h3>
              <p className="text-gray-400">{provider.role}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl shadow-sm border border-white/10 backdrop-blur-md">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{t.price}</h2>
          <p className="text-3xl font-bold text-white">{provider.price}</p>
          <p className="text-sm text-gray-500 mt-2">Final price depends on the exact repair needed.</p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl shadow-sm border border-white/10 backdrop-blur-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t.address}</h2>
            <button 
              onClick={requestLocation}
              disabled={locationData.loading}
              className="text-blue-400 text-sm font-medium hover:text-blue-300 disabled:opacity-50 transition-colors"
            >
              {locationData.loading ? '...' : t.useCurrentLocation}
            </button>
          </div>
          <div className="flex gap-3 items-start">
            <MapPin size={24} className="text-blue-400 shrink-0 mt-1" />
            <p className="text-gray-300 text-lg">
              {locationData.address}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-black/80 backdrop-blur-md border-t border-white/10 sticky bottom-0 z-10">
        <button 
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-70"
        >
          {isSubmitting ? '...' : t.confirmBtn}
          {!isSubmitting && <CheckCircle2 size={24} />}
        </button>
      </div>
    </div>
  );
}
