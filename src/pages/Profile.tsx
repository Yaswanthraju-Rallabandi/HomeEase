import React from 'react';
import { useAppContext } from '../context/AppContext';
import { User, Settings, HelpCircle, LogOut, ChevronRight, Globe, ArrowLeft, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Profile() {
  const { language, setLanguage, user, setUser, setIsPartner } = useAppContext();
  const navigate = useNavigate();

  const texts = {
    en: { title: 'Profile', language: 'Language', settings: 'Settings', help: 'Help & Support', logout: 'Logout', login: 'Login with Google' },
    hi: { title: 'प्रोफ़ाइल', language: 'भाषा', settings: 'सेटिंग्स', help: 'मदद', logout: 'लॉग आउट', login: 'Google से लॉगिन करें' },
    te: { title: 'ప్రొఫైల్', language: 'భాష', settings: 'సెట్టింగ్‌లు', help: 'సహాయం', logout: 'లాగ్ అవుట్', login: 'Google తో లాగిన్ చేయండి' }
  };

  const t = texts[language];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsPartner(false);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // AppContext will handle the rest via onAuthStateChanged
    } catch (error) {
      console.error("Error signing in:", error);
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
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <User size={32} className="text-orange-600" />
            )}
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-900">{user?.name || 'Guest User'}</h2>
            <p className="text-gray-500">{user?.email || 'Not logged in'}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button 
            onClick={() => navigate('/language')}
            className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-gray-400" />
              <span className="font-medium text-gray-700">{t.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 uppercase">{language}</span>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </button>

          <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-gray-400" />
              <span className="font-medium text-gray-700">{t.settings}</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle size={20} className="text-gray-400" />
              <span className="font-medium text-gray-700">{t.help}</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {user ? (
          <button 
            onClick={handleLogout}
            className="w-full mt-8 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-4 rounded-2xl transition-colors flex justify-center items-center gap-2"
          >
            <LogOut size={20} />
            {t.logout}
          </button>
        ) : (
          <button 
            onClick={handleLogin}
            className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-colors flex justify-center items-center gap-2 shadow-lg shadow-orange-200"
          >
            <LogIn size={20} />
            {t.login}
          </button>
        )}
      </div>
    </div>
  );
}
