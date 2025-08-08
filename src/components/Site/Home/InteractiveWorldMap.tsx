import { useEffect, useRef, useState } from "react";
import { worldSvg } from "@/components/world";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";

export default function InteractiveWorldMap() {
  // We'll use a ref to the worldmap container
  const mapRef = useRef<HTMLDivElement>(null);
  const [hoverDivStyle, setHoverDivStyle] =
    useState<React.CSSProperties | null>(null);
  const [current, setCurrent] = useState(0);

  const countries = [
    { name: "Nigeria", code: "NG", continent: "Africa" },
    { name: "Brazil", code: "BR", continent: "South America" },
    { name: "Germany", code: "DE", continent: "Europe" },
    { name: "Australia", code: "AU", continent: "Oceania" },
    { name: "United States", code: "US", continent: "North America" },
    { name: "China", code: "CN", continent: "Asia" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % countries.length);
    }, 6000); // Change every 2 seconds (adjust as needed)
    return () => clearInterval(interval);
  }, [countries.length]);

  useEffect(() => {
    // Wait for the SVG to be rendered
    const svg = mapRef.current?.querySelector("svg");
    const country = svg?.querySelector(`#${countries[current].code}`);

    if (country && svg && mapRef.current) {
      // Get the bounding box of the country path
      const bbox = (country as SVGGraphicsElement).getBBox();
      // Get the position of the SVG relative to the container
      const svgRect = svg.getBoundingClientRect();
      const containerRect = mapRef.current.getBoundingClientRect();

      // Calculate position of the hover div relative to the container
      const left = bbox.x + svgRect.left - containerRect.left;
      const top = bbox.y + svgRect.top - containerRect.top;
      setX(left);
      setY(top);

      setHoverDivStyle({
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 10,
      });
    }
  }, [current, countries.length]);

  return (
    <div className="absolute right-0 bottom-0 top-0">
      <div ref={mapRef} style={{ position: "relative" }}>
        <AnimatePresence>
          {hoverDivStyle && countries[current] && (
            <motion.div
              style={hoverDivStyle}
              key={current} // force re-mount to restart animation
              className="px-4 py-3 rounded-lg border shadow-xl text-xs bg-white/80 font-semibold text-primary animate-bounce"
              initial={{ y: -20, scale: 0 }}
              animate={{ y: 0, scale: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 2 }}
            >
              {countries[current].continent}
            </motion.div>
          )}
        </AnimatePresence>
        {hoverDivStyle && (
          <motion.div
            className="size-[50px] "
          >
            <Search />
          </motion.div>
        )}
        <div
          id="worldmap"
          className="[&_svg]:stroke-primary/40 [&_svg]:fill-primary/20  [&_svg]:h-full"
          dangerouslySetInnerHTML={{ __html: worldSvg }}
        />
      </div>
    </div>
  );
}
