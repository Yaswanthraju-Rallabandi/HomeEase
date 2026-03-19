import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Clock, User, PhoneCall } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Layout() {
  const { isPartner } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("[v0] Layout rendered - location:", location.pathname, "isPartner:", isPartner);

  const fullScreenPages = [
    '/', 
    '/language',
    '/login', 
    '/sos', 
    '/input/voice', 
    '/input/photo', 
    '/input/draw', 
    '/input/type',
    '/search-results'
  ];
  const isFullScreen = fullScreenPages.some(path => location.pathname === path || location.pathname.startsWith('/book/') || location.pathname.startsWith('/category/') || location.pathname.startsWith('/navigate/'));

  if (isFullScreen) {
    return (
      <div className="min-h-screen bg-black flex justify-center sm:items-center sm:p-4 relative overflow-hidden">
        <div className="w-full max-w-md bg-black h-[100dvh] sm:h-[90vh] sm:rounded-[2.5rem] sm:shadow-2xl overflow-hidden relative sm:border-[8px] sm:border-gray-800 z-10">
          <div className="h-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex justify-center sm:items-center sm:p-4 relative overflow-hidden">
      <div className="w-full max-w-md bg-black h-[100dvh] sm:h-[90vh] sm:rounded-[2.5rem] sm:shadow-2xl overflow-hidden relative sm:border-[8px] sm:border-gray-800 flex flex-col z-10">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto pb-28 sm:pb-20">
          <Outlet />
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/10 flex justify-around items-center py-3 px-6 pb-safe sm:pb-6 sm:rounded-b-[2rem]">
          <button 
            onClick={() => navigate(isPartner ? '/partner' : '/home')}
            className={`flex flex-col items-center gap-1 ${location.pathname === (isPartner ? '/partner' : '/home') ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Home size={24} />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          
          {!isPartner && (
            <button 
              onClick={() => navigate('/search')}
              className={`flex flex-col items-center gap-1 ${location.pathname === '/search' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Search size={24} />
              <span className="text-[10px] font-medium">Search</span>
            </button>
          )}

          <button 
            onClick={() => navigate('/history')}
            className={`flex flex-col items-center gap-1 ${location.pathname === '/history' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Clock size={24} />
            <span className="text-[10px] font-medium">History</span>
          </button>

          <button 
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <User size={24} />
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
