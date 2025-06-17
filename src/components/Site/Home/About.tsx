import SectionPadding from "../../../layouts/SectionPadding";

export default function AboutSection() {
  return (
    <SectionPadding className="py-16 bg-background">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
              ABOUT US
            </h2>
            
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                At MKLogis, we embark on a journey of excellence in shipping and logistics. 
                Nestled far from ordinary, our commitment thrives in delivering unparalleled services.
              </p>
              
              <p>
                With years of industry expertise and a global network of trusted partners, 
                we transform complex logistics challenges into streamlined solutions that 
                drive your business forward.
              </p>
            </div>

            {/* Stats or Features */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary mb-2">11+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Customer Support</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-colors">
                Learn More About Us
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/sea.jpg" 
                alt="MKLogis team and operations" 
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              
              {/* Overlay with decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              
              {/* Floating badge */}
              <div className="absolute top-6 left-6 bg-card/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Trusted Worldwide</span>
                </div>
              </div>
              
              {/* Bottom stats card */}
              <div className="absolute bottom-6 right-6 bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500K+</div>
                  <div className="text-xs text-muted-foreground">Shipments Delivered</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-xl" />
          </div>
        </div>
    </SectionPadding>
  );
}