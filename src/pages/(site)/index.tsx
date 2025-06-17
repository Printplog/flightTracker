import { useSearchParams } from "react-router-dom";
import AboutSection from "../../components/Site/Home/About";
import ContactForm from "../../components/Site/Home/Contact";
import FAQSection from "../../components/Site/Home/FAQ";
import Hero from "../../components/Site/Home/Hero";
import TeamSection from "../../components/Site/Home/OurStaffs";
import PricingSection from "../../components/Site/Home/Pricing";
import Services from "../../components/Site/Home/Services";
import StatsSection from "../../components/Site/Home/Stats";
import WhyChooseUsSection from "../../components/Site/Home/WhyChooseUs";
import TrackingComponent from "../../components/Site/Home/ShippingTracker";

export default function Home() {
  const [params] = useSearchParams();
  const id = params.get("trackingId");

  return (
    <div className="">
      {!id && (
        <>
          <Hero />
          <Services />
          <AboutSection />
          <StatsSection />
          <TeamSection />
          <PricingSection />
          <FAQSection />
          <WhyChooseUsSection />
          <ContactForm />
        </>
      )}
      {id && <TrackingComponent />}
    </div>
  );
}
