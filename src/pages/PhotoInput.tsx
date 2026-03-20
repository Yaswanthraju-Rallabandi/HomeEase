import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Camera, ArrowRight, X, Image as ImageIcon, ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function PhotoInput() {
  const { language, user } = useAppContext();
  const navigate = useNavigate();
  const [photoTaken, setPhotoTaken] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const texts = {
    en: { title: 'Take a Photo', subtitle: 'Show us what you need', capture: 'Capture', retake: 'Retake', next: 'Search Nearby', analyzing: 'Analyzing...', error: 'Camera access denied' },
    hi: { title: 'फोटो खींचें', subtitle: 'दिखाएं कि आपको क्या चाहिए', capture: 'फोटो लें', retake: 'फिर से लें', next: 'आसपास खोजें', analyzing: 'विश्लेषण कर रहे हैं...', error: 'कैमरा एक्सेस नहीं मिला' },
    te: { title: 'ఫోటో తీయండి', subtitle: 'మీకు ఏమి కావాలో చూపించండి', capture: 'ఫోటో తీయండి', retake: 'మళ్లీ తీయండి', next: 'దగ్గరలో వెతకండి', analyzing: 'విశ్లేషిస్తోంది...', error: 'కెమెరా యాక్సెస్ తిరస్కరించబడింది' }
  };

  const t = texts[language];

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setCameraError(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError(t.error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        setPhotoTaken(true);
        stopCamera();
        handleAnalysis(dataUrl);
      }
    }
  };

  const handleAnalysis = async (imageData: string) => {
    setIsAnalyzing(true);
    const result = await analyzeImage(imageData, language);
    setAnalysisResult(result);
    setIsAnalyzing(false);

    // Save to Firebase
    if (user && result) {
      try {
        await addDoc(collection(db, 'requests'), {
          userId: user.uid,
          type: 'photo',
          content: imageData, // In a real app, we'd upload to Storage and save URL
          analysis: result,
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        console.error("Error saving request to Firebase:", err);
      }
    }
  };

  const resetCamera = () => {
    setPhotoTaken(false);
    setCapturedImage(null);
    setAnalysisResult(null);
    startCamera();
  };

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
          <div className="w-full aspect-[3/4] bg-white/5 rounded-3xl border-4 border-white/10 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
            {cameraError ? (
              <div className="text-center p-8">
                <Camera size={64} className="text-red-500 mb-4 mx-auto" />
                <p className="text-red-400 mb-4">{cameraError}</p>
                <button onClick={startCamera} className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 mx-auto">
                  <RefreshCw size={16} /> Retry
                </button>
              </div>
            ) : (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-white/50 rounded-tl-xl"></div>
                  <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-white/50 rounded-tr-xl"></div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-white/50 rounded-bl-xl"></div>
                  <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-white/50 rounded-br-xl"></div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="w-full aspect-[3/4] bg-white/5 rounded-3xl border-4 border-blue-500 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
            {capturedImage && <img src={capturedImage} alt="Captured issue" className="w-full h-full object-cover" />}
            
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4">
                <Loader2 size={48} className="text-blue-400 animate-spin" />
                <p className="font-bold text-white text-lg">{t.analyzing}</p>
              </div>
            )}

            {analysisResult && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
                <div className="bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                      <ImageIcon size={20} />
                    </div>
                    <h3 className="font-bold text-xl text-white">{analysisResult.problem}</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{analysisResult.description}</p>
                  <div className="inline-block bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
                    {analysisResult.category}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="p-6 pb-12 bg-black/90 backdrop-blur-md border-t border-white/10">
        {!photoTaken ? (
          <button
            onClick={capturePhoto}
            disabled={!!cameraError}
            className="w-20 h-20 bg-white/10 rounded-full mx-auto border-4 border-white/20 flex items-center justify-center shadow-sm hover:bg-white/20 transition-all active:scale-90 disabled:opacity-50"
          >
            <div className="w-16 h-16 bg-white border-2 border-transparent rounded-full"></div>
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={resetCamera}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all border-2 border-white/20 shadow-sm"
            >
              {t.retake}
            </button>
            <button
              disabled={isAnalyzing || !analysisResult}
              onClick={() => navigate('/search-results', { state: { query: analysisResult?.category || 'Repair' } })}
              className="flex-1 bg-blue-700 hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-md"
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
