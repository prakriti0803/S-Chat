'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, LayoutDashboard, Settings, ShieldAlert, Menu, X, Video, Layers, LifeBuoy } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const isCreatorDashboard = pathname?.startsWith('/creator-dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isCreatorDashboard) {
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
            <Link href="/creator-dashboard" className="flex items-center">
              <span className="text-2xl font-black tracking-tighter text-black">SCHAT<span className="text-blue-600">.</span></span>
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center items-center space-x-2 lg:space-x-6">
            <Link href="/creator-dashboard" className={`flex items-center text-sm font-semibold py-5 ${pathname === '/creator-dashboard' ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Overview
            </Link>
            <Link href="/creator-dashboard/streams" className={`flex items-center text-sm font-semibold py-5 ${pathname === '/creator-dashboard/streams' ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <Video className="mr-2 h-4 w-4" />
              Streams
            </Link>
            <Link href="/creator-dashboard/overlays" className={`flex items-center text-sm font-semibold py-5 ${pathname === '/creator-dashboard/overlays' ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <Layers className="mr-2 h-4 w-4" />
              Overlays
            </Link>
            <Link href="/creator-dashboard/moderation" className={`flex items-center text-sm font-semibold py-5 ${pathname === '/creator-dashboard/moderation' ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <ShieldAlert className="mr-2 h-4 w-4" />
              Moderation
            </Link>
            <Link href="/creator-dashboard/financials" className={`flex items-center text-sm font-semibold py-5 ${pathname === '/creator-dashboard/financials' ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              Financials
            </Link>
            <Link href="/creator-dashboard/settings" className={`flex items-center text-sm font-semibold py-5 ${pathname === '/creator-dashboard/settings' ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
            <Link href="/creator-dashboard/support" className={`flex items-center text-sm font-semibold py-5 ${pathname === '/creator-dashboard/support' ? 'text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent'}`}>
              <LifeBuoy className="mr-2 h-4 w-4" />
              Support
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-bold text-red-600 shadow-sm transition-colors hover:bg-red-50 hover:border-red-100"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
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
                  <Link href="/creator-dashboard" onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${pathname === '/creator-dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <LayoutDashboard className="mr-3 h-5 w-5" /> Overview
                  </Link>
                  <Link href="/creator-dashboard/streams" onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${pathname === '/creator-dashboard/streams' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <Video className="mr-3 h-5 w-5" /> Streams
                  </Link>
                  <Link href="/creator-dashboard/overlays" onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${pathname === '/creator-dashboard/overlays' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <Layers className="mr-3 h-5 w-5" /> Overlays
                  </Link>
                  <Link href="/creator-dashboard/moderation" onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${pathname === '/creator-dashboard/moderation' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <ShieldAlert className="mr-3 h-5 w-5" /> Moderation
                  </Link>
                  <Link href="/creator-dashboard/financials" onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${pathname === '/creator-dashboard/financials' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    Financials
                  </Link>
                  <Link href="/creator-dashboard/settings" onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${pathname === '/creator-dashboard/settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <Settings className="mr-3 h-5 w-5" /> Settings
                  </Link>
                  <Link href="/creator-dashboard/support" onClick={() => setMobileMenuOpen(false)} className={`flex items-center px-4 py-3 rounded-xl font-bold ${pathname === '/creator-dashboard/support' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-stone-50'}`}>
                    <LifeBuoy className="mr-3 h-5 w-5" /> Support
                  </Link>
                </div>
                <div className="mt-auto p-4 border-t">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center w-full py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors">
                    <LogOut className="mr-2 h-5 w-5" /> Logout
                  </Link>
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
            <Link
              href="/(auth)/login"
              className="inline-flex h-9 items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Join with Google
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
