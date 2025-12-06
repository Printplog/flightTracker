import SectionPadding from '../../../layouts/SectionPadding';

// Data array holding image source and text for each section
const features = [
  {
    imgSrc: '/f1.png', // Replace with actual path or import for f1.png
    title: 'Track Any Flight, Anywhere in the World',
    description: 'Monitor flights from thousands of airlines globally with comprehensive worldwide coverage and real-time updates.'
  },
  {
    imgSrc: '/f2.png', // Replace with actual path or import for f2.png
    title: 'Global Real-Time Tracking',
    description: 'Receive instant updates on flight status, delays, gate changes, and arrivals for any flight worldwide, 24/7.'
  },
  {
    imgSrc: '/f3.png', // Replace with actual path or import for f3.png
    title: 'Trusted Worldwide',
    description: 'Join millions of travelers who rely on our global flight tracking platform for accurate, real-time flight information from anywhere in the world.'
  }
];

export default function FeaturesSection() {
  return (
    <SectionPadding className="features-section mt-[120px] py-15">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="feature-item text-center">
            <img src={feature.imgSrc} alt={`Feature ${index + 1}`} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </SectionPadding>
  );
}
