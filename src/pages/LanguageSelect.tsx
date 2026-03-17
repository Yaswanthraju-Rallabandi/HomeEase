import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function LanguageSelect() {
  const { setLanguage, user, isPartner } = useAppContext();
  const navigate = useNavigate();

  const handleSelect = (lang: 'en' | 'hi' | 'te') => {
    setLanguage(lang);
    if (user) {
      navigate(isPartner ? '/partner' : '/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-orange-50 to-white relative">
      <button onClick={() => navigate(-1)} className="absolute top-6 left-6 p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors">
        <ArrowLeft size={24} className="text-orange-600" />
      </button>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-orange-200"
      >
        <span className="text-white text-4xl font-bold">HE</span>
      </motion.div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">HomeEase</h1>
      <p className="text-gray-500 mb-12 text-center">Your Home Problems, Solved Easily</p>

      <div className="w-full space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Choose your language</h2>
        
        <button 
          onClick={() => handleSelect('en')}
          className="w-full bg-white border-2 border-orange-100 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-medium py-4 px-6 rounded-2xl text-xl transition-all shadow-sm flex justify-between items-center"
        >
          <span>English</span>
          <span className="text-gray-400 text-sm">A</span>
        </button>

        <button 
          onClick={() => handleSelect('hi')}
          className="w-full bg-white border-2 border-orange-100 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-medium py-4 px-6 rounded-2xl text-xl transition-all shadow-sm flex justify-between items-center"
        >
          <span>हिंदी</span>
          <span className="text-gray-400 text-sm">अ</span>
        </button>

        <button 
          onClick={() => handleSelect('te')}
          className="w-full bg-white border-2 border-orange-100 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-medium py-4 px-6 rounded-2xl text-xl transition-all shadow-sm flex justify-between items-center"
        >
          <span>తెలుగు</span>
          <span className="text-gray-400 text-sm">అ</span>
        </button>
      </div>
    </div>
  );
}
