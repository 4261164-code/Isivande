import { ArrowRight, CheckCircle2, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Apply() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { mockLogin } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleApplicantLogin = () => {
    if (mockLogin) {
      mockLogin('student'); // Using student role for applicant mock for now
      navigate('/student');
    }
  };

  return (
    <div className="bg-base min-h-screen py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="mb-4 font-sans text-4xl font-extrabold text-ink sm:text-5xl">
            Take the First Step Toward <br />
            <span className="text-neon">Your Career.</span>
          </h1>
          <p className="font-body text-lg text-ink">
            Fill in the form below to apply for our training programs.
          </p>
          <div className="mt-6">
            <button 
              onClick={handleApplicantLogin}
              className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-ink/5 px-4 py-2 text-sm font-medium text-ink hover:bg-ink/10 transition-colors"
            >
              <User className="h-4 w-4 text-neon" />
              Already applied? Check Status (Mock Login)
            </button>
          </div>
        </div>

        {isSubmitted ? (
          <div className="theme-card text-center py-16">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neon/10">
              <CheckCircle2 className="h-10 w-10 text-neon" />
            </div>
            <h2 className="mb-4 font-sans text-3xl font-bold text-ink">Application Received!</h2>
            <p className="font-body text-ink mb-8">
              Thank you for applying to Isivande Projects. We review all applications within 3 business days and will contact shortlisted candidates directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setIsSubmitted(false)} className="theme-btn-white">
                Submit Another Application
              </button>
              <button onClick={handleApplicantLogin} className="theme-btn">
                Go to Applicant Portal
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="theme-card space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block font-sans text-sm font-semibold text-ink">Full Name</label>
                <input type="text" id="fullName" required className="theme-input w-full" placeholder="John Doe" />
              </div>

              <div className="space-y-2">
                <label htmlFor="age" className="block font-sans text-sm font-semibold text-ink">Age</label>
                <input type="number" id="age" min="18" max="35" required className="theme-input w-full" placeholder="22" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="block font-sans text-sm font-semibold text-ink">City / Area</label>
              <select id="city" required className="theme-input w-full appearance-none">
                <option value="">Select your area</option>
                <option value="Johannesburg North">Johannesburg North</option>
                <option value="Johannesburg South">Johannesburg South</option>
                <option value="Johannesburg East">Johannesburg East</option>
                <option value="Johannesburg West">Johannesburg West</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="education" className="block font-sans text-sm font-semibold text-ink">Highest Education Level</label>
              <select id="education" required className="theme-input w-full appearance-none">
                <option value="">Select education level</option>
                <option value="Matric">Matric</option>
                <option value="Diploma">Diploma</option>
                <option value="Degree">Degree</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block font-sans text-sm font-semibold text-ink">Are you currently employed?</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Yes — part time", "Yes — full time", "No"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-[#1e1e1e] cursor-pointer hover:border-neon transition-colors">
                    <input type="radio" name="employed" value={option} required className="w-4 h-4 accent-neon" />
                    <span className="font-body text-sm text-ink">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="reason" className="block font-sans text-sm font-semibold text-ink">Why do you want to join Isivande Projects?</label>
              <textarea id="reason" required rows={4} className="theme-input w-full resize-none" placeholder="Tell us about your goals..."></textarea>
            </div>

            <div className="pt-4">
              <button type="submit" className="theme-btn w-full group">
                Submit Application <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
