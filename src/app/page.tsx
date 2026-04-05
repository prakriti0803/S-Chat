'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 pt-16 md:p-24 bg-stone-50 overflow-hidden">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 max-w-4xl z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 mb-4"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          The future of live streaming alerts is here
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-gray-900"
        >
          Premium Donations, <br />
          <span className="text-blue-600">Zero Liability.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl leading-relaxed"
        >
          Frictionless UPI donations directly to your account. Eradicate trolls with verified identity shields. Elevate your stream with stunning 3D alerts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full justify-center"
        >
          <Link href="/auth?role=creator" className="flex items-center justify-center w-full md:w-auto rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95">
            I am a Creator
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="/auth?role=donor" className="flex items-center justify-center w-full md:w-auto rounded-full border-2 border-gray-200 bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-sm transition-transform hover:scale-105 hover:border-gray-300 active:scale-95">
            Donate to Streamer
          </Link>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mt-32 z-10 w-full mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100"
        >
          <div className="h-14 w-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-6">
            <Zap className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Payouts</h3>
          <p className="text-gray-600">
            Powered by Razorpay Route. Funds flow directly to your account instantly with zero holding risk.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100"
        >
          <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Identity Shield</h3>
          <p className="text-gray-600">
            Mandatory Google Auth for donors eliminates anonymous chat toxicity and chargeback fraud.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100"
        >
          <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
            <Sparkles className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">3D Stream Alerts</h3>
          <p className="text-gray-600">
            Ditch flat popups. Equip elite 3D animated OBS overlays powered by React Three Fiber.
          </p>
        </motion.div>
      </section>

    </main>
  );
}
