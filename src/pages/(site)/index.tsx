import { useSearchParams } from "react-router-dom";
import AboutSection from "../../components/Site/Home/About";
import ContactForm from "../../components/Site/Home/Contact";
import FAQSection from "../../components/Site/Home/FAQ";
import Hero from "../../components/Site/Home/Hero";
import HowItWorksSection from "../../components/Site/Home/HowItWorks";
import Services from "../../components/Site/Home/Services";
import WhyChooseUsSection from "../../components/Site/Home/WhyChooseUs";
import FeaturesSection from "../../components/Site/Home/Features";
import PopularFlights from "@/components/Site/Home/PopularFlights";
import Companies from "@/components/Site/Home/Companies";
import { FlightTracker } from "@/components/Site/Home/FlightTracker";
import { useEffect } from "react";

export default function Home() {
  const [params] = useSearchParams();
  const id = params.get("trackingId");

  // Always scroll to top if the full URL (including query params) changes.
  // This uses useEffect to watch the full search params and triggers window.scrollTo(0,0).
  // This ensures that navigation, even with query param changes, resets scroll position.

  useEffect(() => {
    // Debug: Print current search params to trace scroll trigger
    // Remove or comment out in production if not needed
    // console.log("Scroll to top triggered by search params:", params.toString());
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [params.toString()]);

  return (
    <div className="">
      {!id && (
        <>
          <section id="hero">
            <Hero />
          </section>
          <Companies />
          <section id="features">
            <FeaturesSection />
          </section>
          <section id="popular-flights">
            <PopularFlights />
          </section>
          <section id="services">
            <Services />
          </section>
          <section id="about">
            <AboutSection />
          </section>
          {/* <StatsSection /> */}
          {/* <TeamSection /> */}
          <section id="how-it-works">
            <HowItWorksSection />
          </section>
          <section id="faq">
            <FAQSection />
          </section>
          <section id="why-us">
            <WhyChooseUsSection />
          </section>
          <section id="contact">
            <ContactForm />
          </section>
        </>
      )}
      {id && <FlightTracker />}
    </div>
  );
}
