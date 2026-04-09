import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-base pt-20 pb-10 border-t border-ink/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-8">
          
          {/* Logo & Description */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Logo className="h-10 w-10" />
              <span className="font-sans text-2xl font-bold tracking-tight text-ink">
                Isivande Projects
              </span>
            </Link>
            <p className="mb-6 font-body text-sm text-ink leading-relaxed max-w-xs">
              Empowering Skills, Transforming Futures.
            </p>
          </div>

          {/* Address & Phone */}
          <div className="md:col-span-2">
            <h3 className="mb-6 font-sans text-lg font-bold text-ink">
              Address
            </h3>
            <ul className="space-y-4">
              <li className="font-body text-sm text-ink">
                South Africa
              </li>
              <li className="pt-2">
                <h4 className="font-sans text-sm font-bold text-ink mb-1">Phone</h4>
                <span className="font-body text-sm text-ink">+27 11 000 0000</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h3 className="mb-6 font-sans text-lg font-bold text-ink">
              Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="font-body text-sm text-ink hover:text-neon transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/programme" className="font-body text-sm text-ink hover:text-neon transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="font-body text-sm text-ink hover:text-neon transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="mb-6 font-sans text-lg font-bold text-ink">
              Subscribe To Our Newsletter
            </h3>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full rounded-lg bg-[#1e1e1e] px-4 py-3.5 font-body text-sm text-ink placeholder:text-ink focus:outline-none focus:ring-2 focus:ring-neon transition-colors border border-gray-200"
              />
              <button type="submit" className="w-full theme-btn flex items-center justify-center gap-2">
                Subscribe <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-20 border-t border-ink/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-ink">
            &copy; {new Date().getFullYear()} Isivande Projects. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-sm text-ink hover:text-ink transition-colors">Privacy Policy</a>
            <a href="#" className="font-body text-sm text-ink hover:text-ink transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
