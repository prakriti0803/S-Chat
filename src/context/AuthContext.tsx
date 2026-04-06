'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  supabaseUID: string | null;
  googleEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('🔥 AuthContext mounted - checking active session');

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log('🔥 Auth state changed:', session?.user ? `User: ${session.user.email}` : 'No user');
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      console.log('🔥 AuthContext unmounting - removing listener');
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    supabaseUID: user?.id || null,
    googleEmail: user?.email || null,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
