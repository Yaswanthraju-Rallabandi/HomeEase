import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft } from 'lucide-react';
import { ShapeLandingHero } from '../components/ui/shape-landing-hero';

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
    <div className="min-h-full relative bg-black flex flex-col">
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-6 left-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50 border border-white/10"
      >
        <ArrowLeft size={24} className="text-white" />
      </button>

      <ShapeLandingHero
        badge="HomeEase"
        title1="Your Home Problems"
        title2="Solved Easily"
      >
        <div className="w-full space-y-4 relative z-50">
          <h2 className="text-lg font-medium text-gray-400 mb-6 text-center tracking-wide">Choose your language</h2>
          
          <button 
            onClick={() => handleSelect('en')}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-6 rounded-2xl text-xl transition-all shadow-md flex justify-between items-center border border-white/10"
          >
            <span>English</span>
            <span className="text-gray-400 text-sm">A</span>
          </button>

          <button 
            onClick={() => handleSelect('hi')}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-6 rounded-2xl text-xl transition-all shadow-md flex justify-between items-center border border-white/10"
          >
            <span>हिंदी</span>
            <span className="text-gray-400 text-sm">अ</span>
          </button>

          <button 
            onClick={() => handleSelect('te')}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-6 rounded-2xl text-xl transition-all shadow-md flex justify-between items-center border border-white/10"
          >
            <span>తెలుగు</span>
            <span className="text-gray-400 text-sm">అ</span>
          </button>
        </div>
      </ShapeLandingHero>
    </div>
  );
}
