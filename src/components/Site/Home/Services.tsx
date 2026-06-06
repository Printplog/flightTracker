import SectionPadding from "../../../layouts/SectionPadding";
import {
  Plane,
  Globe2,
  CalendarCheck2,
  Headphones,
  Bell,
  MapPin,
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
        "Access round-the-clock support from our dedicated team, ready to assist with tracking inquiries or flight information for any destination worldwide. Our experts are available whenever you need help, regardless of your time zone.",
    },
    {
      icon: <Bell className="w-8 h-8 text-primary" />,
      title: "Instant Status Alerts",
      description:
        "Receive instant push and email notifications the moment a flight status changes — delays, gate switches, diversions, or early arrivals. Stay one step ahead with proactive, real-time alerts for any flight you're monitoring.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Live Route & Airport Insights",
      description:
        "Access detailed route maps, airport layouts, and destination insights for any flight worldwide. Stay informed about flight paths, connecting airports, and real-time runway status, all in one place.",
    },
  ];

  return (
    <SectionPadding className="py-16 mt-[100px] max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-semibold text-primary mb-4 font-title">
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