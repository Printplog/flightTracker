import { useState, useEffect, useRef } from 'react';
import SectionPadding from '../../../layouts/SectionPadding';
import { useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';

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

// Plane that moves randomly around the hero section
function RandomMovingPlane() {
  const [pos, setPos] = useState({ top: 30, left: 60, rotate: 0 });
  const requestRef = useRef<number | null>(null);

  function getRandomPosition() {
    const top = Math.random() * 70 + 5; // 5% to 75%
    const left = Math.random() * 80 + 5; // 5% to 85%
    const rotate = Math.random() * 60 - 30; // -30deg to 30deg
    return { top, left, rotate };
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    function animate() {
      setPos(getRandomPosition());
      timeout = setTimeout(() => {
        requestRef.current = requestAnimationFrame(animate);
      }, 2200 + Math.random() * 1200);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Plane
      className="w-12 h-12 text-primary drop-shadow-lg transition-all duration-[1800ms] ease-in-out pointer-events-none"
      style={{
        position: 'absolute',
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
        zIndex: 30,
        filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.10))',
      }}
      strokeWidth={2.2}
    />
  );
}

export default function Hero() {
  const [trackingCode, setTrackingCode] = useState('');
  const navigate = useNavigate();

  // Both lines typewritten, infinite
  const lines = ['TRACK YOUR FLIGHT WITH EASE', 'ANY PLACE ANYWHERE'];
  const [typedMain, typedSub] = useInfiniteTypewriter(lines, 38, 1200);

  return (
    <SectionPadding className="relative flex flex-col-reverse md:flex-row items-center justify-between py-20 min-h-[450px] md:min-h-[600px] overflow-hidden">
      {/* Randomly moving plane */}
      <RandomMovingPlane />
      {/* Left Content */}
      <div className="relative z-10 flex-1 flex items-center w-full md:w-auto mt-8 md:mt-0">
        <div className="w-full max-w-3xl">
          <div className="relative mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground/80 leading-tight text-center md:text-left min-h-[3.5em]">
              <span>{typedMain}</span>
              <br />
              <span className="text-primary">{typedSub}</span>
            </h1>
          </div>
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