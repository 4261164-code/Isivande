import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Logo } from "../components/Logo";

export function About() {
  return (
    <div className="bg-base min-h-screen">
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-8 font-sans text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl text-ink">
            WHO ARE WE ? <br />
            <span className="text-neon">Isivande Projects.</span>
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 font-body text-lg leading-relaxed text-ink">
            <p className="text-xl text-ink font-medium">
              Isivande Projects is a leading training and development institution specializing in accredited courses, learnerships, and skills development programs.
            </p>
            <p>
              Our goal is to bridge the skills gap and create opportunities for individuals to thrive in various industries.
            </p>
            
            <div className="theme-card my-12 border-l-4 border-neon rounded-l-none">
              <h3 className="text-xl font-bold text-ink mb-2">Mission</h3>
              <p className="text-ink">
                To provide high-quality, relevant, and accredited training programs that align with market demands.
              </p>
            </div>

            <div className="theme-card my-12 border-l-4 border-neon rounded-l-none">
              <h3 className="text-xl font-bold text-ink mb-2">Vision</h3>
              <p className="text-ink">
                To be a nationally recognized training provider that develops skilled professionals ready for the workforce.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface/30 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 font-sans text-3xl font-bold text-ink sm:text-4xl">
                Our <span className="text-neon">Values</span>
              </h2>
              <p className="font-body text-lg text-ink mb-8">
                We are committed to delivering the highest quality education and support.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-ink">
                  <CheckCircle2 className="h-5 w-5 text-neon" /> Excellence in Training
                </li>
                <li className="flex items-center gap-3 text-ink">
                  <CheckCircle2 className="h-5 w-5 text-neon" /> Commitment to Learners’ Success
                </li>
                <li className="flex items-center gap-3 text-ink">
                  <CheckCircle2 className="h-5 w-5 text-neon" /> Industry-Relevant Curriculum
                </li>
                <li className="flex items-center gap-3 text-ink">
                  <CheckCircle2 className="h-5 w-5 text-neon" /> Ethical and Professional Standards
                </li>
              </ul>
            </div>
            <div className="theme-card flex items-center justify-center p-16">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-neon/10 rounded-full flex items-center justify-center mb-6">
                  <Logo className="h-12 w-12" />
                </div>
                <h3 className="font-sans text-xl font-bold text-ink">Isivande Projects</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
