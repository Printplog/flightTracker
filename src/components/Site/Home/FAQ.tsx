import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Package, CreditCard, Clock, Headphones, Globe, RefreshCw } from 'lucide-react';
import SectionPadding from '../../../layouts/SectionPadding';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: 'payment' | 'shipping' | 'support' | 'policy';
}

export default function FAQSection(): React.JSX.Element {
  const [openItem, setOpenItem] = useState<number | null>(1);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "CAN I ACCEPT BOTH PAYPAL AND STRIPE?",
      answer: "Yes, MyCargoLane supports both PayPal and Stripe as payment options. You can choose the one that best suits your preferences and needs.",
      icon: <CreditCard className="w-5 h-5" />,
      category: 'payment'
    },
    {
      id: 2,
      question: "HOW CAN I CUSTOMIZE MY SHIPPING PREFERENCES?",
      answer: "You can easily customize your shipping preferences in your account settings. Navigate to the 'Preferences' section, where you can specify delivery options, packaging requirements, and more according to your needs.",
      icon: <Package className="w-5 h-5" />,
      category: 'shipping'
    },
    {
      id: 3,
      question: "WHAT IS THE AVAILABLE REFUND PERIOD?",
      answer: "We offer a 30-day refund period from the date of your purchase. If you are unsatisfied with our services, you can request a refund within this timeframe.",
      icon: <RefreshCw className="w-5 h-5" />,
      category: 'policy'
    },
    {
      id: 4,
      question: "WHAT IS YOUR OPENING TIME?",
      answer: "Our offices are open from Monday to Friday, 9:00 AM to 6:00 PM. Feel free to reach out during these hours for any assistance or inquiries you may have.",
      icon: <Clock className="w-5 h-5" />,
      category: 'support'
    },
    {
      id: 5,
      question: "HOW CAN I TRACK MY SHIPMENTS?",
      answer: "Tracking your shipments is easy! Simply log in to your MyCargoLane account and go to the 'Track Shipment' section. Enter your tracking number, and you'll get real-time updates on your cargo's location and status.",
      icon: <Package className="w-5 h-5" />,
      category: 'shipping'
    },
    {
      id: 6,
      question: "DO YOU PROVIDE INTERNATIONAL SHIPPING SERVICES?",
      answer: "Absolutely! MyCargoLane specializes in international shipping services. Whether it's across borders or continents, we ensure your cargo reaches its destination securely and on time.",
      icon: <Globe className="w-5 h-5" />,
      category: 'shipping'
    },
    {
      id: 7,
      question: "WHAT IS YOUR CUSTOMER SUPPORT AVAILABILITY?",
      answer: "Our customer support team is available 24/7 to assist you. You can reach out to us through our contact form, email, or phone, and we'll promptly address your inquiries and concerns.",
      icon: <Headphones className="w-5 h-5" />,
      category: 'support'
    },
    {
      id: 8,
      question: "WHAT AVAILABLE IS REFUND PERIOD?",
      answer: "We offer a 30-day refund period from the date of your purchase. If you are unsatisfied with our services, you can request a refund within this timeframe.",
      icon: <RefreshCw className="w-5 h-5" />,
      category: 'policy'
    }
  ];

  const toggleItem = (id: number): void => {
    setOpenItem(openItem === id ? null : id);
  };

  const getCategoryColor = (category: string): string => {
    const colors = {
      payment: 'bg-blue-50 border-blue-200',
      shipping: 'bg-green-50 border-green-200',
      support: 'bg-purple-50 border-purple-200',
      policy: 'bg-orange-50 border-orange-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 border-gray-200';
  };

  const getIconColor = (category: string): string => {
    const colors = {
      payment: 'text-blue-600',
      shipping: 'text-green-600',
      support: 'text-purple-600',
      policy: 'text-orange-600'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <SectionPadding className="bg-white py-20 px-4 border-b">
      <div className="">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 tracking-wide">
            FREQUENTLY ASK QUESTIONS
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our shipping services, policies, and support.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl h-fit border-2 transition-all duration-300 hover:shadow-lg ${
                openItem === item.id 
                  ? `${getCategoryColor(item.category)} shadow-md` 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getCategoryColor(item.category)}`}>
                      <div className={getIconColor(item.category)}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight pr-4">
                        {item.question}
                      </h3>
                    </div>
                  </div>
                  <div className={`p-1 rounded-full transition-transform duration-200 ${
                    openItem === item.id ? 'rotate-180' : ''
                  }`}>
                    {openItem === item.id ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="ml-16">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
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