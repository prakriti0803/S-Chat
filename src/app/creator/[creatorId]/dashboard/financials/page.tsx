'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, CreditCard, Wallet, Calendar, Download } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function FinancialsPage() {
  const params = useParams();
  const creatorId = params?.creatorId as string || 'default';
  const dashboardBase = `/creator/${creatorId}/dashboard`;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1 flex justify-between items-start"
          >
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Financial Command</h1>
              <p className="text-gray-500">Revenue analytics, payouts, and transaction history.</p>
            </div>
            <Link
              href={dashboardBase}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all text-gray-700 font-bold text-sm"
            >
              Back
            </Link>
          </motion.div>
        </header>

        {/* Revenue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Total Revenue */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl shadow-sm border border-emerald-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-600 text-sm">TOTAL REVENUE</h3>
              <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
            <p className="text-4xl font-black text-gray-900 mb-2">₹1,45,200</p>
            <p className="text-xs text-emerald-600 font-bold">↑ 12% from last month</p>
          </motion.div>

          {/* This Month */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-sm border border-blue-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-600 text-sm">THIS MONTH</h3>
              <div className="h-10 w-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <p className="text-4xl font-black text-gray-900 mb-2">₹45,200</p>
            <p className="text-xs text-blue-600 font-bold">20 days remaining</p>
          </motion.div>

        </div>

        {/* Earnings Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <BarChart3 className="h-6 w-6" />
              Revenue Breakdown
            </h2>
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 transition flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>

          <div className="space-y-4">
            {[
              { source: 'Direct Donations', amount: '₹78,500', percentage: 54, color: 'from-blue-500' },
              { source: 'Membership Tier 1', amount: '₹32,100', percentage: 22, color: 'from-purple-500' },
              { source: 'Membership Tier 2', amount: '₹21,400', percentage: 15, color: 'from-pink-500' },
              { source: 'Affiliate Revenue', amount: '₹13,200', percentage: 9, color: 'from-amber-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900">{item.source}</p>
                  <p className="text-gray-500 font-bold">{item.amount}</p>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.6 }}
                    className={`h-full bg-gradient-to-r ${item.color} to-transparent rounded-full`}
                  />
                </div>
                <p className="text-xs text-gray-500 font-semibold">{item.percentage}% of total</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payout Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8"
        >
          <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <Wallet className="h-6 w-6" />
            Payout Information
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-stone-50 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-gray-900">Available for Payout</p>
                <p className="text-2xl font-black text-emerald-600">₹12,450</p>
              </div>
              <p className="text-sm text-gray-500 font-medium">Payouts occur automatically on Fridays</p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-gray-100">
              <p className="font-bold text-gray-900 mb-2">Bank Account</p>
              <p className="text-sm text-gray-600 font-medium">HDFC Bank • ••••2847</p>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}