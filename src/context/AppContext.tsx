import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

type Language = 'en' | 'hi' | 'te';

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  address: string;
  shortAddress: string;
  loading: boolean;
  error: string | null;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  user: any;
  setUser: (user: any) => void;
  isPartner: boolean;
  setIsPartner: (isPartner: boolean) => void;
  locationData: LocationData;
  requestLocation: () => void;
  authLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });
  const [user, setUser] = useState<any>(null);
  const [isPartner, setIsPartner] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [locationData, setLocationData] = useState<LocationData>({
    latitude: null,
    longitude: null,
    address: '123, Gandhi Nagar, Near Main Market, Tier 2 City, 123456',
    shortAddress: 'Detecting location...',
    loading: false,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData);
            setIsPartner(userData.role === 'partner');
          } else {
            // Create a new user profile if it doesn't exist
            const newUserData = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'New User',
              email: firebaseUser.email || '',
              phone: firebaseUser.phoneNumber || '',
              role: 'user',
              createdAt: new Date().toISOString()
            };
            await setDoc(userDocRef, newUserData);
            setUser(newUserData);
            setIsPartner(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
        setIsPartner(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationData(prev => ({ ...prev, error: 'Geolocation not supported', shortAddress: 'Location not supported' }));
      return;
    }

    setLocationData(prev => ({ ...prev, loading: true, error: null, shortAddress: 'Locating...' }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Reverse geocoding using Nominatim
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          
          if (data && data.display_name) {
            const addressParts = data.address || {};
            const city = addressParts.city || addressParts.town || addressParts.village || addressParts.county || addressParts.state_district || 'Current Location';
            const area = addressParts.suburb || addressParts.neighbourhood || addressParts.residential || '';
            
            const shortAddr = area ? `${area}, ${city}` : city;
            
            setLocationData({
              latitude,
              longitude,
              address: data.display_name,
              shortAddress: shortAddr,
              loading: false,
              error: null
            });
          } else {
            throw new Error('No address found');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          setLocationData({
            latitude,
            longitude,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            shortAddress: 'Location found',
            loading: false,
            error: 'Could not fetch address name'
          });
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationData(prev => ({ 
          ...prev, 
          loading: false, 
          error: 'Permission denied or unavailable',
          shortAddress: 'Location access denied'
        }));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Auto-request location on mount
  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <AppContext.Provider value={{ language, setLanguage, user, setUser, isPartner, setIsPartner, locationData, requestLocation, authLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
