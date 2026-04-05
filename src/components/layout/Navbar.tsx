'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-tighter text-black">SCHAT<span className="text-blue-600">.</span></span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/about" className="hidden text-sm font-medium text-gray-600 hover:text-black md:inline-block">
            Features
          </Link>
          <Link href="/pricing" className="hidden text-sm font-medium text-gray-600 hover:text-black md:inline-block">
            Pricing
          </Link>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/auth"
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
