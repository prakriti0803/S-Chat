  'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Tv, Heart, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, set, get, update } from 'firebase/database';
import { auth, googleProvider } from '@/lib/firebase-client';
import { useAuth } from '@/context/AuthContext';

export default function AuthPage() {
  const [role, setRole] = useState<'creator' | 'donor' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    if (authLoading || !user) return;

    const checkExistingUser = async () => {
      try {
        const database = getDatabase();
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const currentRole = snapshot.val()?.currentRole as 'creator' | 'donor' | null;
          const destination = currentRole === 'creator' ? `/creator/${user.uid}/dashboard` : '/';
          await router.replace(destination);
        }
      } catch (err) {
        console.error('Error checking existing user record:', err);
      }
    };

    checkExistingUser();
  }, [authLoading, router, user]);

  const showErrorToast = (message: string) => {
    setToastMessage(message);
    setError(message);
  };

  const handleSignIn = async () => {
    if (!role) {
      showErrorToast('Please select a role.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user) {
        throw new Error('No user returned from Google sign-in.');
      }

      const database = getDatabase();
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      const existingUser = snapshot.exists() ? snapshot.val() : null;
      const isFirstSignup = !existingUser;

      const roles = {
        ...(existingUser?.roles ?? {}),
        [role]: true,
      };

      const payload = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || null,
        currentRole: role,
        roles,
        updatedAt: new Date().toISOString(),
      } as Record<string, any>;

      if (isFirstSignup) {
        payload.createdAt = new Date().toISOString();
      }

      if (existingUser) {
        await update(userRef, payload);
      } else {
        await set(userRef, payload);
      }

      const destination = isFirstSignup
        ? `/onboarding?role=${role}&uid=${user.uid}`
        : role === 'creator'
        ? `/creator/${user.uid}/dashboard`
        : '/';
      await router.push(destination);
      if (typeof window !== 'undefined') {
        window.location.href = destination;
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      showErrorToast(error?.message ?? 'Login failed. Please try again.');
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
        className="w-full max-w-md p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center relative z-10"
      >
        <div className="absolute -top-10 -z-10 bg-blue-50 w-32 h-32 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-10 -right-10 -z-10 bg-purple-50 w-32 h-32 rounded-full blur-3xl opacity-50"></div>

        <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Join Schat</h1>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          Select how you want to use the platform to customize your experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full mb-8">
          <button
            type="button"
            onClick={() => setRole('creator')}
            className={`relative flex-1 flex flex-col items-center p-6 rounded-2xl border-2 transition-all ${
              role === 'creator'
                ? 'border-blue-600 bg-blue-50/50 shadow-md'
                : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50/50'
            }`}
          >
            {role === 'creator' && (
              <div className="absolute top-3 right-3 text-blue-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            )}
            <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-3 ${role === 'creator' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
              <Tv className="h-6 w-6" />
            </div>
            <h3 className={`font-bold ${role === 'creator' ? 'text-blue-900' : 'text-gray-900'}`}>Creator</h3>
            <p className="text-xs text-gray-500 mt-1">Receive donations & alerts</p>
          </button>

          <button
            type="button"
            onClick={() => setRole('donor')}
            className={`relative flex-1 flex flex-col items-center p-6 rounded-2xl border-2 transition-all ${
              role === 'donor'
                ? 'border-green-600 bg-green-50/50 shadow-md'
                : 'border-gray-100 hover:border-green-200 hover:bg-gray-50/50'
            }`}
          >
            {role === 'donor' && (
              <div className="absolute top-3 right-3 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            )}
            <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-3 ${role === 'donor' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
              <Heart className="h-6 w-6" />
            </div>
            <h3 className={`font-bold ${role === 'donor' ? 'text-green-900' : 'text-gray-900'}`}>Donator</h3>
            <p className="text-xs text-gray-500 mt-1">Support favorite streamers</p>
          </button>
        </div>

        {toastMessage ? (
          <div className="mb-6 w-full rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 shadow-sm">
            {toastMessage}
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleSignIn}
          disabled={loading}
          className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-base font-bold transition-all ${
            loading
              ? 'bg-gray-800 text-white opacity-80 cursor-wait'
              : 'bg-black text-white hover:scale-[1.02] active:scale-[0.98] shadow-md'
          }`}
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {loading ? 'Signing in...' : `Continue as ${role === 'creator' ? 'Creator' : 'Donator'}`}
        </button>

        <p className="mt-6 text-xs text-center text-gray-500 px-4">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
        </p>
      </motion.div>
    </main>
  );
}
