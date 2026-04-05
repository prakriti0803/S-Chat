'use client';

import { motion } from 'framer-motion';
import { Tv, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Onboarding() {
  const [step, setStep] = useState(1);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
          <motion.div 
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            className="h-full bg-blue-600 rounded-r-full"
          />
        </div>

        {step === 1 && (
          <div className="space-y-6 text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-6">
              <Tv className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Sync your Channel</h2>
            <p className="text-gray-500 max-w-sm mx-auto">Link your YouTube account so we can automatically fetch your avatar and live stream status.</p>
            
            <button 
              onClick={() => setStep(2)}
              className="w-full mt-8 py-4 rounded-full bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center"
            >
              Connect YouTube
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
              <CreditCard className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">The Money Gate</h2>
            <p className="text-gray-500 max-w-sm mx-auto">Link your Razorpay to receive direct, zero-holding-risk payouts from your donors.</p>
            
            <div className="text-left space-y-4 mt-8">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Razorpay Key ID</label>
                <input type="text" placeholder="rzp_live_..." className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 font-mono text-sm" />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-1">Key Secret</label>
                <input type="password" placeholder="••••••••••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-stone-50 outline-none focus:border-blue-600 font-mono text-sm" />
              </div>
            </div>

            <button 
              onClick={() => setStep(3)}
              className="w-full mt-6 py-4 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center"
            >
              Verify & Connect
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="mx-auto h-24 w-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="h-12 w-12" />
            </motion.div>
            <h2 className="text-3xl font-black text-gray-900">You're Ready to Go Live!</h2>
            <p className="text-gray-500 max-w-sm mx-auto">Your channel is synced and your payouts are secured. Let's head to your command center.</p>
            
            <Link href="/creator-dashboard" className="w-full mt-8 py-4 rounded-full bg-black text-white font-bold text-lg hover:bg-gray-900 transition-colors shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center">
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}

      </motion.div>
    </main>
  );
}
