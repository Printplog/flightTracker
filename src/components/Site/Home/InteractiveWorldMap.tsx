import { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Location {
  id: string;
  name: string;
  country: string;
  x: number; // percentage from left
  y: number; // percentage from top
  delay: number; // how long to stay at this location
  type: 'city' | 'landmark' | 'country';
}

const searchLocations: Location[] = [
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', x: 78, y: 32, delay: 2500, type: 'city' },
  { id: 'paris', name: 'Paris', country: 'France', x: 48, y: 28, delay: 2200, type: 'city' },
  { id: 'new-york', name: 'New York', country: 'USA', x: 25, y: 30, delay: 2800, type: 'city' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', x: 82, y: 72, delay: 2000, type: 'city' },
  { id: 'rio', name: 'Rio de Janeiro', country: 'Brazil', x: 28, y: 58, delay: 2400, type: 'city' },
  { id: 'cairo', name: 'Cairo', country: 'Egypt', x: 52, y: 40, delay: 2300, type: 'city' },
  { id: 'mumbai', name: 'Mumbai', country: 'India', x: 67, y: 45, delay: 2100, type: 'city' },
  { id: 'london', name: 'London', country: 'UK', x: 47, y: 26, delay: 2600, type: 'city' },
  { id: 'capetown', name: 'Cape Town', country: 'South Africa', x: 50, y: 68, delay: 2200, type: 'city' },
  { id: 'toronto', name: 'Toronto', country: 'Canada', x: 24, y: 28, delay: 2400, type: 'city' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', x: 74, y: 52, delay: 1800, type: 'city' },
  { id: 'moscow', name: 'Moscow', country: 'Russia', x: 60, y: 22, delay: 2500, type: 'city' },
];

export default function InteractiveWorldMap() {
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [isShowingLocation, setIsShowingLocation] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ x: 50, y: 50 });
  const [foundLocations, setFoundLocations] = useState<string[]>([]);

  useEffect(() => {
    const searchCycle = () => {
      const currentLocation = searchLocations[currentLocationIndex];
      
      // Start searching animation
      setIsSearching(true);
      setIsShowingLocation(false);
      
      // Move to target location with some random path variation
      const targetX = currentLocation.x + (Math.random() - 0.5) * 2; // Small random offset
      const targetY = currentLocation.y + (Math.random() - 0.5) * 2;
      
      setTimeout(() => {
        setCurrentPosition({ x: targetX, y: targetY });
      }, 500);

      // Location found - show details
      setTimeout(() => {
        setIsSearching(false);
        setIsShowingLocation(true);
        setFoundLocations(prev => [...prev, currentLocation.id]);
      }, 3000); // After movement animation completes

      // Hide location info and move to next
      setTimeout(() => {
        setIsShowingLocation(false);
        setCurrentLocationIndex((prev) => (prev + 1) % searchLocations.length);
      }, currentLocation.delay + 3000);
    };

    const interval = setInterval(searchCycle, 4500);
    
    // Start first search immediately
    searchCycle();

    return () => clearInterval(interval);
  }, [currentLocationIndex]);

  const currentLocation = searchLocations[currentLocationIndex];

  return (
    <div className="relative w-full h-full">
      {/* Main Map Container */}
      <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl">
        {/* World Map Background with Grid */}
        <div className="absolute inset-0">
          {/* Grid overlay for globe effect */}
          <div className="absolute inset-0 opacity-30 rounded-lg">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Longitude lines */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={`long-${i}`}
                  x1={i * 8.33}
                  y1="0"
                  x2={i * 8.33}
                  y2="100"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="0.2"
                />
              ))}
              {/* Latitude lines */}
              {[...Array(8)].map((_, i) => (
                <line
                  key={`lat-${i}`}
                  x1="0"
                  y1={i * 12.5}
                  x2="100"
                  y2={i * 12.5}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="0.2"
                />
              ))}
            </svg>
          </div>
          
          {/* World Map Image */}
          <img
            src="https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="World Map"
            className="w-full h-full object-cover opacity-70 rounded-lg"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t rounded-lg from-slate-900/40 via-transparent to-slate-900/20"></div>
        </div>

        {/* Found locations markers */}
        {foundLocations.map((locationId) => {
          const location = searchLocations.find(loc => loc.id === locationId);
          if (!location) return null;
          
          return (
            <motion.div
              key={locationId}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              style={{
                position: 'absolute',
                left: `${location.x}%`,
                top: `${location.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
            >
              <MapPin className="w-3 h-3 text-emerald-400" />
            </motion.div>
          );
        })}

        {/* Animated Search Icon */}
        <motion.div
          animate={{
            x: `${currentPosition.x}%`,
            y: `${currentPosition.y}%`,
          }}
          transition={{
            type: 'spring',
            stiffness: 40,
            damping: 15,
            duration: 1.8,
          }}
          style={{
            position: 'absolute',
            zIndex: 30,
            transform: 'translate(-50%, -50%)',
          }}
          className="relative"
        >
          {/* Pulsing search effect */}
          <AnimatePresence>
            {isSearching && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 2, 1], opacity: [0.6, 0.3, 0.6] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-blue-400 rounded-full -m-4"
                style={{ zIndex: -1 }}
              />
            )}
          </AnimatePresence>

          {/* Search icon with glow effect */}
          <motion.div
            animate={isSearching ? { 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ 
              duration: 0.6, 
              repeat: isSearching ? Infinity : 0,
              ease: "easeInOut"
            }}
            className="relative p-2 bg-blue-500 rounded-full shadow-lg"
            style={{
              boxShadow: isSearching 
                ? '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)' 
                : '0 4px 15px rgba(0, 0, 0, 0.3)'
            }}
          >
            <Search
              className="w-5 h-5 text-white"
              strokeWidth={2.5}
            />
          </motion.div>
        </motion.div>

        {/* Location Information Display */}
        <AnimatePresence>
          {isShowingLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              style={{
                position: 'absolute',
                left: `${currentPosition.x}%`,
                top: `${currentPosition.y - 20}%`,
                transform: 'translateX(-50%)',
                zIndex: 40,
              }}
              className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-xl border border-white/20"
            >
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center mb-1">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-bold text-gray-800">
                    {currentLocation.name}
                  </span>
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  {currentLocation.country}
                </span>
              </div>
              
              {/* Pointer arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Progress Indicator - Outside the map container */}
      <div className="absolute -top-2 -left-2 z-50">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSearching ? 'bg-blue-400 animate-pulse' : 'bg-emerald-400'}`}></div>
            <span className="text-white text-sm font-medium">
              {isSearching ? 'Searching...' : 'Location Found'}
            </span>
          </div>
          <div className="text-xs text-white/70 mt-1">
            {foundLocations.length} locations discovered
          </div>
        </div>
      </div>

      {/* Global Search Stats - Outside the map container */}
      <div className="absolute -bottom-2 -right-2 z-50">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
          <div className="text-right">
            <div className="text-white text-sm font-medium">
              Global Search
            </div>
            <div className="text-xs text-white/70">
              {Math.round((foundLocations.length / searchLocations.length) * 100)}% Complete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}