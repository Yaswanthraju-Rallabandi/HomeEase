import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MapPin, Phone, CheckCircle2, Navigation, IndianRupee, Star, ShieldCheck, LogOut, ArrowLeft } from 'lucide-react';

export default function PartnerHome() {
  const { language, user, setIsPartner, setUser } = useAppContext();
  const navigate = useNavigate();
  const [jobStatus, setJobStatus] = useState<'new' | 'accepted' | 'arrived' | 'completed'>('new');

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
    <div className="min-h-full flex flex-col bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gray-900 pt-12 pb-6 px-6 rounded-b-[2rem] shadow-md flex justify-between items-start">
        <div className="flex items-start gap-3">
          <button 
            onClick={() => { setIsPartner(false); setUser(null); navigate('/'); }} 
            className="mt-1 p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors"
          >
            <LogOut size={20} />
          </button>
          <div>
            <h1 className="text-white text-2xl font-bold mb-1">{t.greeting}</h1>
            <p className="text-gray-400 text-lg flex items-center gap-2">
              {user?.name || 'Raju Plumber'}
              <ShieldCheck size={18} className="text-green-500" />
            </p>
          </div>
        </div>
        <div className="bg-gray-800 p-3 rounded-2xl text-center">
          <Star size={24} className="text-yellow-500 fill-current mx-auto mb-1" />
          <span className="text-white font-bold text-lg">4.8</span>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">{t.earnings}</p>
            <p className="text-3xl font-bold text-gray-900 flex items-center">
              <IndianRupee size={24} />
              1,250
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <IndianRupee size={24} className="text-green-600" />
          </div>
        </div>
      </div>

      <div className="px-6 mt-8">
        {jobStatus === 'new' && (
          <div className="bg-orange-50 rounded-3xl p-6 border-2 border-orange-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-2xl font-bold text-sm animate-pulse">
              {t.newJob}
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mt-4 mb-2">{job.problem}</h2>
            
            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <MapPin size={18} className="text-orange-500" />
                <span className="font-medium">{job.distance}</span>
              </div>
              <div className="flex items-center gap-1">
                <IndianRupee size={18} className="text-green-600" />
                <span className="font-bold text-green-700">{job.price}</span>
              </div>
            </div>

            <p className="text-gray-500 text-sm mb-6">{job.address}</p>

            <div className="flex gap-4">
              <button 
                onClick={() => setJobStatus('accepted')}
                className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-colors"
              >
                {t.accept}
              </button>
              <button className="px-6 bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-colors">
                {t.reject}
              </button>
            </div>
          </div>
        )}

        {jobStatus === 'accepted' && (
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Heading to {job.customer}</h2>
            
            <div className="bg-blue-50 p-4 rounded-2xl mb-6 flex items-start gap-3">
              <Navigation size={24} className="text-blue-600 shrink-0" />
              <p className="text-blue-900 font-medium">{job.address}</p>
            </div>

            <button 
              onClick={() => setJobStatus('arrived')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-colors flex justify-center items-center gap-2"
            >
              <Navigation size={20} />
              {t.navigate}
            </button>
            
            <button 
              onClick={() => setJobStatus('arrived')}
              className="w-full mt-4 bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-colors"
            >
              {t.arrived}
            </button>
          </div>
        )}

        {jobStatus === 'arrived' && (
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{t.enterOtp}</h2>
            <p className="text-gray-500 mb-6">Ask the customer for the 4-digit OTP</p>
            
            <input 
              type="text" 
              placeholder="----" 
              className="w-full text-center text-4xl tracking-[1em] font-bold py-4 border-2 border-gray-200 rounded-2xl mb-6 focus:border-gray-900 focus:ring-gray-900"
              maxLength={4}
            />

            <button 
              onClick={() => setJobStatus('completed')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-colors flex justify-center items-center gap-2"
            >
              <CheckCircle2 size={24} />
              {t.verify}
            </button>
          </div>
        )}

        {jobStatus === 'completed' && (
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Done!</h2>
            <p className="text-gray-500 mb-8">Collect payment from customer</p>
            
            <div className="bg-gray-50 p-6 rounded-2xl mb-8">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-2">Total Amount</p>
              <p className="text-4xl font-bold text-gray-900">₹450</p>
            </div>

            <button 
              onClick={() => setJobStatus('new')}
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-colors"
            >
              {t.collect}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
