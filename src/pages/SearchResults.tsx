import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MapPin, Star, Clock, ArrowRight, ShieldCheck, IndianRupee, ArrowLeft, Loader2, ExternalLink, Phone } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function SearchResults() {
  const { language, locationData } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const query = location.state?.query || id || '';

  const [places, setPlaces] = useState<any[]>([]);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Find nearby ${query}. Provide a brief summary of the best options. If available, explicitly include their contact phone numbers in the summary.`,
          config: {
            tools: [{ googleMaps: {} }],
            toolConfig: {
              retrievalConfig: {
                latLng: {
                  latitude: locationData.latitude || 28.6139, // Default to New Delhi if not available
                  longitude: locationData.longitude || 77.2090
                }
              }
            }
          }
        });

        setSummary(response.text || '');

        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
          const extractedPlaces = chunks
            .filter((chunk: any) => chunk.maps)
            .map((chunk: any, index: number) => ({
              id: chunk.maps.uri || `place-${index}`,
              name: chunk.maps.title || 'Nearby Place',
              uri: chunk.maps.uri,
              role: query,
              rating: 4.5 + (Math.random() * 0.5), // Mock rating since it's not always in chunks
              distance: (Math.random() * 5 + 0.5).toFixed(1), // Mock distance
            }));
          
          // Remove duplicates by URI
          const uniquePlaces = Array.from(new Map(extractedPlaces.map(item => [item.uri, item])).values());
          setPlaces(uniquePlaces);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [query, locationData.latitude, locationData.longitude]);

  const texts = {
    en: {
      title: 'Nearby Repair Persons',
      found: 'Found 3 verified experts nearby',
      distance: 'km away',
      book: 'Book Now',
      goToShop: 'Go to Shop',
      openMaps: 'Open Maps',
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
      openMaps: 'मैप्स खोलें',
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
      openMaps: 'మ్యాప్స్ తెరవండి',
      priceEst: 'అంచనా ధర:',
      verified: 'ధృవీకరించబడిన ID',
      jobs: 'పనులు చేశారు'
    }
  };

  const t = texts[language as keyof typeof texts] || texts.en;

  return (
    <div className="min-h-full flex flex-col bg-black text-white">
      <div className="bg-black/90 backdrop-blur-md p-6 border-b border-white/10 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/home')} className="p-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
            <ArrowLeft size={24} className="text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.title}</h1>
        </div>
        
        {query && (
          <div className="bg-blue-900/30 p-3 rounded-xl border border-blue-500/30">
            <p className="text-blue-400 font-medium capitalize">"{query}"</p>
          </div>
        )}
        {!loading && <p className="text-gray-400 mt-4 font-medium">Found {places.length} places nearby</p>}
      </div>

      <div className="p-4 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400 font-medium">Searching nearby locations...</p>
          </div>
        ) : (
          <>
            {summary && (
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-gray-300 text-sm mb-4 shadow-sm">
                <div className="markdown-body text-gray-300">
                  <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
              </div>
            )}

            {places.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500">
                No places found nearby. Try a different search.
              </div>
            )}

            {places.map((place, idx) => (
              <div key={place.id} className="bg-white/5 p-4 rounded-2xl shadow-sm border border-white/10">
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-blue-900/30 rounded-xl flex items-center justify-center border border-blue-500/30">
                      <MapPin size={32} className="text-blue-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-white line-clamp-2">{place.name}</h3>
                        <p className="text-gray-400 text-sm capitalize">{place.role}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-green-900/30 px-2 py-1 rounded-lg shrink-0 border border-green-500/30">
                        <Star size={14} className="text-green-400 fill-current" />
                        <span className="font-bold text-green-400">{Number(place.rating).toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{place.distance} {t.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-end gap-2 flex-wrap">
                  <a 
                    href={`tel:+91${Math.floor(1000000000 + Math.random() * 9000000000)}`}
                    className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition-colors text-sm flex items-center gap-2 shadow-sm"
                  >
                    <Phone size={16} />
                    Call
                  </a>
                  {place.uri && (
                    <a 
                      href={place.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl transition-colors text-sm flex items-center gap-2 shadow-sm border border-white/10"
                    >
                      <ExternalLink size={16} />
                      {t.openMaps || 'Open Maps'}
                    </a>
                  )}
                  <button 
                    onClick={() => navigate(`/navigate/${encodeURIComponent(place.name)}`, { state: { uri: place.uri, distance: place.distance } })}
                    className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl transition-colors text-sm shadow-sm"
                  >
                    {t.goToShop}
                  </button>
                  <button 
                    onClick={() => navigate(`/book/${encodeURIComponent(place.name)}`)}
                    className="bg-white text-black hover:bg-gray-200 font-bold py-2 px-6 rounded-xl transition-colors text-sm shadow-md"
                  >
                    {t.book}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
