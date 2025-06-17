import React from 'react';
import { Check, Truck, Shield, Warehouse, DollarSign, Award } from 'lucide-react';
import SectionPadding from '../../../layouts/SectionPadding';

interface Feature {
  id: number;
  text: string;
  icon: React.ReactNode;
}

export default function WhyChooseUsSection(): React.JSX.Element {
  const features: Feature[] = [
    {
      id: 1,
      text: "Swift Cargo Express Services",
      icon: <Truck className="w-5 h-5" />
    },
    {
      id: 2,
      text: "Top-notch Security Measures",
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 3,
      text: "Safe and Secure Warehousing",
      icon: <Warehouse className="w-5 h-5" />
    },
    {
      id: 4,
      text: "Cost-Effective Shipping Solutions",
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      id: 5,
      text: "Preferred Choice of Leading Companies",
      icon: <Award className="w-5 h-5" />
    }
  ];

  return (
    <SectionPadding className="bg-white py-30 ">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                WHY CHOOSE US
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                YOUR TRUSTED SHIPPING PARTNER
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                At MyCargoLane, we pride ourselves on being your reliable and efficient shipping partner. Our commitment to excellence sets us apart, ensuring your cargo reaches its destination seamlessly.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary group-hover:text-primary/80 transition-colors duration-200">
                      {feature.icon}
                    </div>
                    <span className="text-gray-700 font-medium text-lg">
                      {feature.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Get Started Today
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 h-full">
            <img src="/sea.jpg" alt="" className="w-full h-full" />
          </div>
        </div>
      </div>
    </SectionPadding>
  );
}