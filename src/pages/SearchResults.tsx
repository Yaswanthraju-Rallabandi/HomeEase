import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MapPin, Star, Clock, ArrowRight, ShieldCheck, IndianRupee, ArrowLeft } from 'lucide-react';

export default function SearchResults() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const query = location.state?.query || id || '';

  const texts = {
    en: {
      title: 'Nearby Repair Persons',
      found: 'Found 3 verified experts nearby',
      distance: 'km away',
      book: 'Book Now',
      goToShop: 'Go to Shop',
      priceEst: 'Est. Price:',
      verified: 'Verified ID',
      jobs: 'jobs done'
    },
    hi: {
      title: 'आसपास के मिस्त्री',
      found: 'आसपास 3 सत्यापित विशेषज्ञ मिले',
      distance: 'किमी दूर',
      book: 'अभी बुक करें',
      goToShop: 'दुकान पर जाएं',
      priceEst: 'अनुमानित कीमत:',
      verified: 'सत्यापित आईडी',
      jobs: 'काम किए'
    },
    te: {
      title: 'దగ్గరలోని రిపేర్ వ్యక్తులు',
      found: 'దగ్గరలో 3 ధృవీకరించబడిన నిపుణులు దొరికారు',
      distance: 'కి.మీ దూరం',
      book: 'ఇప్పుడే బుక్ చేయండి',
      goToShop: 'షాపుకు వెళ్లండి',
      priceEst: 'అంచనా ధర:',
      verified: 'ధృవీకరించబడిన ID',
      jobs: 'పనులు చేశారు'
    }
  };

  const t = texts[language];

  const providers = [
    {
      id: 'p1',
      name: 'Ramesh Kumar',
      role: 'Washing Machine Expert',
      rating: 4.8,
      jobs: 342,
      distance: 1.2,
      price: '₹300 - ₹500',
      image: 'https://i.pravatar.cc/150?img=11',
      verified: true
    },
    {
      id: 'p2',
      name: 'Suresh Singh',
      role: 'Appliance Repair',
      rating: 4.6,
      jobs: 128,
      distance: 2.5,
      price: '₹250 - ₹600',
      image: 'https://i.pravatar.cc/150?img=12',
      verified: true
    },
    {
      id: 'p3',
      name: 'Venkat Rao',
      role: 'All-round Mechanic',
      rating: 4.9,
      jobs: 512,
      distance: 3.1,
      price: '₹400 - ₹800',
      image: 'https://i.pravatar.cc/150?img=13',
      verified: true
    }
  ];

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <div className="bg-white p-6 border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        </div>
        
        {query && (
          <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
            <p className="text-orange-800 font-medium capitalize">"{query}"</p>
          </div>
        )}
        <p className="text-gray-500 mt-4 font-medium">{t.found}</p>
      </div>

      <div className="p-4 space-y-4">
        {providers.map((provider) => (
          <div key={provider.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex gap-4">
              <div className="relative">
                <img 
                  src={provider.image} 
                  alt={provider.name} 
                  className="w-20 h-20 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                {provider.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full border-2 border-white">
                    <ShieldCheck size={16} />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{provider.name}</h3>
                    <p className="text-gray-500 text-sm">{provider.role}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                    <Star size={14} className="text-green-600 fill-current" />
                    <span className="font-bold text-green-700">{provider.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{provider.distance} {t.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{provider.jobs} {t.jobs}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{t.priceEst}</p>
                <p className="font-bold text-lg text-gray-900 flex items-center">
                  {provider.price}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate(`/navigate/${provider.id}`)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-2 px-4 rounded-xl transition-colors text-sm"
                >
                  {t.goToShop}
                </button>
                <button 
                  onClick={() => navigate(`/book/${provider.id}`)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-xl transition-colors"
                >
                  {t.book}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
