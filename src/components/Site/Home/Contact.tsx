import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (): void => {
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
            GET IN TOUCH
          </p>
          <h1 className="text-4xl font-bold text-primary">
            CONTACT US
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2 p-8">
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Email Field */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />

                {/* Message Field */}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                />

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-8 rounded-md transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="bg-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                CONTACT INFO
              </h2>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Email:
                </p>
                <a 
                  href="mailto:info@mycargolane.com"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  info@mycargolane.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}