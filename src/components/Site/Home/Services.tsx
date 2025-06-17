import SectionPadding from "../../../layouts/SectionPadding";

export default function Services() {
  const services = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-primary" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      title: "SEA FREIGHT",
      description: "Efficient and reliable sea freight services to transport your cargo across oceans. Trust us to ensure secure and timely delivery through our extensive maritime network."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-primary" fill="currentColor">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      ),
      title: "AIR FREIGHT",
      description: "Swift and secure air freight solutions for urgent delivery. Benefit from our global partnerships to seamlessly transport your cargo by air, ensuring it reaches its destination on time."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-primary" fill="currentColor">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      ),
      title: "PACKAGE FORWARDING",
      description: "Convenient package forwarding services designed to meet your unique needs. We handle forwarding with care, ensuring your packages reach their destination with care and speed."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-primary" fill="currentColor">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      ),
      title: "TRUCKING",
      description: "Reliable overland trucking solutions to move your cargo overland. Our dedicated trucking services guarantee safe transportation and timely delivery, no matter the distance."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-primary" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2M9 11H7v6h2v-6m4 0h-2v6h2v-6m4-4h-2v10h2V7z"/>
        </svg>
      ),
      title: "WAREHOUSE",
      description: "State-of-the-art warehouse facilities to store your cargo with care. Our secure warehouses are equipped to handle various types of goods, providing a seamless storage solution for your business."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-primary" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: "DELIVERY",
      description: "Efficient and timely delivery services to bring your cargo to its final destination. Count on us to manage the last mile with precision, ensuring a smooth and reliable delivery experience for your customers."
    }
  ];

  return (
    <SectionPadding className="py-16 bg-muted/30">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            WHAT WE OFFER
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tailored Solutions to Streamline Your Shipping Experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-card border rounded-lg p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="font-bold text-lg text-foreground mb-4 uppercase tracking-wide">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
    </SectionPadding>
  );
}