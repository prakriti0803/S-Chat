'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Retrieve the current session which should be set by Supabase's automatic PKCE handling
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        if (!session?.user) {
          router.replace('/login');
          return;
        }

        const user = session.user;
        const requestedRole = searchParams.get('role');
        const isLoginFlow = searchParams.get('isLogin') === 'true';

        // Check if the user exists in our public users table
        const { data: existingUser, error: checkError } = await supabase
          .from('users')
          .select('id, current_role')
          .eq('id', user.id)
          .maybeSingle(); // maybeSingle because 0 rows is expected for new users

        if (checkError) {
          console.error("Database error checking user:", checkError);
          // Fallback to home if we can't verify
          router.replace('/');
          return;
        }

        if (existingUser) {
          // USER EXISTS: Ignore any requested role from signup parameters
          // Redirect them directly to their destination based on saved preference
          const role = existingUser.current_role;
          
          if (role === 'creator') {
            router.replace(`/creator/${user.id}/dashboard`);
          } else {
            router.replace('/');
          }
        } else {
          // NEW USER: We must have a requested role (from signup)
          // If they somehow hit login without an account, we can default to 'donor' or 'creator'
          const finalRole = requestedRole === 'creator' || requestedRole === 'donor' 
            ? requestedRole 
            : 'donor'; // safe default

          // Insert them into our database
          const { error: insertError } = await supabase
            .from('users')
            .insert([
              {
                id: user.id,
                email: user.email,
                display_name: user.user_metadata?.full_name || '',
                current_role: finalRole,
              }
            ]);

          if (insertError) {
             console.error("Error creating new user:", insertError);
          }

          // Direct NEW users with creator preference to ONBOARDING
          if (finalRole === 'creator') {
            router.replace(`/onboarding?role=creator&uid=${user.id}`);
          } else {
            // Direct NEW users with donor preference to HOME
            router.replace('/');
          }
        }
      } catch (err) {
        console.error('Error during auth callback:', err);
        router.replace('/login');
      }
    };

    // Minor delay to ensure supabase has parsed the hash fragements before getSession runs
    // as getSession reads from LocalStorage/URL fragments handled automatically by supabase-js.
    const timer = setTimeout(() => {
      handleAuthCallback();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <div className="h-16 w-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Authenticating...</h2>
        <p className="text-gray-500 font-medium">Please wait while we log you in securely.</p>
      </motion.div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <CallbackContent />
    </Suspense>
  );
}
