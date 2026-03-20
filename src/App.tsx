/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import LanguageSelect from './pages/LanguageSelect';
import Login from './pages/Login';
import Home from './pages/Home';
import VoiceInput from './pages/VoiceInput';
import PhotoInput from './pages/PhotoInput';
import DrawInput from './pages/DrawInput';
import TypeInput from './pages/TypeInput';
import SearchResults from './pages/SearchResults';
import Booking from './pages/Booking';
import PartnerHome from './pages/PartnerHome';
import SOS from './pages/SOS';
import History from './pages/History';
import Profile from './pages/Profile';
import Search from './pages/Search';
import NavigationGuide from './pages/NavigationGuide';

function RootRedirect() {
  const { user, isPartner, authLoading } = useAppContext();
  
  // Show loading state while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-full flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to={isPartner ? "/partner" : "/home"} replace />;
  }
  return <Navigate to="/language" replace />;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RootRedirect />} />
            <Route path="language" element={<LanguageSelect />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="input/voice" element={<VoiceInput />} />
            <Route path="input/photo" element={<PhotoInput />} />
            <Route path="input/draw" element={<DrawInput />} />
            <Route path="input/type" element={<TypeInput />} />
            <Route path="search" element={<Search />} />
            <Route path="search-results" element={<SearchResults />} />
            <Route path="category/:id" element={<SearchResults />} />
            <Route path="book/:id" element={<Booking />} />
            <Route path="navigate/:id" element={<NavigationGuide />} />
            <Route path="partner" element={<PartnerHome />} />
            <Route path="sos" element={<SOS />} />
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
