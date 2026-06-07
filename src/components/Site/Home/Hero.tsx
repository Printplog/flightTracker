import { useState } from 'react';
import SectionPadding from '../../../layouts/SectionPadding';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [trackingCode, setTrackingCode] = useState('');
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-purple-950 overflow-hidden">
      <SectionPadding className="relative z-10 max-w-7xl mx-auto w-full py-12 sm:py-16 md:py-20 lg:py-28">

        {/* Left: text & search */}
        <div className="w-full md:w-[55%] flex flex-col">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider self-start">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Real-time global tracking
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-4 leading-tight font-hero">
            Track Any Flight
            <br />
            <span className="text-purple-300">Anywhere in the World</span>
          </h1>

          <p className="text-lg text-slate-300 max-w-lg mb-8">
            Real-time flight tracking with instant updates
          </p>

          {/* Search Box */}
          <div className="w-full max-w-xl">
            <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-xl border border-slate-200">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Enter booking reference or flight number"
                className="flex-1 px-4 py-3 text-gray-900 rounded-lg focus:outline-none placeholder-gray-400 border-0 ring-0 focus:ring-0 font-sans"
              />
              <button
                onClick={() => navigate(`/?trackingId=${trackingCode}`)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border-0 cursor-pointer shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Track
              </button>
            </div>
          </div>
        </div>

        {/* Mobile image — stacks below text on small screens */}
        <div className="mt-8 md:hidden relative rounded-2xl overflow-hidden h-56 sm:h-72">
          <img
            src="/hero.png"
            alt="Airplane"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent" />
        </div>

      </SectionPadding>

      {/* Desktop: diagonal image panel */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[48%] [clip-path:polygon(80px_0,_100%_0,_100%_100%,_0_100%)]">
        <img
          src="/hero.png"
          alt="Airplane"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent z-10" />
      </div>

    </div>

  );
}
