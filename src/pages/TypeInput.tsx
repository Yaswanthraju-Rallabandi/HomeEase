import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Search, ArrowRight, X, ArrowLeft } from 'lucide-react';

export default function TypeInput() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const texts = {
    en: { title: 'Type Problem', placeholder: 'Describe what needs fixing...', next: 'Find Repair Person' },
    hi: { title: 'लिखकर बताएं', placeholder: 'बताएं कि क्या ठीक करना है...', next: 'मिस्त्री खोजें' },
    te: { title: 'టైప్ చేయండి', placeholder: 'ఏమి రిపేర్ చేయాలో వివరించండి...', next: 'రిపేర్ వ్యక్తిని వెతకండి' }
  };

  const t = texts[language];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate('/search-results', { state: { query } });
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <div className="flex items-center gap-4 p-6 border-b border-gray-100 bg-white">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
      </div>

      <div className="flex-1 p-6">
        <form onSubmit={handleSearch} className="h-full flex flex-col">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 w-full p-6 border-2 border-gray-200 rounded-3xl text-xl focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none shadow-sm"
            placeholder={t.placeholder}
            autoFocus
          />
          
          <button
            type="submit"
            disabled={!query.trim()}
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-orange-200"
          >
            {t.next}
            <ArrowRight size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}
