import React from "react";
import { MessageSquare, CreditCard, Users, CalendarCheck, FileText, Tag, Settings, HelpCircle } from "lucide-react";
import SectionPadding from "../../../layouts/SectionPadding";

const faqs = [
  {
    question: "Can I track flights from any airline worldwide?",
    answer:
      "Yes, absolutely. MyFlightLookup provides comprehensive global flight tracking coverage, allowing you to monitor flights from thousands of airlines across all continents. Whether it's a major international carrier or a regional airline, you can track any flight, anywhere in the world, in real-time.",
  },
  {
    question: "How do I track a flight from another country?",
    answer:
      "Simply enter your booking reference or flight number on our homepage. Our platform tracks flights globally, regardless of the airline's origin country or your location. Real-time updates are available 24/7 for flights worldwide, including international routes spanning multiple countries and continents.",
  },
  {
    question: "Do you provide real-time tracking for international flights?",
    answer:
      "Yes, we offer real-time flight tracking for international flights worldwide. Our system monitors flights continuously, providing instant updates on departure times, delays, gate changes, in-flight status, and arrivals for any international route, no matter the destination or airline.",
  },
  {
    question: "What information can I track for flights globally?",
    answer:
      "Our global tracking system provides comprehensive flight information including real-time status, departure and arrival times, gate assignments, terminal information, delay notifications, aircraft type, and current location. This information is available for flights worldwide, updated continuously from takeoff to landing.",
  },
  {
    question: "How accurate is the flight tracking information?",
    answer:
      "Our flight tracking system provides highly accurate, real-time data sourced directly from airlines and aviation authorities worldwide. Information is updated continuously, ensuring you receive the most current flight status for any flight globally, with 99.9% accuracy for on-time updates.",
  },
  {
    question: "Can I track connecting flights or multi-city itineraries?",
    answer:
      "Yes, you can track all segments of your journey, including connecting flights and multi-city itineraries. Our platform monitors each flight leg independently, providing real-time updates for every segment of your trip, whether traveling domestically or across multiple countries.",
  },
  {
    question: "Do you track flights from all countries and regions?",
    answer:
      "Yes, MyFlightLookup offers comprehensive global coverage, tracking flights from airlines in all countries and regions worldwide. Whether monitoring flights in North America, Europe, Asia, Africa, South America, or Oceania, our platform provides complete visibility into flight statuses globally.",
  },
  {
    question: "How quickly are flight status updates available?",
    answer:
      "Flight status updates are provided in real-time, with changes reflected immediately as they occur. Our system continuously monitors flights worldwide and delivers instant notifications for delays, cancellations, gate changes, and arrivals, ensuring you always have the latest information regardless of your location.",
  },
];

const icons = [
  <MessageSquare className="w-6 h-6 text-primary" />,
  <Settings className="w-6 h-6 text-primary" />,
  <FileText className="w-6 h-6 text-primary" />,
  <CreditCard className="w-6 h-6 text-primary" />,
  <CalendarCheck className="w-6 h-6 text-primary" />,
  <Tag className="w-6 h-6 text-primary" />,
  <Users className="w-6 h-6 text-primary" />,
  <HelpCircle className="w-6 h-6 text-primary" />,
];

export default function FAQSection(): React.JSX.Element {
  return (
    <SectionPadding className="bg-white py-20 px-4 border-b">
      <div>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 tracking-wide">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Find answers to common questions about our global flight tracking services and worldwide coverage.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, idx) => (
            <div
              key={faq.question}
              className="flex items-start gap-4 bg-muted/40 rounded-xl p-6 border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex-shrink-0">
                <div className="bg-primary/10 rounded-lg p-2 flex items-center justify-center">
                  {icons[idx]}
                </div>
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-[14px]">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you 24/7
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </SectionPadding>
  );
}