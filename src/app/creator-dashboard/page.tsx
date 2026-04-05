'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Activity, Link as LinkIcon, Settings, Copy, Check, Tv, CreditCard, Sparkles, ChevronRight } from 'lucide-react';

export default function CreatorDashboard() {
  const [copied, setCopied] = useState(false);

  const obsUrl = "https://schat.vercel.app/obs/c/xyz123_abc";

  const handleCopy = () => {
    navigator.clipboard.writeText(obsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Creator Dashboard</h1>
            <p className="text-gray-500">Welcome back, Hardik. Here's what's happening with your stream.</p>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-gray-800 transition-colors"
          >
            <Settings className="mr-2 h-4 w-4" />
            Alert Settings
          </motion.button>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Revenue", value: "₹45,200", icon: Wallet, color: "text-green-600", bg: "bg-green-100" },
            { label: "Total Donations", value: "342", icon: Activity, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Active Alert Style", value: "Crystal Prism", icon: Sparkles, color: "text-purple-600", bg: "bg-purple-100" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100"
            >
              <div className={`h-14 w-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mr-5`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two Column Layout for Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Recent Donations (Spans 2 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900">Recent Donations</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "Rahul Kumar", amount: "₹500", message: "Love the new streams! Keep it up.", time: "2 mins ago" },
                { name: "Sneha P.", amount: "₹2,000", message: "For the new mic fund!", time: "1 hour ago" },
                { name: "Aman Singh", amount: "₹50", message: "W stream.", time: "3 hours ago" },
                { name: "Priya", amount: "₹100", message: "React Three Fiber is awesome", time: "5 hours ago" },
              ].map((donation, i) => (
                <div key={i} className="flex items-start justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div>
                    <p className="font-bold text-gray-900">{donation.name}</p>
                    <p className="text-sm text-gray-500 mt-1 max-w-sm truncate">{donation.message}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{donation.amount}</p>
                    <p className="text-xs text-gray-400 mt-1">{donation.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Integrations & OBS Link */}
          <div className="space-y-8">
            
            {/* OBS Browser Source Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8"
            >
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3">
                  <LinkIcon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">OBS Overlay</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Paste this URL into an OBS Browser Source to enable your zero-latency 3D alerts. Keep this entirely private.
              </p>
              <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-gray-200">
                <input 
                  type="password" 
                  readOnly 
                  value={obsUrl}
                  className="bg-transparent flex-1 px-3 text-sm text-gray-600 outline-none w-full font-mono"
                />
                <button 
                  onClick={handleCopy}
                  className="flex items-center justify-center h-8 w-8 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>

            {/* Integrations Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Integrations</h2>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 text-red-600 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <Tv className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">YouTube</p>
                      <p className="text-xs text-gray-500">Connected</p>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Razorpay Route</p>
                      <p className="text-xs text-gray-500">Payouts Active</p>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </main>
  );
}
