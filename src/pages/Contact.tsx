import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-base min-h-screen py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="mb-4 font-sans text-4xl font-extrabold text-ink sm:text-5xl">
            Have Questions? <span className="text-neon">We're Here.</span>
          </h1>
          <p className="font-body text-lg text-ink max-w-2xl mx-auto">
            Whether you're a prospective learner or a business looking to host talent, we'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="theme-card flex items-start gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon/10 text-neon">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-ink mb-1">Email Us</h3>
                <a href="mailto:info@isivandeprojects.co.za" className="font-body text-ink hover:text-neon transition-colors">
                  info@isivandeprojects.co.za
                </a>
              </div>
            </div>
            
            <div className="theme-card flex items-start gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon/10 text-neon">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-ink mb-1">Call Us</h3>
                <a href="tel:+27110000000" className="font-body text-ink hover:text-neon transition-colors">
                  +27 (0) 11 000 0000
                </a>
              </div>
            </div>
            
            <div className="theme-card flex items-start gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon/10 text-neon">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-ink mb-1">Location</h3>
                <p className="font-body text-ink">
                  South Africa
                </p>
              </div>
            </div>
          </div>
          
          <div className="theme-card">
            <h2 className="mb-8 font-sans text-2xl font-bold text-ink">Send a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neon/10">
                  <CheckCircle2 className="h-8 w-8 text-neon" />
                </div>
                <h3 className="mb-2 font-sans text-xl font-bold text-ink">Message Sent!</h3>
                <p className="font-body text-ink mb-8">
                  Thanks for reaching out. We'll get back to you within 1 business day.
                </p>
                <button onClick={() => setIsSubmitted(false)} className="theme-btn-white w-full">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-sans text-sm font-semibold text-ink">Full Name</label>
                  <input type="text" id="name" required className="theme-input w-full" placeholder="John Doe" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-sans text-sm font-semibold text-ink">Email Address</label>
                  <input type="email" id="email" required className="theme-input w-full" placeholder="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block font-sans text-sm font-semibold text-ink">Message</label>
                  <textarea id="message" required rows={4} className="theme-input w-full resize-none" placeholder="How can we help you?"></textarea>
                </div>
                
                <button type="submit" className="theme-btn w-full group">
                  Send Message <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
