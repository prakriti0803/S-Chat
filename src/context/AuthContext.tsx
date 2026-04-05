'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  firebaseUID: string | null;
  googleEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('🔥 AuthContext mounted - setting up onAuthStateChanged listener');

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('🔥 Auth state changed:', currentUser ? `User: ${currentUser.email}` : 'No user');
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      console.log('🔥 AuthContext unmounting - removing listener');
      unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    firebaseUID: user?.uid || null,
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
