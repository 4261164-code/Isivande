import { Link } from "react-router-dom";
import { Briefcase, Users, BookOpen, Check } from "lucide-react";

export function Programme() {
  return (
    <div className="bg-base min-h-screen">
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-6 font-sans text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl text-ink max-w-4xl mx-auto">
            Our <br />
            <span className="text-neon">Services.</span>
          </h1>
          <p className="mx-auto max-w-2xl font-body text-xl text-ink">
            We provide accredited programs designed to equip individuals and businesses with industry-relevant expertise.
          </p>
        </div>
      </section>

      <section className="py-24 bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-sans text-3xl font-bold text-ink sm:text-4xl">
              What We Offer
            </h2>
            <p className="mt-4 font-body text-lg text-ink max-w-2xl mx-auto">
              Comprehensive training solutions for your career development.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="theme-card flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon/10 text-neon">
                <Briefcase className="h-8 w-8" />
              </div>
              <h4 className="font-sans text-xl font-semibold text-ink mb-4">Work Integrated Learning</h4>
              <p className="font-body text-ink">
                Gain practical experience through our structured work integrated learning programs.
              </p>
            </div>

            <div className="theme-card flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon/10 text-neon">
                <BookOpen className="h-8 w-8" />
              </div>
              <h4 className="font-sans text-xl font-semibold text-ink mb-4">SETA Accredited Courses</h4>
              <p className="font-body text-ink">
                Nationally recognized qualifications that meet industry standards.
              </p>
            </div>

            <div className="theme-card flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon/10 text-neon">
                <Users className="h-8 w-8" />
              </div>
              <h4 className="font-sans text-xl font-semibold text-ink mb-4">Skills Training & Development</h4>
              <p className="font-body text-ink">
                Targeted programs to enhance your professional capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 font-sans text-3xl font-bold text-ink sm:text-4xl">
                ICT <span className="text-neon">Training.</span>
              </h2>
              <p className="font-body text-lg text-ink mb-8">
                Specialized programs designed to equip you with the latest technology skills required in today's digital economy.
              </p>
              <Link to="/apply" className="theme-btn">Apply Now</Link>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "Systems Development", desc: "Learn to design, develop, and implement software systems." },
                { title: "Software Testing", desc: "Master the techniques to ensure software quality and reliability." },
                { title: "Systems Support", desc: "Gain skills in maintaining and supporting IT infrastructure." },
                { title: "Technical Support A+ & N+", desc: "Foundational certifications for IT professionals." },
                { title: "End-User Computing", desc: "Essential computer skills for the modern workplace." }
              ].map((item, i) => (
                <div key={i} className="theme-card p-6 flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-lg font-bold text-ink">{item.title}</h4>
                    <p className="font-body text-sm text-ink mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
