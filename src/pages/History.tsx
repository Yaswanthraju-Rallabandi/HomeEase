import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Clock, CheckCircle2, IndianRupee, MapPin, ArrowLeft } from 'lucide-react';

export default function History() {
  const { language } = useAppContext();
  const navigate = useNavigate();

  const texts = {
    en: { title: 'History', completed: 'Completed', amount: 'Amount' },
    hi: { title: 'इतिहास', completed: 'पूरा हुआ', amount: 'रकम' },
    te: { title: 'చరిత్ర', completed: 'పూర్తయింది', amount: 'మొత్తం' }
  };

  const t = texts[language];

  const jobs = [
    {
      id: 1,
      title: 'AC Gas Refill',
      date: '12 Oct 2023',
      provider: 'Suresh Singh',
      amount: 1200,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Tap Leak Repair',
      date: '05 Sep 2023',
      provider: 'Venkat Rao',
      amount: 450,
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <div className="bg-white p-6 border-b border-gray-100 sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
      </div>

      <div className="p-4 space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
                <p className="text-gray-500 text-sm">{job.date}</p>
              </div>
              <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg text-sm font-medium">
                <CheckCircle2 size={14} />
                {t.completed}
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <img src={`https://i.pravatar.cc/150?img=${job.id + 10}`} alt="" className="w-6 h-6 rounded-full" />
              <span className="text-sm">{job.provider}</span>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-gray-500 text-sm">{t.amount}</span>
              <span className="font-bold text-gray-900 flex items-center">
                <IndianRupee size={16} />
                {job.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
