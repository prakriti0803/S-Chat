'use client';

import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, AlertCircle } from 'lucide-react';
import { auth, googleProvider } from '@/lib/firebase';

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔐 Initiating Google Sign-In popup...');

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Log for verification (remove in production)
      console.log('✅ Firebase UID:', user.uid);
      console.log('✅ Google Email:', user.email);

      // Redirect to homepage on successful authentication
      router.push('/');
    } catch (err: any) {
      console.error('❌ Authentication error:', err);
      
      // Handle specific Firebase errors
      if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked. Please allow popups for this site.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection.');
      } else {
        setError('Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 bg-stone-50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center relative z-10"
      >
        {/* Glassmorphic background elements */}
        <div className="absolute -top-12 -z-10 bg-blue-50 w-40 h-40 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-12 -right-12 -z-10 bg-purple-50 w-40 h-40 rounded-full blur-3xl opacity-60"></div>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
            <LogIn className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2">
            Join Schat
          </h1>
          <p className="text-gray-600 text-center max-w-xs">
            Sign in to access exclusive donations and zero-latency stream alerts.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium flex items-start gap-3"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>{error}</div>
          </motion.div>
        )}

        {/* Google Sign-In Button */}
        <motion.button
          onClick={handleGoogleSignIn}
          disabled={loading}
          whileHover={{ scale: !loading ? 1.02 : 1 }}
          whileTap={{ scale: !loading ? 0.98 : 1 }}
          className={`w-full flex items-center justify-center py-4 px-6 rounded-xl font-bold text-base transition-all mb-6 ${
            loading
              ? 'bg-blue-600 text-white cursor-wait'
              : 'bg-black text-white hover:shadow-lg active:shadow-md'
          }`}
        >
          {loading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full"
              />
              Opening Google Sign-In...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </>
          )}
        </motion.button>

        {/* Divider */}
        <div className="w-full flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-500 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Terms */}
        <p className="text-xs text-center text-gray-600 px-4">
          By signing in, you agree to our{' '}
          <a href="/terms" className="text-blue-600 hover:underline font-medium">
            Terms of Service
          </a>
          {' '}and{' '}
          <a href="/privacy" className="text-blue-600 hover:underline font-medium">
            Privacy Policy
          </a>
          .
        </p>

        {/* Ghost Protocol Note */}
        <div className="mt-6 pt-4 border-t border-gray-100 w-full">
          <p className="text-xs text-gray-500 text-center">
            🔐 <span className="font-semibold">Ghost Protocol</span>: Your identity is verified. Verified accounts cannot be duplicated.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
