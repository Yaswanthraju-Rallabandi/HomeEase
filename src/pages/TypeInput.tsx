import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Search, ArrowRight, X, ArrowLeft, Loader2 } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function TypeInput() {
  const { language, user } = useAppContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const texts = {
    en: { title: 'Type Problem', placeholder: 'Describe what you need...', next: 'Search Nearby', saving: 'Saving...' },
    hi: { title: 'लिखकर बताएं', placeholder: 'बताएं कि आपको क्या चाहिए...', next: 'आसपास खोजें', saving: 'सहेज रहे हैं...' },
    te: { title: 'టైప్ చేయండి', placeholder: 'మీకు ఏమి కావాలో వివరించండి...', next: 'దగ్గరలో వెతకండి', saving: 'సేవ్ చేస్తోంది...' }
  };

  const t = texts[language];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSaving(true);
      // Save to Firebase
      if (user) {
        try {
          await addDoc(collection(db, 'requests'), {
            userId: user.uid,
            type: 'type',
            content: query,
            createdAt: new Date().toISOString()
          });
        } catch (err) {
          console.error("Error saving request to Firebase:", err);
        }
      }
      setIsSaving(false);
      navigate('/search-results', { state: { query } });
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-black text-white">
      <div className="flex items-center gap-4 p-6 bg-black/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <button onClick={() => navigate('/home')} className="p-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
          <ArrowLeft size={24} className="text-gray-300" />
        </button>
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
      </div>

      <div className="flex-1 p-6">
        <form onSubmit={handleSearch} className="h-full flex flex-col">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 w-full p-6 bg-white/5 border-2 border-white/10 rounded-3xl text-xl text-white focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none shadow-sm placeholder:text-gray-500"
            placeholder={t.placeholder}
            autoFocus
          />
          
          <button
            type="submit"
            disabled={!query.trim() || isSaving}
            className="mt-6 w-full bg-blue-700 hover:bg-blue-600 disabled:bg-white/10 disabled:text-gray-500 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-md"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : null}
            {isSaving ? t.saving : t.next}
            {!isSaving && <ArrowRight size={24} />}
          </button>
        </form>
      </div>
    </div>
  );
}
