import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Camera, ArrowRight, X, Image as ImageIcon, ArrowLeft } from 'lucide-react';

export default function PhotoInput() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const [photoTaken, setPhotoTaken] = useState(false);

  const texts = {
    en: { title: 'Take a Photo', subtitle: 'Show us what you need', capture: 'Capture', retake: 'Retake', next: 'Search Nearby' },
    hi: { title: 'फोटो खींचें', subtitle: 'दिखाएं कि आपको क्या चाहिए', capture: 'फोटो लें', retake: 'फिर से लें', next: 'आसपास खोजें' },
    te: { title: 'ఫోటో తీయండి', subtitle: 'మీకు ఏమి కావాలో చూపించండి', capture: 'ఫోటో తీయండి', retake: 'మళ్లీ తీయండి', next: 'దగ్గరలో వెతకండి' }
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

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {!photoTaken ? (
          <div className="w-full h-full bg-white/5 rounded-3xl border-4 border-white/10 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
            <Camera size={64} className="text-gray-500 mb-4" />
            <p className="text-gray-400 text-center px-8">{t.subtitle}</p>
            
            {/* Viewfinder brackets */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-gray-500 rounded-tl-xl"></div>
            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-gray-500 rounded-tr-xl"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-gray-500 rounded-bl-xl"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-gray-500 rounded-br-xl"></div>
          </div>
        ) : (
          <div className="w-full h-full bg-white/5 rounded-3xl border-4 border-green-500 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
            <img src="https://images.unsplash.com/photo-1626806787426-5910811b6325?auto=format&fit=crop&q=80&w=400" alt="Broken washing machine" className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 border border-white/20 shadow-md">
                <ImageIcon size={20} className="text-white" />
                <span className="font-bold text-white">Washing Machine Detected</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 pb-12 bg-black/90 backdrop-blur-md border-t border-white/10">
        {!photoTaken ? (
          <button
            onClick={() => setPhotoTaken(true)}
            className="w-20 h-20 bg-white/10 rounded-full mx-auto border-4 border-white/20 flex items-center justify-center shadow-sm hover:bg-white/20 transition-all"
          >
            <div className="w-16 h-16 bg-white border-2 border-transparent rounded-full"></div>
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => setPhotoTaken(false)}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all border-2 border-white/20 shadow-sm"
            >
              {t.retake}
            </button>
            <button
              onClick={() => navigate('/search-results', { state: { query: 'Washing Machine Repair' } })}
              className="flex-1 bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-md"
            >
              {t.next}
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
