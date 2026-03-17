import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { PenTool, ArrowRight, X, RotateCcw, ArrowLeft } from 'lucide-react';

export default function DrawInput() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const [hasDrawn, setHasDrawn] = useState(false);

  const texts = {
    en: { title: 'Draw Problem', subtitle: 'Sketch what needs fixing', clear: 'Clear', next: 'Find Repair Person' },
    hi: { title: 'चित्र बनाएं', subtitle: 'जो ठीक करना है उसका चित्र बनाएं', clear: 'साफ़ करें', next: 'मिस्त्री खोजें' },
    te: { title: 'గీయండి', subtitle: 'ఏమి రిపేర్ చేయాలో గీయండి', clear: 'క్లియర్ చేయండి', next: 'రిపేర్ వ్యక్తిని వెతకండి' }
  };

  const t = texts[language];

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <div className="flex items-center gap-4 p-6 border-b border-gray-100 bg-white">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <p className="text-gray-500 text-center mb-4">{t.subtitle}</p>
        
        <div 
          className="flex-1 bg-white rounded-3xl border-2 border-dashed border-gray-300 relative overflow-hidden flex items-center justify-center cursor-crosshair"
          onClick={() => setHasDrawn(true)}
        >
          {!hasDrawn ? (
            <div className="text-gray-300 flex flex-col items-center">
              <PenTool size={48} className="mb-2 opacity-50" />
              <span className="font-medium">Draw here</span>
            </div>
          ) : (
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 20 20 Q 40 10 60 30 T 80 80" stroke="black" strokeWidth="2" fill="none" />
              <path d="M 30 50 L 70 50" stroke="red" strokeWidth="4" fill="none" />
            </svg>
          )}
        </div>
      </div>

      <div className="p-6 bg-white border-t border-gray-100 flex gap-4">
        <button
          onClick={() => setHasDrawn(false)}
          disabled={!hasDrawn}
          className="p-4 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 font-bold rounded-2xl transition-all"
        >
          <RotateCcw size={24} />
        </button>
        <button
          onClick={() => navigate('/search-results', { state: { query: 'Pipe Leak Repair' } })}
          disabled={!hasDrawn}
          className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2"
        >
          {t.next}
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
