import React from 'react';
import { Check } from 'lucide-react';
import SectionPadding from '../../../layouts/SectionPadding';

interface PricingPlan {
  id: number;
  name: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
  gradient: string;
  icon: React.ReactNode;
  cta: string;
}

const planIcons = [
  (
    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <polygon points="12 2 2 7 12 22 22 7 12 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
];

export default function PricingSection(): React.JSX.Element {
  const pricingPlans: PricingPlan[] = [
    {
      id: 1,
      name: "Basic",
      price: 10,
      period: "year",
      features: [
        "Access to best fare finder",
        "Email alerts for fare drops",
        "No booking fees on selected airlines",
        "Standard customer support"
      ],
      gradient: "from-blue-50 via-white to-white",
      icon: planIcons[0],
      cta: "Get Started"
    },
    {
      id: 2,
      name: "Premium",
      price: 50,
      period: "year",
      features: [
        "Access to all fare finder tools",
        "Real-time alerts on fare drops",
        "No booking fees on all airlines",
        "Priority customer support"
      ],
      isPopular: true,
      gradient: "from-indigo-50 via-white to-white",
      icon: planIcons[1],
      cta: "Get Started"
    },
    {
      id: 3,
      name: "Elite",
      price: 100,
      period: "year",
      features: [
        "Exclusive access to unpublished fares",
        "Frequent flyer perks and bonuses",
        "No booking fees on all airlines",
        "24/7 premium customer support"
      ],
      gradient: "from-yellow-50 via-white to-white",
      icon: planIcons[2],
      cta: "Get Started"
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
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your flight booking and tracking needs. No hidden fees, no surprises—just value.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`
                relative flex flex-col
                bg-gradient-to-br ${plan.gradient}
                rounded-3xl shadow-xl border border-border
                px-8 py-12
                transition-all duration-300
                ${plan.isPopular ? 'scale-105 ring-4 ring-primary/30 z-20 shadow-2xl' : 'hover:scale-105 hover:shadow-2xl'}
                ${plan.isPopular ? 'md:-mt-6' : 'md:mt-6'}
                group
              `}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-lg tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className={`bg-white shadow-md rounded-full p-4 border ${plan.isPopular ? 'border-primary/40' : 'border-primary/20'}`}>
                  {plan.icon}
                </div>
              </div>

              {/* Plan Name */}
              <h3 className="text-center text-xl font-bold text-foreground mb-2 tracking-wide uppercase">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="flex justify-center items-end mb-6">
                <span className="text-4xl font-extrabold text-primary">${plan.price}</span>
                <span className="text-muted-foreground ml-2 text-base font-medium mb-1">/ {plan.period}</span>
              </div>

              {/* Features */}
              <ul className="mb-10 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                      <Check className="w-4 h-4" />
                    </span>
                    <span className="text-foreground text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="mt-auto">
                <button
                  onClick={() => {
                    const contact = document.getElementById('contact');
                    if (contact) {
                      const navbarHeight = 80;
                      const elementPosition = contact.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className={`
                    w-full py-3 px-6 rounded-xl font-semibold text-base transition-all duration-200
                    ${plan.isPopular
                      ? 'bg-primary text-white shadow-lg hover:bg-primary/90'
                      : 'bg-gray-700 text-white hover:bg-primary'}
                  `}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Subtext */}
        <div className="text-center mt-14 text-muted-foreground text-sm">
          Need help? <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              const contact = document.getElementById('contact');
              if (contact) {
                const navbarHeight = 80;
                const elementPosition = contact.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="text-primary underline font-medium hover:text-primary/80"
          >
            Contact us
          </a> for support.
        </div>
      </div>
    </SectionPadding>
  );
}