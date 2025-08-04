import React from "react";
import { MessageSquare, CreditCard, Users, CalendarCheck, FileText, Tag, Settings, HelpCircle } from "lucide-react";
import SectionPadding from "../../../layouts/SectionPadding";

const faqs = [
  {
    question: "Can I book flights with multiple airlines?",
    answer:
      "Yes, you can seamlessly book flights with multiple airlines through our platform to ensure you get the best possible routes and prices for your trip.",
  },
  {
    question: "How do I change my booking?",
    answer:
      "You can change your booking details directly through our website by accessing the 'Manage Booking' section or by contacting our customer support for assistance.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Our cancellation policy varies by airline. Typically, you can cancel up to 24 hours after booking for a full refund depending on the fare conditions. Please check the specific terms while booking.",
  },
  {
    question: "What forms of payment do you accept?",
    answer:
      "We accept various forms of payment including credit cards, debit cards, PayPal, and several other payment gateways. Specific options available may vary depending on the country of booking.",
  },
  {
    question: "How can I check the status of my flight?",
    answer:
      "You can check the status of your flight by logging into your account on our website and navigating to the 'My Trips' section, or by entering your booking reference on our flight status page.",
  },
  {
    question: "How can I get a receipt for my booking?",
    answer:
      "You can download the receipt for your booking from the 'My Bookings' section of your account after your ticket has been issued.",
  },
  {
    question: "Do you offer group booking discounts?",
    answer:
      "Yes, we offer special rates for group bookings. If you are traveling with a group of 10 or more, please contact our customer support to avail of customized discounts.",
  },
  {
    question: "What should I do if I have special travel needs?",
    answer:
      "If you have any special travel needs (such as wheelchair assistance, dietary restrictions, etc.), please inform us at the time of booking so we can make the necessary arrangements with the airline.",
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
            Find answers to common questions about our booking, payment, and support.
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