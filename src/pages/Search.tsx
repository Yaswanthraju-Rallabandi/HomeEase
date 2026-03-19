import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Search as SearchIcon, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Search() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const texts = {
    en: { title: 'Search', placeholder: 'What do you need help with?', searchBtn: 'Search' },
    hi: { title: 'खोजें', placeholder: 'आपको किस चीज़ में मदद चाहिए?', searchBtn: 'खोजें' },
    te: { title: 'వెతకండి', placeholder: 'మీకు దేనిలో సహాయం కావాలి?', searchBtn: 'వెతకండి' }
  };

  const t = texts[language];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate('/search-results', { state: { query } });
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-black text-white">
      <div className="bg-black/90 backdrop-blur-md p-6 border-b border-white/10 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate('/home')} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/20">
          <ArrowLeft size={24} className="text-gray-300" />
        </button>
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
      </div>

      <div className="p-6">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-lg text-white focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-500 shadow-sm"
            placeholder={t.placeholder}
            autoFocus
          />
          <button
            type="submit"
            disabled={!query.trim()}
            className="mt-4 w-full bg-blue-700 hover:bg-blue-600 disabled:bg-white/10 disabled:text-gray-500 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-md"
          >
            {t.searchBtn}
            <ArrowRight size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}
