import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { PenTool, ArrowRight, X, RotateCcw, ArrowLeft } from 'lucide-react';

export default function DrawInput() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const [hasDrawn, setHasDrawn] = useState(false);

  const texts = {
    en: { title: 'Draw Problem', subtitle: 'Sketch what you need', clear: 'Clear', next: 'Search Nearby' },
    hi: { title: 'चित्र बनाएं', subtitle: 'जो चाहिए उसका चित्र बनाएं', clear: 'साफ़ करें', next: 'आसपास खोजें' },
    te: { title: 'గీయండి', subtitle: 'మీకు ఏమి కావాలో గీయండి', clear: 'క్లియర్ చేయండి', next: 'దగ్గరలో వెతకండి' }
  };

  const t = texts[language];

  return (
    <div className="min-h-full flex flex-col bg-black text-white">
      <div className="flex items-center gap-4 p-6 bg-black/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <button onClick={() => navigate('/home')} className="p-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
          <ArrowLeft size={24} className="text-gray-300" />
        </button>
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <p className="text-gray-400 text-center mb-4">{t.subtitle}</p>
        
        <div 
          className="flex-1 bg-white/5 rounded-3xl border-2 border-dashed border-white/20 relative overflow-hidden flex items-center justify-center cursor-crosshair shadow-sm"
          onClick={() => setHasDrawn(true)}
        >
          {!hasDrawn ? (
            <div className="text-gray-500 flex flex-col items-center">
              <PenTool size={48} className="mb-2 opacity-50" />
              <span className="font-medium">Draw here</span>
            </div>
          ) : (
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 20 20 Q 40 10 60 30 T 80 80" stroke="#9ca3af" strokeWidth="2" fill="none" />
              <path d="M 30 50 L 70 50" stroke="#3b82f6" strokeWidth="4" fill="none" />
            </svg>
          )}
        </div>
      </div>

      <div className="p-6 bg-black/90 backdrop-blur-md border-t border-white/10 flex gap-4">
        <button
          onClick={() => setHasDrawn(false)}
          disabled={!hasDrawn}
          className="p-4 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white font-bold rounded-2xl transition-all border border-white/20 shadow-sm"
        >
          <RotateCcw size={24} />
        </button>
        <button
          onClick={() => navigate('/search-results', { state: { query: 'Pipe Leak Repair' } })}
          disabled={!hasDrawn}
          className="flex-1 bg-blue-700 hover:bg-blue-600 disabled:bg-white/10 disabled:text-gray-500 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-md"
        >
          {t.next}
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
