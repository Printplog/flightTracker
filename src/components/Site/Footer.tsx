import React, { useState } from 'react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState<string>('');

  const handleSubscribe = (): void => {
    if (email) {
      toast.success('Subscribed successfully!', {
        description: 'You will receive flight tracking updates and travel insights.',
      });
      setEmail('');
    } else {
      toast.error('Please enter your email address');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <footer className="bg-foreground/90 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About MyFlightLookup */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">
              ABOUT MYFLIGHTLOOKUP
            </h3>
            <p className="text-gray-200 leading-relaxed text-sm">
              MyFlightLookup is your trusted partner for comprehensive worldwide flight tracking and booking services. 
              Track any flight from any airline, anywhere in the world, with real-time updates and complete global coverage. 
              Our mission is to provide accurate, reliable flight tracking that keeps you informed, no matter where your journey takes you across the globe.
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
                  href="#why-us" 
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('why-us');
                    if (section) {
                      const navbarHeight = 80;
                      const elementPosition = section.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('faq');
                    if (section) {
                      const navbarHeight = 80;
                      const elementPosition = section.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('how-it-works');
                    if (section) {
                      const navbarHeight = 80;
                      const elementPosition = section.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById('contact');
                    if (section) {
                      const navbarHeight = 80;
                      const elementPosition = section.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
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
              Get the latest global flight tracking updates, travel insights, and exclusive offers straight to your inbox.
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
          &copy; {new Date().getFullYear()} MyFlightLookup. All rights reserved.
        </div>
    </footer>
  );
}