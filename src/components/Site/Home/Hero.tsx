import { useState } from 'react';
import SectionPadding from '../../../layouts/SectionPadding';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [trackingCode, setTrackingCode] = useState('');
  const navigate = useNavigate()

  return (
    <SectionPadding className="relative h-[500px]">
      <img src="/sea2.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
      
      {/* Content Overlay */}
      <div className="relative z-1 h-full flex items-center">
        <div className=" w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              EXPLORE PREMIUM SHIPPING OPTIONS FOR YOUR CARGO
            </h1>
            
            {/* Tracking Form */}
            <div className="flex flex-col sm:flex-row gap-0 max-w-md">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Enter tracking number..."
                className="flex-1 px-4 py-3 text-gray-900 bg-white border-0 rounded-l-md sm:rounded-r-none rounded-r-md focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-500"
              />
              <button onClick={() => navigate(`/?trackingId=${trackingCode}`)} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold rounded-r-md sm:rounded-l-none rounded-l-md transition-colors whitespace-nowrap">
                Track Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionPadding>
  );
}