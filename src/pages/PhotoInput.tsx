import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Camera, ArrowRight, X, Image as ImageIcon, ArrowLeft } from 'lucide-react';

export default function PhotoInput() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const [photoTaken, setPhotoTaken] = useState(false);

  const texts = {
    en: { title: 'Take a Photo', subtitle: 'Show us what needs fixing', capture: 'Capture', retake: 'Retake', next: 'Find Repair Person' },
    hi: { title: 'फोटो खींचें', subtitle: 'दिखाएं कि क्या ठीक करना है', capture: 'फोटो लें', retake: 'फिर से लें', next: 'मिस्त्री खोजें' },
    te: { title: 'ఫోటో తీయండి', subtitle: 'ఏమి రిపేర్ చేయాలో చూపించండి', capture: 'ఫోటో తీయండి', retake: 'మళ్లీ తీయండి', next: 'రిపేర్ వ్యక్తిని వెతకండి' }
  };

  const t = texts[language];

  return (
    <div className="min-h-full flex flex-col bg-gray-900 text-white">
      <div className="flex items-center gap-4 p-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-800 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">{t.title}</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {!photoTaken ? (
          <div className="w-full h-full bg-gray-800 rounded-3xl border-4 border-gray-700 flex flex-col items-center justify-center relative overflow-hidden">
            <Camera size={64} className="text-gray-600 mb-4" />
            <p className="text-gray-400 text-center px-8">{t.subtitle}</p>
            
            {/* Viewfinder brackets */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-orange-500 rounded-tl-xl"></div>
            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-orange-500 rounded-tr-xl"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-orange-500 rounded-bl-xl"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-orange-500 rounded-br-xl"></div>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-800 rounded-3xl border-4 border-green-500 flex flex-col items-center justify-center relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1626806787426-5910811b6325?auto=format&fit=crop&q=80&w=400" alt="Broken washing machine" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2">
                <ImageIcon size={20} />
                <span className="font-bold">Washing Machine Detected</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 pb-12">
        {!photoTaken ? (
          <button
            onClick={() => setPhotoTaken(true)}
            className="w-20 h-20 bg-white rounded-full mx-auto border-4 border-gray-300 flex items-center justify-center shadow-lg shadow-white/10"
          >
            <div className="w-16 h-16 bg-white border-2 border-gray-900 rounded-full"></div>
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => setPhotoTaken(false)}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all"
            >
              {t.retake}
            </button>
            <button
              onClick={() => navigate('/search-results', { state: { query: 'Washing Machine Repair' } })}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2"
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
