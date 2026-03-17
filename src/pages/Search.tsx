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
    <div className="min-h-full flex flex-col bg-gray-50">
      <div className="bg-white p-6 border-b border-gray-100 sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
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
            className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:ring-orange-500 focus:border-orange-500 transition-colors"
            placeholder={t.placeholder}
            autoFocus
          />
          <button
            type="submit"
            disabled={!query.trim()}
            className="mt-4 w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-orange-200"
          >
            {t.searchBtn}
            <ArrowRight size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}
