import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MapPin, Phone, CheckCircle2, Navigation, IndianRupee, Star, ShieldCheck, LogOut, ArrowLeft } from 'lucide-react';

import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function PartnerHome() {
  const { language, user, setIsPartner, setUser } = useAppContext();
  const navigate = useNavigate();
  const [jobStatus, setJobStatus] = useState<'new' | 'accepted' | 'arrived' | 'completed'>('new');

  const handleLogout = async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
      localStorage.removeItem('mockUser');
      setIsPartner(false);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const texts = {
    en: {
      greeting: 'Hello Partner',
      newJob: 'New Job Request!',
      accept: 'Accept Job',
      reject: 'Reject',
      navigate: 'Navigate to Customer',
      arrived: 'I have arrived',
      enterOtp: 'Enter Customer OTP',
      verify: 'Verify & Start Work',
      complete: 'Mark as Completed',
      collect: 'Collect Payment',
      earnings: 'Today\'s Earnings',
      rating: 'Your Rating'
    },
    hi: {
      greeting: 'नमस्ते पार्टनर',
      newJob: 'नया काम!',
      accept: 'काम स्वीकार करें',
      reject: 'मना करें',
      navigate: 'ग्राहक के पास जाएं',
      arrived: 'मैं पहुँच गया',
      enterOtp: 'ग्राहक का OTP डालें',
      verify: 'सत्यापित करें और काम शुरू करें',
      complete: 'काम पूरा हुआ',
      collect: 'पैसे लें',
      earnings: 'आज की कमाई',
      rating: 'आपकी रेटिंग'
    },
    te: {
      greeting: 'నమస్తే పార్టనర్',
      newJob: 'కొత్త పని!',
      accept: 'పనిని అంగీకరించండి',
      reject: 'తిరస్కరించండి',
      navigate: 'కస్టమర్ వద్దకు వెళ్లండి',
      arrived: 'నేను చేరుకున్నాను',
      enterOtp: 'కస్టమర్ OTP నమోదు చేయండి',
      verify: 'ధృవీకరించండి & పని ప్రారంభించండి',
      complete: 'పని పూర్తయింది',
      collect: 'డబ్బు తీసుకోండి',
      earnings: 'నేటి సంపాదన',
      rating: 'మీ రేటింగ్'
    }
  };

  const t = texts[language];

  const job = {
    customer: 'Asha Devi',
    problem: 'Washing machine not spinning',
    distance: '1.2 km',
    address: '123, Gandhi Nagar, Near Main Market',
    price: '₹300 - ₹500',
    audio: true
  };

  return (
    <div className="min-h-full flex flex-col bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-black/90 backdrop-blur-md pt-12 pb-6 px-6 rounded-b-[2rem] shadow-sm border-b border-white/10 flex justify-between items-start sticky top-0 z-10">
        <div className="flex items-start gap-3">
          <button 
            onClick={handleLogout} 
            className="mt-1 p-2 bg-white/10 hover:bg-white/20 rounded-full text-gray-300 transition-colors border border-white/20"
          >
            <LogOut size={20} />
          </button>
          <div>
            <h1 className="text-white text-2xl font-bold mb-1">{t.greeting}</h1>
            <p className="text-gray-400 text-lg flex items-center gap-2">
              {user?.name || 'Raju Plumber'}
              <ShieldCheck size={18} className="text-green-400" />
            </p>
          </div>
        </div>
        <div className="bg-white/5 p-3 rounded-2xl text-center border border-white/10">
          <Star size={24} className="text-yellow-400 fill-current mx-auto mb-1" />
          <span className="text-white font-bold text-lg">4.8</span>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        <div className="bg-white/5 rounded-2xl p-6 shadow-sm border border-white/10 flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">{t.earnings}</p>
            <p className="text-3xl font-bold text-white flex items-center">
              <IndianRupee size={24} />
              1,250
            </p>
          </div>
          <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center border border-green-500/30">
            <IndianRupee size={24} className="text-green-400" />
          </div>
        </div>
      </div>

      <div className="px-6 mt-8">
        {jobStatus === 'new' && (
          <div className="bg-blue-900/20 rounded-3xl p-6 border-2 border-blue-500/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-700 text-white px-4 py-1 rounded-bl-2xl font-bold text-sm animate-pulse">
              {t.newJob}
            </div>
            
            <h2 className="text-xl font-bold text-white mt-4 mb-2">{job.problem}</h2>
            
            <div className="flex items-center gap-4 text-gray-300 mb-4">
              <div className="flex items-center gap-1">
                <MapPin size={18} className="text-blue-400" />
                <span className="font-medium">{job.distance}</span>
              </div>
              <div className="flex items-center gap-1">
                <IndianRupee size={18} className="text-green-400" />
                <span className="font-bold text-green-400">{job.price}</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-6">{job.address}</p>

            <div className="flex gap-4">
              <button 
                onClick={() => setJobStatus('accepted')}
                className="flex-1 bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-colors shadow-sm"
              >
                {t.accept}
              </button>
              <button className="px-6 bg-white/5 border-2 border-white/10 text-gray-300 font-bold rounded-2xl hover:bg-white/10 transition-colors">
                {t.reject}
              </button>
            </div>
          </div>
        )}

        {jobStatus === 'accepted' && (
          <div className="bg-white/5 rounded-3xl p-6 border border-white/10 shadow-sm">
            <h2 className="text-xl font-bold text-white mb-4">Heading to {job.customer}</h2>
            
            <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-2xl mb-6 flex items-start gap-3">
              <Navigation size={24} className="text-blue-400 shrink-0" />
              <p className="text-blue-200 font-medium">{job.address}</p>
            </div>

            <button 
              onClick={() => setJobStatus('arrived')}
              className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-colors flex justify-center items-center gap-2 shadow-sm"
            >
              <Navigation size={20} />
              {t.navigate}
            </button>
            
            <button 
              onClick={() => setJobStatus('arrived')}
              className="w-full mt-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 rounded-2xl transition-colors"
            >
              {t.arrived}
            </button>
          </div>
        )}

        {jobStatus === 'arrived' && (
          <div className="bg-white/5 rounded-3xl p-6 border border-white/10 shadow-sm text-center">
            <h2 className="text-xl font-bold text-white mb-2">{t.enterOtp}</h2>
            <p className="text-gray-400 mb-6">Ask the customer for the 4-digit OTP</p>
            
            <input 
              type="text" 
              placeholder="----" 
              className="w-full text-center text-4xl tracking-[1em] font-bold py-4 bg-white/5 border-2 border-white/10 rounded-2xl mb-6 focus:border-blue-500 focus:ring-blue-500 text-white placeholder-gray-600"
              maxLength={4}
            />

            <button 
              onClick={() => setJobStatus('completed')}
              className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-colors flex justify-center items-center gap-2 shadow-sm"
            >
              <CheckCircle2 size={24} />
              {t.verify}
            </button>
          </div>
        )}

        {jobStatus === 'completed' && (
          <div className="bg-white/5 rounded-3xl p-6 border border-white/10 shadow-sm text-center">
            <div className="w-20 h-20 bg-green-900/30 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Job Done!</h2>
            <p className="text-gray-400 mb-8">Collect payment from customer</p>
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
              <p className="text-sm text-gray-400 uppercase tracking-wider font-bold mb-2">Total Amount</p>
              <p className="text-4xl font-bold text-white">₹450</p>
            </div>

            <button 
              onClick={() => setJobStatus('new')}
              className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-colors shadow-md"
            >
              {t.collect}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
