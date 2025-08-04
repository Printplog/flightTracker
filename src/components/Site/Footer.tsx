import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState<string>('');

  const handleSubscribe = (): void => {
    if (email) {
      console.log('Subscribed with email:', email);
      alert('Thank you for subscribing to MySkyRoute updates!');
      setEmail('');
    } else {
      alert('Please enter your email address');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <footer className="bg-foreground/90 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About MySkyRoute */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">
              ABOUT MYSKYROUTE
            </h3>
            <p className="text-gray-200 leading-relaxed text-sm">
              MySkyRoute is your trusted partner for seamless flight bookings and real-time tracking. 
              We connect you to the best flight deals, global destinations, and a hassle-free travel experience. 
              Our mission is to make your journey smooth, affordable, and memorable—every time you fly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">
              QUICK LINKS
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#why-choose-us" 
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a 
                  href="#faqs" 
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a 
                  href="#terms" 
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">
              STAY UPDATED
            </h3>
            <p className="text-gray-200 text-sm mb-4">
              Get the latest flight deals, travel tips, and exclusive offers straight to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2 w-full"
              onSubmit={e => {
                e.preventDefault();
                handleSubscribe();
              }}
            >
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 text-gray-900 bg-white rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-primary w-full"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md sm:rounded-l-none sm:rounded-r-md transition-colors font-medium w-full sm:w-auto"
              >
                Subscribe
              </button>
            </form>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-gray-300">
          &copy; {new Date().getFullYear()} MySkyRoute. All rights reserved.
        </div>
    </footer>
  );
}