import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "./Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, role, logout } = useAuth();

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/programme" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-base/90 backdrop-blur-md border-b border-ink/10">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <span className="font-sans text-2xl font-bold tracking-tight text-ink">
            Isivande Projects
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "font-sans text-sm font-semibold transition-colors hover:text-neon",
                location.pathname === link.path ? "text-neon" : "text-ink"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4 border-l border-ink/10 pl-8">
              <Link
                to={role === 'admin' ? '/admin' : '/student'}
                className="flex items-center gap-2 font-sans text-sm font-semibold text-ink hover:text-neon transition-colors"
              >
                <User className="h-4 w-4" />
                Portal
              </Link>
              <button
                onClick={() => logout()}
                className="flex items-center gap-2 font-sans text-sm font-semibold text-ink hover:text-ink transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="font-sans text-sm font-semibold text-ink hover:text-neon transition-colors">
                Login
              </Link>
              <Link to="/apply" className="theme-btn py-2.5 px-6 text-sm">
                Apply Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-ink hover:bg-surface hover:text-ink focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="bg-surface md:hidden">
          <div className="space-y-1 px-4 pb-6 pt-2 sm:px-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-3 font-sans text-base font-semibold transition-colors",
                  location.pathname === link.path ? "bg-ink/10 text-neon" : "text-ink hover:bg-ink/5 hover:text-ink"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-ink/10 mt-4">
              {user ? (
                <>
                  <Link
                    to={role === 'admin' ? '/admin' : '/student'}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 font-sans text-base font-semibold text-ink hover:bg-ink/5"
                  >
                    <User className="h-5 w-5 text-neon" />
                    My Portal
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 font-sans text-base font-semibold text-ink hover:bg-ink/5 hover:text-ink"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-3 font-sans text-base font-semibold text-ink hover:bg-ink/5 mb-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/apply"
                    onClick={() => setIsOpen(false)}
                    className="theme-btn w-full"
                  >
                    Apply Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
