import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SlideShow() {
  const images = ["/plane3.jpg", "/plane4.jpg", "plane5.jpg", "plane6.jpg"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full lg:w-[500px] h-[400px]">
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <AnimatePresence>
          <motion.img
            key={images[current]}
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>
      </div>
      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4 mt-4 w-full">
        <button
          className="bg-white/70 hover:bg-white shadow border rounded-full p-2 transition disabled:opacity-50 cursor-pointer"
          onClick={() =>
            setCurrent((prev) => (prev - 1 + images.length) % images.length)
          }
          aria-label="Previous"
          style={{ zIndex: 2 }}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border border-primary transition-all duration-200 cursor-pointer ${
                current === idx ? "bg-primary" : "bg-white"
              }`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                boxShadow: current === idx ? "0 0 0 2px #fff" : undefined,
              }}
            />
          ))}
        </div>
        <button
          className="bg-white/70 hover:bg-white shadow border rounded-full p-2 transition disabled:opacity-50 cursor-pointer"
          onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
          aria-label="Next"
          style={{ zIndex: 2 }}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
