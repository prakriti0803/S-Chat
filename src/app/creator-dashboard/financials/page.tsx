'use client';

import { motion } from 'framer-motion';
import { Download, CreditCard, ExternalLink, IndianRupee } from 'lucide-react';

export default function FinancialsPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Financials</h1>
            <p className="text-gray-500">Track payouts from Razorpay and download ledgers for tax purposes.</p>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center rounded-full bg-white border border-gray-200 px-6 py-2.5 text-sm font-bold text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </motion.button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Gateway Status</h2>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-4 mb-4 border border-green-100">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-green-900 text-sm">Active</p>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <p className="text-xs text-green-800/80">Razorpay route is healthy.</p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Account ID</p>
                  <p className="text-sm font-mono text-gray-900 bg-stone-50 p-2 rounded-lg border border-gray-100">rzp_live_abc123</p>
                </div>
              </div>

              <button className="w-full flex items-center justify-center mt-6 text-sm text-blue-600 font-bold hover:text-blue-700">
                Open Razorpay Dashboard
                <ExternalLink className="h-4 w-4 ml-1" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Transaction Ledger</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-100">
                  <tr>
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Date/Time</th>
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Donor</th>
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Gross (₹)</th>
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Fee (5%)</th>
                    <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Net To You</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { donor: "Rahul Kumar", amount: 500, time: "2026-04-06 14:30" },
                    { donor: "Sneha P.", amount: 2000, time: "2026-04-06 13:15" },
                    { donor: "Aman Singh", amount: 50, time: "2026-04-06 11:05" },
                    { donor: "Priya", amount: 100, time: "2026-04-06 09:20" },
                  ].map((tx, i) => (
                    <tr key={i} className="group hover:bg-stone-50 transition-colors">
                      <td className="py-4 text-sm text-gray-500">{tx.time}</td>
                      <td className="py-4 text-sm font-medium text-gray-900">{tx.donor}</td>
                      <td className="py-4 text-sm text-gray-900 text-right">₹{tx.amount}</td>
                      <td className="py-4 text-sm text-red-500 text-right">-₹{(tx.amount * 0.05).toFixed(2)}</td>
                      <td className="py-4 text-sm font-bold text-green-600 text-right">₹{(tx.amount * 0.95).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
              <span className="text-sm font-medium text-gray-400">Showing 4 of 432 transactions</span>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-400 bg-stone-50 cursor-not-allowed">Previous</button>
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors">Next</button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
