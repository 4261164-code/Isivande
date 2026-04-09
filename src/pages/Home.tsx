import { Link } from "react-router-dom";
import { ArrowRight, Check, Quote } from "lucide-react";

export function Home() {
  return (
    <div className="bg-base">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-sans font-semibold text-sm text-neon">
              <span className="h-2 w-2 rounded-full bg-neon"></span>
              SETA Accredited Training
            </div>
            <h1 className="mb-6 font-sans text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl text-ink">
              Empowering Futures, <br />
              <span className="text-neon">One Skill at a Time.</span>
            </h1>
            <p className="mb-10 font-body text-xl text-ink sm:text-2xl">
              Welcome to Isivande Projects, your trusted partner in skills development and training. We provide accredited programs designed to equip individuals and businesses with industry-relevant expertise.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-center">
              <Link to="/apply" className="theme-btn text-lg group">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/programme" className="theme-btn-white text-lg group">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING / SKILLS (Adapted to Image 1 style) */}
      <section className="py-24 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-sans text-3xl font-bold text-ink sm:text-4xl">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-ink font-body text-lg">
              We bridge the skills gap and create opportunities for individuals to thrive in various industries.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="theme-card border-t-8 border-neon flex flex-col">
              <h3 className="text-2xl font-bold text-ink mb-4">Accredited Training</h3>
              <p className="text-ink mb-8 text-sm">
                SETA-accredited training programs with experienced facilitators and assessors.
              </p>
              <ul className="space-y-4 mb-8 flex-1">
                {['SETA Accredited Courses', 'Experienced Facilitators', 'Industry-Relevant Curriculum', 'Ethical and Professional Standards'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-ink">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-neon text-ink-dark shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/programme" className="theme-btn-white w-full">View Services</Link>
            </div>

            {/* Card 2 */}
            <div className="theme-card border-t-8 border-neon flex flex-col relative transform lg:-translate-y-4">
              <h3 className="text-2xl font-bold text-ink mb-4">ICT Training</h3>
              <p className="text-ink mb-8 text-sm">
                Specialized programs in Information and Communication Technology.
              </p>
              <ul className="space-y-4 mb-8 flex-1">
                {['Systems Development', 'Software Testing', 'Systems Support', 'Technical Support A+ & N+', 'End-User Computing'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-ink">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-neon text-ink-dark shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/apply" className="theme-btn w-full">Apply Now</Link>
            </div>

            {/* Card 3 */}
            <div className="theme-card border-t-8 border-neon flex flex-col">
              <h3 className="text-2xl font-bold text-ink mb-4">Career Support</h3>
              <p className="text-ink mb-8 text-sm">
                Flexible learning options and job placement support for qualified candidates.
              </p>
              <ul className="space-y-4 mb-8 flex-1">
                {['Online Learning', 'In-Person Learning', 'Hybrid Options', 'Work Integrated Learning', 'Job Placement Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-ink">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-neon text-ink-dark shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/programme" className="theme-btn-white w-full">View Details</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (Adapted to Image 2 style) */}
      <section className="py-24 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-sans text-3xl font-bold text-ink sm:text-4xl mb-4">
                Feedback By Our Learners
              </h2>
              <p className="text-ink font-body max-w-xl">
                Hear from the individuals who have transformed their careers through Isivande Projects.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="rounded-2xl bg-neon p-8 text-ink-dark flex flex-col">
              <Quote className="h-10 w-10 text-ink mb-6 fill-white" />
              <p className="font-body text-sm leading-relaxed mb-8 flex-1 font-medium">
                "Isivande Projects provided me with the skills I needed to land my dream job!"
              </p>
              <div className="flex items-center gap-4">
                <img src="https://picsum.photos/seed/annie/100/100" alt="Annie Steiner" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-base">Annie Steiner</h4>
                  <p className="text-sm">CEO, Greenprint</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-2xl bg-white p-8 text-ink flex flex-col shadow-sm border border-gray-100">
              <Quote className="h-10 w-10 text-neon mb-6 fill-neon" />
              <p className="font-body text-sm leading-relaxed mb-8 flex-1 text-ink">
                "The Systems Development course was exactly what I needed. The facilitators were knowledgeable and supportive throughout."
              </p>
              <div className="flex items-center gap-4">
                <img src="https://picsum.photos/seed/marie/100/100" alt="Lerato K." className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-base">Lerato K.</h4>
                  <p className="text-sm text-ink">Systems Developer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-2xl bg-white p-8 text-ink flex flex-col shadow-sm border border-gray-100">
              <Quote className="h-10 w-10 text-neon mb-6 fill-neon" />
              <p className="font-body text-sm leading-relaxed mb-8 flex-1 text-ink">
                "Not just a certificate, but real experience. The Work Integrated Learning program helped me transition smoothly into the workforce."
              </p>
              <div className="flex items-center gap-4">
                <img src="https://picsum.photos/seed/ryan/100/100" alt="Sipho D." className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-base">Sipho D.</h4>
                  <p className="text-sm text-ink">Technical Support</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
            <div className="h-2 w-2 rounded-full bg-neon"></div>
            <div className="h-2 w-2 rounded-full bg-surface"></div>
            <div className="h-2 w-2 rounded-full bg-surface"></div>
            <div className="h-2 w-2 rounded-full bg-surface"></div>
          </div>
        </div>
      </section>

      {/* CTA BANNER (Adapted to Image 3 style) */}
      <section className="py-24 bg-base">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-neon overflow-hidden">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-10 lg:p-16 z-10 relative">
                <h2 className="font-sans text-4xl font-bold text-ink-dark mb-6">
                  Ready To Start Your <br/> Career Journey?
                </h2>
                <p className="font-body text-ink-dark mb-8 max-w-md">
                  Join our accredited training programs and develop the skills you need to succeed. Empowering Skills, Transforming Futures.
                </p>
                <Link to="/apply" className="theme-btn-white text-ink-dark">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              
              <div className="relative h-64 lg:h-full hidden md:block">
                {/* Decorative elements to match the image style */}
                <div className="absolute right-10 bottom-0 w-[400px] h-[450px] z-10">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=900" alt="Professional" className="w-full h-full object-cover object-top drop-shadow-2xl" style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 20%)', WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
