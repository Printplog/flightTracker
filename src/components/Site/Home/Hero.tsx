import { useState } from 'react';
import SectionPadding from '../../../layouts/SectionPadding';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [trackingCode, setTrackingCode] = useState('');
  const navigate = useNavigate();

  return (
    <SectionPadding className="relative flex flex-col-reverse md:flex-row items-center justify-between py-10 md:py-20 min-h-[450px] md:min-h-[600px]">
      {/* Left Content */}
      <div className="relative z-10 flex-1 flex items-center w-full md:w-auto mt-8 md:mt-0">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground/80 mb-6 leading-tight text-center md:text-left">
            EFFORTLESSLY <span className="text-primary">BOOK</span> YOUR FLIGHT AND <span className="text-primary">TRACK</span> WITH EASE
          </h1>
          {/* Tracking Form */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-[80%] mx-auto md:mx-0 p-4 sm:p-5 bg-white rounded-lg shadow-md">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Enter tracking number..."
              className="flex-1 px-4 py-3 text-gray-900 bg-white border border-gray-200 rounded-md sm:rounded-r-none sm:rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder-gray-500"
            />
            <button
              onClick={() => navigate(`/?trackingId=${trackingCode}`)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 font-semibold rounded-md sm:rounded-l-none sm:rounded-r-md transition-colors whitespace-nowrap"
            >
              Check Booking
            </button>
          </div>
        </div>
      </div>
      {/* Right Image */}
      <div className="flex-1 flex justify-center md:justify-end w-full md:w-auto">
        <img
          src="/plane.jpg"
          alt="Plane"
          className="w-48 h-48 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] object-cover rounded-full shadow-lg"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
    </SectionPadding>
  );
}