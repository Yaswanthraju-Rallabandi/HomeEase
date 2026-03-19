/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("[v0] Error boundary caught:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[v0] Error details:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading App</h1>
            <p className="text-gray-400 mb-2">{this.state.error?.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function RootRedirect() {
  const { user, isPartner, authLoading } = useAppContext();
  console.log("[v0] RootRedirect - authLoading:", authLoading, "user:", user);
  if (authLoading) {
    return <div className="min-h-screen bg-black" />;
  }
  if (user) {
    console.log("[v0] Navigating to:", isPartner ? "/partner" : "/home");
    return <Navigate to={isPartner ? "/partner" : "/home"} replace />;
  }
  console.log("[v0] Navigating to /language");
  return <Navigate to="/language" replace />;
}

export default function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
