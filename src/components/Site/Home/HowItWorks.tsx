import React from 'react';
import { Search, Plane, CheckCircle } from 'lucide-react';
import SectionPadding from '../../../layouts/SectionPadding';

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function HowItWorksSection(): React.JSX.Element {
  const steps: Step[] = [
    {
      id: 1,
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "Enter Your Flight Details",
      description: "Simply enter your booking reference, flight number, or tracking ID in the search box above. Our system works with any airline worldwide."
    },
    {
      id: 2,
      icon: <Plane className="w-8 h-8 text-primary" />,
      title: "Real-Time Tracking",
      description: "Get instant access to live flight status, including departure times, delays, gate changes, and current location. Updates refresh automatically."
    },
    {
      id: 3,
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Stay Informed",
      description: "Receive comprehensive flight information with complete transparency. Track your flight from takeoff to landing, anywhere in the world."
    }
  ];

  return (
    <SectionPadding className="relative py-24 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full uppercase tracking-widest text-xs mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Track Your Flight in 3 Simple Steps
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our global flight tracking system makes it easy to monitor any flight, anywhere in the world. Get started in seconds.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex flex-col items-center text-center p-8 bg-card rounded-3xl shadow-xl border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Step Number */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                {step.id}
              </div>
              
              {/* Icon */}
              <div className="mt-6 mb-6 flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              const hero = document.getElementById('hero');
              if (hero) {
                const navbarHeight = 80;
                const elementPosition = hero.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Start Tracking Now
          </button>
        </div>
      </div>
    </SectionPadding>
  );
}

