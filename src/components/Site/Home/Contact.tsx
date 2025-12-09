import React, { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 3500);
    }, 500);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-background py-20 px-4">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full uppercase tracking-widest text-xs mb-4">
            Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question, feedback, or partnership inquiry? Our team is here to help you 24/7.
          </p>
        </div>

        <div className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Contact Info */}
          <div className="md:w-1/2 bg-gradient-to-br from-primary/5 to-primary/10 p-10 flex flex-col justify-between min-w-0">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Contact Information</h2>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <a
                    href="mailto:info@mycargolane.com"
                    className="text-base text-foreground hover:text-primary transition break-all"
                  >
                    info@myflightlookup.com
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <span className="text-base text-foreground break-words">
                    123 Skyway Ave, Suite 400, New York, NY 10001
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-primary mb-2">Support Hours</h3>
              <p className="text-muted-foreground text-base">24/7, including holidays</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2 p-4 sm:p-10 bg-white min-w-0">
            <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@email.com"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message..."
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-vertical"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-colors shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitted}
                >
                  <Send className="w-5 h-5" />
                  {submitted ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}