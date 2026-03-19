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
    en: { title: 'Profile', language: 'Language', settings: 'Settings', help: 'Help & Support', logout: 'Logout', login: 'Login' },
    hi: { title: 'प्रोफ़ाइल', language: 'भाषा', settings: 'सेटिंग्स', help: 'मदद', logout: 'लॉग आउट', login: 'लॉग इन करें' },
    te: { title: 'ప్రొఫైల్', language: 'భాష', settings: 'సెట్టింగ్‌లు', help: 'సహాయం', logout: 'లాగ్ అవుట్', login: 'లాగిన్ చేయండి' }
  };

  const t = texts[language];

  const handleLogout = async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
      localStorage.removeItem('mockUser');
      setUser(null);
      setIsPartner(false);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-full flex flex-col bg-black text-white">
      <div className="bg-black/90 backdrop-blur-md p-6 border-b border-white/10 sticky top-0 z-10 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/20">
          <ArrowLeft size={24} className="text-gray-300" />
        </button>
        <h1 className="text-2xl font-bold text-white">{t.title}</h1>
      </div>

      <div className="p-6">
        <div className="bg-white/5 p-6 rounded-2xl shadow-sm border border-white/10 flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-500/30">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <User size={32} className="text-blue-400" />
            )}
          </div>
          <div>
            <h2 className="font-bold text-xl text-white">{user?.name || 'Guest User'}</h2>
            <p className="text-gray-400">{user?.email || 'Not logged in'}</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl shadow-sm border border-white/10 overflow-hidden">
          <button 
            onClick={() => navigate('/language')}
            className="w-full p-4 flex items-center justify-between border-b border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-gray-400" />
              <span className="font-medium text-gray-200">{t.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 uppercase font-bold">{language}</span>
              <ChevronRight size={20} className="text-gray-500" />
            </div>
          </button>

          <button className="w-full p-4 flex items-center justify-between border-b border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-gray-400" />
              <span className="font-medium text-gray-200">{t.settings}</span>
            </div>
            <ChevronRight size={20} className="text-gray-500" />
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle size={20} className="text-gray-400" />
              <span className="font-medium text-gray-200">{t.help}</span>
            </div>
            <ChevronRight size={20} className="text-gray-500" />
          </button>
        </div>

        {user ? (
          <button 
            onClick={handleLogout}
            className="w-full mt-8 bg-white/5 hover:bg-white/10 border-2 border-white/10 text-white font-bold py-4 rounded-2xl transition-colors flex justify-center items-center gap-2"
          >
            <LogOut size={20} />
            {t.logout}
          </button>
        ) : (
          <button 
            onClick={handleLogin}
            className="w-full mt-8 bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-colors flex justify-center items-center gap-2 shadow-md"
          >
            <LogIn size={20} />
            {t.login}
          </button>
        )}
      </div>
    </div>
  );
}
