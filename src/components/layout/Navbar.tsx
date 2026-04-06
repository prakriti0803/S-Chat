'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, LayoutDashboard, Settings, ShieldAlert, Menu, X, Video, Layers, LifeBuoy } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const isCreatorDashboard = pathname?.startsWith('/creator-dashboard') || pathname?.includes('/creator/') && pathname?.includes('/dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    setMobileMenuOpen(false);
  };

  // Extract creatorId from dynamic route
  const creatorIdMatch = pathname?.match(/\/creator\/([^/]+)\/dashboard/);
  const creatorId = creatorIdMatch?.[1] || null;

  if (isCreatorDashboard) {
    // Determine base dashboard URL based on route type
    const dashboardBase = creatorId ? `/creator/${creatorId}/dashboard` : '/creator-dashboard';
    
    // Helper function to check if a route is active
    const isActive = (route: string) => {
      if (creatorId) {
        return pathname?.startsWith(`${dashboardBase}${route}`);
      }
      return pathname === `/creator-dashboard${route}`;
    };

    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <button 
              className="md:hidden mr-2 text-gray-700 hover:text-black"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href={dashboardBase} className="flex items-center">
              <span className="text-2xl font-black tracking-tighter text-black">SCHAT<span className="text-blue-600">.</span></span>
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center items-center space-x-2 lg:space-x-6">
            <Link href={dashboardBase} className={`flex items-center text-sm font-semibold py-5 ${isActive('') || isActive('') ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Overview
            </Link>
            <Link href={`${dashboardBase}/streams`} className={`flex items-center text-sm font-semibold py-5 ${isActive('/streams') ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <Video className="mr-2 h-4 w-4" />
              Streams
            </Link>
            <Link href={`${dashboardBase}/overlays`} className={`flex items-center text-sm font-semibold py-5 ${isActive('/overlays') ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <Layers className="mr-2 h-4 w-4" />
              Overlays
            </Link>
            <Link href={`${dashboardBase}/moderation`} className={`flex items-center text-sm font-semibold py-5 ${isActive('/moderation') ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <ShieldAlert className="mr-2 h-4 w-4" />
              Moderation
            </Link>
            <Link href={`${dashboardBase}/financials`} className={`flex items-center text-sm font-semibold py-5 ${isActive('/financials') ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              Financials
            </Link>
            <Link href={`${dashboardBase}/settings`} className={`flex items-center text-sm font-semibold py-5 ${isActive('/settings') ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
            <Link href={`${dashboardBase}/support`} className={`flex items-center text-sm font-semibold py-5 ${isActive('/support') ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <LifeBuoy className="mr-2 h-4 w-4" />
              Support
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={handleLogout}
                className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-bold text-red-600 shadow-sm transition-colors hover:bg-red-50 hover:border-red-100"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div 
                initial={{ x: '-100%' }} 
                animate={{ x: 0 }} 
                exit={{ x: '-100%' }} 
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 shadow-2xl flex flex-col md:hidden"
              >
                <div className="p-4 flex items-center justify-between border-b">
                  <span className="text-2xl font-black tracking-tighter text-black">SCHAT<span className="text-blue-600">.</span></span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex flex-col py-4 px-3 space-y-1 overflow-y-auto">
                  <Link href={dashboardBase} onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${isActive('') || isActive('') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <LayoutDashboard className="mr-3 h-5 w-5" /> Overview
                  </Link>
                  <Link href={`${dashboardBase}/streams`} onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${isActive('/streams') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <Video className="mr-3 h-5 w-5" /> Streams
                  </Link>
                  <Link href={`${dashboardBase}/overlays`} onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${isActive('/overlays') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <Layers className="mr-3 h-5 w-5" /> Overlays
                  </Link>
                  <Link href={`${dashboardBase}/moderation`} onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${isActive('/moderation') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <ShieldAlert className="mr-3 h-5 w-5" /> Moderation
                  </Link>
                  <Link href={`${dashboardBase}/financials`} onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${isActive('/financials') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    Financials
                  </Link>
                  <Link href={`${dashboardBase}/settings`} onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${isActive('/settings') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <Settings className="mr-3 h-5 w-5" /> Settings
                  </Link>
                  <Link href={`${dashboardBase}/support`} onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${isActive('/support') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <LifeBuoy className="mr-3 h-5 w-5" /> Support
                  </Link>
                </div>
                <div className="mt-auto p-4 border-t">
                  <button onClick={handleLogout} className="flex items-center justify-center w-full py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors">
                    <LogOut className="mr-2 h-5 w-5" /> Logout
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-tighter text-black">SCHAT<span className="text-blue-600">.</span></span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/#features" className="hidden text-sm font-medium text-gray-600 hover:text-black md:inline-block">
            Features
          </Link>
          <Link href="/pricing" className="hidden text-sm font-medium text-gray-600 hover:text-black md:inline-block">
            Pricing
          </Link>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex h-9 items-center justify-center rounded-full bg-red-50 border border-red-200 px-4 py-2 text-sm font-medium text-red-600 shadow transition-colors hover:bg-red-100"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Join with Google
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
