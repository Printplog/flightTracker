import React from "react";
import { Check } from "lucide-react";
import SectionPadding from "../../../layouts/SectionPadding";

interface Feature {
  id: number;
  text: string;
}

export default function WhyChooseUsSection(): React.JSX.Element {
  const features: Feature[] = [
    {
      id: 1,
      text: "Access to exclusive flight deals",
    },
    {
      id: 2,
      text: "Comprehensive global route coverage",
    },
    {
      id: 3,
      text: "User-friendly booking experience",
    },
    {
      id: 4,
      text: "Cost-effective travel options",
    },
    {
      id: 5,
      text: "Expert travel insights and support",
    },
  ];

  return (
    <SectionPadding className="bg-white py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Text and Features */}
        <div className="w-full md:w-1/2">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 leading-snug tracking-tight">
              WHY CHOOSE US
            </h2>
            <h3 className="text-lg md:text-2xl font-bold text-[#6C63FF] mb-4 uppercase">
              Your Preferred Travel Booking Partner
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              At MySkyRoute, we take pride in being your go-to partner for all your travel booking needs. We are committed to providing you with seamless flight options and tailored travel solutions that make your journey stress-free and enjoyable.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-5 mt-8">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#6C63FF]/10 text-[#6C63FF]">
                  <Check className="w-4 h-4" />
                </span>
                <span className="text-gray-900 text-base">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/plane2.jpg"
            alt="Why choose us"
            className="rounded-2xl shadow-lg object-cover w-full max-w-md h-full"
          />
        </div>
      </div>
    </SectionPadding>
  );
}