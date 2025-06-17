import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState<string>('');

  const handleSubscribe = (): void => {
    if (email) {
      console.log('Subscribed with email:', email);
      alert('Thank you for subscribing!');
      setEmail('');
    } else {
      alert('Please enter your email address');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <footer className="bg-gray-800 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">
              ABOUT US
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Welcome to MyCargoLane, your trusted partner in global shipping and logistics. 
              Our mission is to provide efficient and reliable cargo delivery services tailored 
              to your unique needs. With a commitment to excellence, we ensure that your 
              shipments reach their destination securely and on time.
            </p>
          </div>

          {/* Features Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">
              FEATURES
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">
              SUBSCRIBE TO NEWSLETTER
            </h3>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Email"
                className="flex-1 px-4 py-3 text-gray-900 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleSubscribe}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-r-md transition-colors font-medium"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}