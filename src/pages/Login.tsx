import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Phone, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

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
      secure: 'Secure Login via Firebase',
      partnerLogin: 'Login as Repair Partner'
    },
    hi: {
      title: 'लॉग इन करें',
      subtitle: 'आगे बढ़ने के लिए अपना मोबाइल नंबर दर्ज करें',
      phonePlaceholder: 'मोबाइल नंबर',
      sendOtp: 'OTP भेजें',
      enterOtp: '4-अंकीय OTP दर्ज करें',
      verify: 'सत्यापित करें और लॉग इन करें',
      secure: 'फ़ायरबेस के माध्यम से सुरक्षित लॉगिन',
      partnerLogin: 'रिपेयर पार्टनर के रूप में लॉगिन करें'
    },
    te: {
      title: 'లాగిన్',
      subtitle: 'కొనసాగడానికి మీ మొబైల్ నంబర్‌ను నమోదు చేయండి',
      phonePlaceholder: 'మొబైల్ నంబర్',
      sendOtp: 'OTP పంపండి',
      enterOtp: '4-అంకెల OTP నమోదు చేయండి',
      verify: 'ధృవీకరించండి & లాగిన్ అవ్వండి',
      secure: 'ఫైర్‌బేస్ ద్వారా సురక్షిత లాగిన్',
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
      setUser({ phone, name: 'User' });
      navigate('/home');
    }
  };

  const handlePartnerLogin = () => {
    setIsPartner(true);
    setUser({ phone: '9999999999', name: 'Raju Plumber', role: 'partner' });
    navigate('/partner');
  };

  return (
    <div className="min-h-full flex flex-col p-8 bg-white relative">
      <button onClick={() => navigate(-1)} className="absolute top-6 left-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
        <ArrowLeft size={24} className="text-gray-600" />
      </button>
      <div className="mt-12 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-500 text-lg">{t.subtitle}</p>
      </div>

      <div className="space-y-6 flex-1">
        {!otpSent ? (
          <>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium">+91</span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="block w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder={t.phonePlaceholder}
              />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={phone.length < 10}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-orange-200"
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
                className="block w-full px-4 py-4 border-2 border-gray-200 rounded-2xl text-2xl tracking-[1em] text-center font-bold focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="----"
              />
            </div>

            <button
              onClick={handleVerify}
              disabled={otp.length < 4}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 px-6 rounded-2xl text-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-orange-200"
            >
              {t.verify}
              <ShieldCheck size={24} />
            </button>
            <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={16} className="text-green-500" />
              {t.secure}
            </p>
          </>
        )}
      </div>

      <div className="mt-auto pb-8">
        <button 
          onClick={handlePartnerLogin}
          className="w-full text-orange-600 font-medium py-4 border-2 border-orange-100 rounded-2xl hover:bg-orange-50 transition-colors"
        >
          {t.partnerLogin}
        </button>
      </div>
    </div>
  );
}
