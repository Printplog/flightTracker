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
      title: "Global Flight Tracking",
      description:
        "Track any flight worldwide in real-time, regardless of airline or destination. Monitor flights from major international carriers and regional airlines across all continents with accurate, up-to-the-minute status updates.",
    },
    {
      icon: <Globe2 className="w-8 h-8 text-primary" />,
      title: "Worldwide Coverage",
      description:
        "Comprehensive coverage spanning thousands of airports and airlines globally. Whether tracking domestic routes or international flights across multiple time zones, we provide complete visibility into your flight's journey anywhere in the world.",
    },
    {
      icon: <CalendarCheck2 className="w-8 h-8 text-primary" />,
      title: "Real-Time Monitoring",
      description:
        "Get instant alerts on flight delays, gate changes, cancellations, and arrivals for any flight worldwide. Our advanced tracking system monitors flights 24/7, keeping you informed from departure to landing, no matter where your flight is headed.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary" />,
      title: "24/7 Global Support",
      description:
        "Access round-the-clock support from our dedicated team, ready to assist with tracking inquiries, booking questions, or flight information for any destination worldwide. Our experts are available whenever you need help, regardless of your time zone.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary" />,
      title: "Secure Global Booking",
      description:
        "Book flights worldwide with confidence using our secure, encrypted payment system. Whether booking domestic or international routes, your financial data and transactions are protected with enterprise-grade security protocols.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "International Travel Intelligence",
      description:
        "Access comprehensive travel intelligence including real-time flight tracking, airport information, airline updates, and destination insights for any location worldwide. Stay informed about travel restrictions, requirements, and flight statuses globally.",
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
          Professional Flight Tracking Services for Every Destination Worldwide.
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