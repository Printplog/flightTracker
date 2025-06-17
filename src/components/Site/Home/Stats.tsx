import React, { useState, useEffect, useRef } from 'react';

interface StatCardProps {
  endValue: number;
  suffix: string;
  label: string;
  duration?: number;
}

const StatCard: React.FC<StatCardProps> = ({ endValue, suffix, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (isVisible) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * endValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isVisible, endValue, duration]);

  return (
    <div ref={cardRef} className="text-center space-y-3">
      <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-500 text-lg font-medium">
        {label}
      </div>
    </div>
  );
};

interface Stat {
  endValue: number;
  suffix: string;
  label: string;
}

export default function StatsSection(): React.JSX.Element {
  const stats: Stat[] = [
    { endValue: 11, suffix: '+', label: 'Years of Experience' },
    { endValue: 300, suffix: '+', label: 'Companies' },
    { endValue: 108, suffix: '+', label: 'Covered Countries' },
    { endValue: 1500, suffix: '+', label: 'Couriers' }
  ];

  return (
    <section className="bg-gray-50 py-25 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              endValue={stat.endValue}
              suffix={stat.suffix}
              label={stat.label}
              duration={2000 + index * 200} // Stagger animation timing
            />
          ))}
        </div>
      </div>
    </section>
  );
}