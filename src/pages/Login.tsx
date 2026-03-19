import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Phone, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { ShapeLandingHero } from '../components/ui/shape-landing-hero';

export default function Login() {
  const { language, user, isPartner, setUser, setIsPartner } = useAppContext();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  React.useEffect(() => {
    if (user) {
      navigate(isPartner ? '/partner' : '/home', { replace: true });
    }
  }, [user, isPartner, navigate]);

  const texts = {
    en: {
      title: 'Login',
      subtitle: 'Enter your mobile number to continue',
      phonePlaceholder: 'Mobile Number',
      sendOtp: 'Send OTP',
      enterOtp: 'Enter 4-digit OTP',
      verify: 'Verify & Login',
      secure: 'Secure Login',
      partnerLogin: 'Login as Repair Partner'
    },
    hi: {
      title: 'लॉग इन करें',
      subtitle: 'आगे बढ़ने के लिए अपना मोबाइल नंबर दर्ज करें',
      phonePlaceholder: 'मोबाइल नंबर',
      sendOtp: 'OTP भेजें',
      enterOtp: '4-अंकीय OTP दर्ज करें',
      verify: 'सत्यापित करें और लॉग इन करें',
      secure: 'सुरक्षित लॉगिन',
      partnerLogin: 'रिपेयर पार्टनर के रूप में लॉगिन करें'
    },
    te: {
      title: 'లాగిన్',
      subtitle: 'కొనసాగడానికి మీ మొబైల్ నంబర్‌ను నమోదు చేయండి',
      phonePlaceholder: 'మొబైల్ నంబర్',
      sendOtp: 'OTP పంపండి',
      enterOtp: '4-అంకెల OTP నమోదు చేయండి',
      verify: 'ధృవీకరించండి & లాగిన్ అవ్వండి',
      secure: 'సురక్షిత లాగిన్',
      partnerLogin: 'రిపేర్ పార్టనర్‌గా లాగిన్ అవ్వండి'
    }
  };

  const t = texts[language];

  const handleSendOtp = () => {
    if (phone.length >= 10) {
      setOtpSent(true);
      // Simulate auto-read OTP
      setTimeout(() => {
        setOtp('1234');
      }, 1500);
    }
  };

  const handleVerify = () => {
    if (otp === '1234') {
      const mockUser = {
        uid: 'mock-user-' + Date.now(),
        name: 'User',
        phone: phone,
        role: 'user'
      };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsPartner(false);
      navigate('/home');
    }
  };

  const handlePartnerLogin = () => {
    const mockPartner = {
      uid: 'mock-partner-' + Date.now(),
      name: 'Raju Plumber',
      phone: '9999999999',
      role: 'partner'
    };
    localStorage.setItem('mockUser', JSON.stringify(mockPartner));
    setUser(mockPartner);
    setIsPartner(true);
    navigate('/partner');
  };

  return (
    <div className="min-h-full relative bg-black flex flex-col">
      <button onClick={() => navigate(-1)} className="absolute top-6 left-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50 border border-white/10">
        <ArrowLeft size={24} className="text-white" />
      </button>

      <ShapeLandingHero
        badge={t.secure}
        title1="HomeEase"
        title2={t.title}
      >
        <div className="w-full space-y-6 relative z-50 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl">
          <p className="text-gray-300 text-lg text-center font-medium mb-4">{t.subtitle}</p>
          
          {!otpSent ? (
            <>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-medium">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="block w-full pl-14 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-xl font-medium text-white focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-500 shadow-sm"
                  placeholder={t.phonePlaceholder}
                  autoComplete="tel"
                  autoFocus
                />
              </div>

              <button
                onClick={handleSendOtp}
                disabled={phone.length < 10}
                className="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-white/5 disabled:text-gray-500 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-900/20"
              >
                {t.sendOtp}
                <ArrowRight size={24} />
              </button>
            </>
          ) : (
            <>
              <div className="relative">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="block w-full px-4 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-3xl tracking-[1em] text-center font-bold text-white focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-500 shadow-sm"
                  placeholder="----"
                  autoComplete="one-time-code"
                  autoFocus
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={otp.length < 4}
                className="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-white/5 disabled:text-gray-500 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-900/20"
              >
                {t.verify}
                <ShieldCheck size={24} />
              </button>
              <p className="text-center text-sm text-gray-400 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck size={16} className="text-blue-400" />
                {t.secure}
              </p>
            </>
          )}

          <div className="pt-4 mt-4 border-t border-white/10">
            <button 
              onClick={handlePartnerLogin}
              className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-2xl transition-colors shadow-sm border border-white/10"
            >
              {t.partnerLogin}
            </button>
          </div>
        </div>
      </ShapeLandingHero>
    </div>
  );
}
