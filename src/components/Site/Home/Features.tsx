import SectionPadding from '../../../layouts/SectionPadding';

// Data array holding image source and text for each section
const features = [
  {
    imgSrc: '/f1.png', // Replace with actual path or import for f1.png
    title: 'One search, all the flights',
    description: 'Finds cheap flights other sites can’t see.'
  },
  {
    imgSrc: '/f2.png', // Replace with actual path or import for f2.png
    title: 'Travel more, spend less',
    description: 'Look for the travel hack star icon for unique travel itineraries.'
  },
  {
    imgSrc: '/f3.png', // Replace with actual path or import for f3.png
    title: 'Trusted by millions',
    description: 'Join over 10 million yearly travelers booking with ease.'
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
