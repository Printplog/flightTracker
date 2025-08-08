import { useState, useEffect } from 'react';
import SectionPadding from '../../../layouts/SectionPadding';
import { useNavigate } from 'react-router-dom';
import SlideShow from './SlideShow';

// Infinite typewriter hook for multiple lines
function useInfiniteTypewriter(lines: string[], speed = 45, pause = 1200) {
  const [displayed, setDisplayed] = useState<string[]>(lines.map(() => ''));
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (lineIdx < lines.length) {
      if (charIdx < lines[lineIdx].length) {
        timeout = setTimeout(() => {
          setDisplayed((prev) => {
            const copy = [...prev];
            copy[lineIdx] += lines[lineIdx][charIdx];
            return copy;
          });
          setCharIdx((i) => i + 1);
        }, speed);
      } else {
        // Pause before next line
        timeout = setTimeout(() => {
          setLineIdx((i) => i + 1);
          setCharIdx(0);
        }, 400);
      }
    } else {
      // Pause before restarting
      timeout = setTimeout(() => {
        setDisplayed(lines.map(() => ''));
        setLineIdx(0);
        setCharIdx(0);
      }, pause);
    }
    return () => clearTimeout(timeout);
  }, [lines, lineIdx, charIdx, speed, pause]);

  return displayed;
}

export default function Hero() {
  const [trackingCode, setTrackingCode] = useState('');
  const navigate = useNavigate();

  // Both lines typewritten, infinite
  const lines = ['TRACK YOUR FLIGHT WITH EASE ANY PLACE ANYWHERE', 'ANY PLACE ANYWHERE'];
  const [typedMain] = useInfiniteTypewriter(lines, 38, 1200);

  return (
    <SectionPadding className="relative flex flex-col-reverse lg:flex-row gap-20 items-center justify-between py-10 sm:py-20 min-h-[450px] md:min-h-[600px] overflow-hidden">
      {/* Left Content */}
      <div className="relative flex-1 flex  w-full  mt-8 md:mt-0">
        <div className="w-full flex flex-col items-start">
          <div className="relative mb-6">
            <h1 className="text-5xl font-bold text-foreground/80 leading-tight text-left min-h-[180px]">
              <span>{typedMain}</span>
              <br />
            </h1>
          </div>
          {/* Tracking Form */}
          <div className="flex flex-col border sm:flex-row gap-3 w-full sm:w-[80%] mx-auto md:mx-0 p-4 sm:p-5 bg-white rounded-lg shadow-md">
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
      {/* Right Image - Interactive World Map */}
      <SlideShow />
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-primary/20 pointer-events-none" /> */}
    </SectionPadding>
  );
}