import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, AlertCircle, Shield, User } from 'lucide-react';

export function Login() {
  const { user, role, loading, mockLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (loading) return null;

  if (user && role) {
    return <Navigate to={role === 'admin' ? '/admin' : '/student'} replace />;
  }

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Navigation is handled by the AuthContext state change and the Navigate component above
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to log in with Google.');
      setIsLoggingIn(false);
    }
  };

  const handleMockLogin = (mockRole: 'admin' | 'student') => {
    if (mockLogin) {
      mockLogin(mockRole);
    }
  };

  return (
    <div className="bg-base min-h-screen py-20 flex items-center justify-center">
      <div className="mx-auto max-w-md px-4 sm:px-6 w-full">
        <div className="text-center mb-10">
          <h1 className="mb-4 font-sans text-4xl font-extrabold text-ink">
            Welcome <span className="text-neon">Back</span>
          </h1>
          <p className="font-body text-lg text-ink">
            Sign in to access your Isivande Projects portal.
          </p>
        </div>

        <div className="theme-card">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="theme-btn w-full flex items-center justify-center gap-3 mb-4"
          >
            {isLoggingIn ? (
              'Signing in...'
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                Sign in with Google
              </>
            )}
          </button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ink/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#111] px-2 text-ink">Or use mock login</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleMockLogin('admin')}
              className="flex items-center justify-center gap-2 rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-sm font-medium text-ink hover:bg-ink/10 transition-colors"
            >
              <Shield className="h-4 w-4 text-neon" />
              Admin
            </button>
            <button
              onClick={() => handleMockLogin('student')}
              className="flex items-center justify-center gap-2 rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-sm font-medium text-ink hover:bg-ink/10 transition-colors"
            >
              <User className="h-4 w-4 text-neon" />
              Student
            </button>
          </div>
          
          <p className="mt-6 text-center font-body text-sm text-ink">
            Don't have an account? <a href="/apply" className="text-neon hover:underline">Apply for the programme</a>
          </p>
        </div>
      </div>
    </div>
  );
}
