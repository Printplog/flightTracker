import SectionPadding from "../../../layouts/SectionPadding";

export default function AboutSection() {
  return (
    <SectionPadding className="py-20 bg-background">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Top Badge */}
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="uppercase tracking-widest text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            About Us
          </span>
        </div>

        {/* Main Card */}
        <div className="w-full bg-card rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          {/* Left: Image with overlay and badge */}
          <div className="relative md:w-1/2 min-h-[320px]">
            <img
              src="/plane.jpg"
              alt="MyFlightLookup operations"
              className="object-cover w-full h-full min-h-[320px] md:min-h-[400px]"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />
            {/* Floating stat */}
            <div className="absolute bottom-6 left-6 bg-background/90 px-5 py-3 rounded-xl shadow-lg flex flex-col items-center">
              <span className="text-2xl font-bold text-primary">2M+</span>
              <span className="text-xs text-muted-foreground">Flights Booked</span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 flex flex-col justify-center px-8 py-10 space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
              Making Air Travel Simple, Affordable, and Transparent
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              MyFlightLookup is your trusted partner for booking and tracking flights worldwide. Our mission is to empower travelers with seamless booking, real-time flight tracking, and unbeatable deals—so you can travel smarter, every time.
            </p>
            <ul className="space-y-2 text-muted-foreground text-base pl-4 list-disc">
              <li>
                <span className="font-semibold text-primary">Global Coverage:</span> Search and book flights to 1,000+ destinations.
              </li>
              <li>
                <span className="font-semibold text-primary">Expert Support:</span> Friendly travel experts available around the clock.
              </li>
              <li>
                <span className="font-semibold text-primary">Smart Technology:</span> Real-time flight tracking and instant notifications.
              </li>
            </ul>
            {/* Stats Row */}
            <div className="flex gap-8 pt-4">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-primary">10+</span>
                <span className="text-xs text-muted-foreground">Years Experience</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-primary">24/7</span>
                <span className="text-xs text-muted-foreground">Customer Support</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-primary">99.9%</span>
                <span className="text-xs text-muted-foreground">On-Time Updates</span>
              </div>
            </div>
            {/* CTA */}
            <div className="pt-4">
              <a
                href="/about"
                className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 px-7 py-3 rounded-lg font-semibold transition-colors shadow"
              >
                Discover Our Story
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionPadding>
  );
}