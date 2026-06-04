import { useState } from 'react';
import SectionPadding from '../../../layouts/SectionPadding';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [trackingCode, setTrackingCode] = useState('');
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[500px] sm:h-[500px] lg:h-[450px] flex items-center overflow-hidden bg-gradient-to-b from-[#faf9f6] via-[#f5f4ef] to-[#eceae3]">
      {/* Content */}
      <SectionPadding className="relative z-10 w-full max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Real-time global tracking
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight font-title">
            Track Any Flight
            <br />
            <span className="text-primary">Anywhere in the World</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real-time flight tracking with instant updates
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-xl shadow-xl shadow-slate-300/40 border border-slate-200">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Enter booking reference or flight number"
              className="flex-1 px-4 py-3 text-gray-900 rounded-lg focus:outline-none placeholder-gray-400 border-0 ring-0 focus:ring-0"
            />
            <button
              onClick={() => navigate(`/?trackingId=${trackingCode}`)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Track
            </button>
          </div>
        </div>
      </SectionPadding>
    </div>
  );
}
