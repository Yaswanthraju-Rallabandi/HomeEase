import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { PenTool, ArrowRight, X, RotateCcw, ArrowLeft, Loader2 } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function DrawInput() {
  const { language, user } = useAppContext();
  const navigate = useNavigate();
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const texts = {
    en: { title: 'Draw Problem', subtitle: 'Sketch what you need', clear: 'Clear', next: 'Search Nearby', analyzing: 'Analyzing...' },
    hi: { title: 'चित्र बनाएं', subtitle: 'जो चाहिए उसका चित्र बनाएं', clear: 'साफ़ करें', next: 'आसपास खोजें', analyzing: 'विश्लेषण कर रहे हैं...' },
    te: { title: 'గీయండి', subtitle: 'మీకు ఏమి కావాలో గీయండి', clear: 'క్లియర్ చేయండి', next: 'దగ్గరలో వెతకండి', analyzing: 'విశ్లేషిస్తోంది...' }
  };

  const t = texts[language];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match display size
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 5;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawingRef.current = true;
    lastPosRef.current = getPos(e);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const currentPos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();
    lastPosRef.current = currentPos;
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setAnalysisResult(null);
  };

  const handleNext = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;

    setIsAnalyzing(true);
    const imageData = canvas.toDataURL('image/jpeg');
    const result = await analyzeImage(imageData, language);
    setAnalysisResult(result);
    setIsAnalyzing(false);

    // Save to Firebase
    if (user && result) {
      try {
        await addDoc(collection(db, 'requests'), {
          userId: user.uid,
          type: 'draw',
          content: imageData,
          analysis: result,
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        console.error("Error saving request to Firebase:", err);
      }
    }

    navigate('/search-results', { state: { query: result?.category || 'Repair' } });
  };

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
        
        <div className="flex-1 bg-white/5 rounded-3xl border-2 border-dashed border-white/20 relative overflow-hidden flex items-center justify-center cursor-crosshair shadow-sm">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="absolute inset-0 w-full h-full touch-none"
          />
          {!hasDrawn && (
            <div className="text-gray-500 flex flex-col items-center pointer-events-none">
              <PenTool size={48} className="mb-2 opacity-50" />
              <span className="font-medium">Draw here</span>
            </div>
          )}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 z-20">
              <Loader2 size={48} className="text-blue-400 animate-spin" />
              <p className="font-bold text-white text-lg">{t.analyzing}</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-black/90 backdrop-blur-md border-t border-white/10 flex gap-4">
        <button
          onClick={clearCanvas}
          disabled={!hasDrawn || isAnalyzing}
          className="p-4 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white font-bold rounded-2xl transition-all border border-white/20 shadow-sm"
        >
          <RotateCcw size={24} />
        </button>
        <button
          onClick={handleNext}
          disabled={!hasDrawn || isAnalyzing}
          className="flex-1 bg-blue-700 hover:bg-blue-600 disabled:bg-white/10 disabled:text-gray-500 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-md"
        >
          {isAnalyzing ? <Loader2 className="animate-spin" /> : null}
          {isAnalyzing ? t.analyzing : t.next}
          {!isAnalyzing && <ArrowRight size={24} />}
        </button>
      </div>
    </div>
  );
}
