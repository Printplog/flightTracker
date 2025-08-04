import SectionPadding from "../../../layouts/SectionPadding";
import {
  Plane,
  Globe2,
  CalendarCheck2,
  Headphones,
  CreditCard,
  BookOpen,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Plane className="w-8 h-8 text-primary" />,
      title: "Exclusive Flight Deals",
      description:
        "Access exclusive flight deals and promotions, sourced from our network of airline partners to ensure you get the best prices on your travel.",
    },
    {
      icon: <Globe2 className="w-8 h-8 text-primary" />,
      title: "Global Destinations",
      description:
        "Explore destinations across the globe with our comprehensive flight search engine that connects you to over a thousand international and domestic routes.",
    },
    {
      icon: <CalendarCheck2 className="w-8 h-8 text-primary" />,
      title: "Flexible Booking Options",
      description:
        "Enjoy flexible booking options with features like free cancellation, easy rebooking, and cancellation policies tailored for your convenience.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary" />,
      title: "24/7 Customer Support",
      description:
        "Get round-the-clock support from our dedicated team to assist you with any booking queries, travel concerns, or last minute changes.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary" />,
      title: "Secure Payments",
      description:
        "Book with confidence using our secure payment system that ensures your data and transactions are protected every step of the way.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Travel Insights",
      description:
        "Gain valuable insights with our travel guides, tips, and up-to-date information on travel restrictions and requirements to help you plan the perfect trip.",
    },
  ];

  return (
    <SectionPadding className="py-16 mt-[100px] max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-semibold text-primary mb-4">
          WHAT WE OFFER
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Tailored Solutions to Streamline Your Travel Experience.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-card border p-8 hover:shadow-lg hover:border-primary transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center">
              {service.icon}
            </div>

            <h3 className="font-bold text-sm text-foreground mb-2">
              {service.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed text-xs">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </SectionPadding>
  );
}